import { supabase } from '@/integrations/supabase/client';

const db = supabase as any;

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'stale' | 'rejected';
export type PublicationStatus = 'draft' | 'published' | 'archived';
export type VerificationMethod = 'staff_visit' | 'owner_confirmation' | 'official_channel' | 'location_hours_check' | 'other';

export interface PlaceCategory {
  id: string;
  slug: string;
  name_es: string;
  name_en: string;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  description_es?: string | null;
  description_en?: string | null;
  address?: string | null;
  neighborhood?: string | null;
  city: string;
  state: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  website_url?: string | null;
  instagram_url?: string | null;
  phone?: string | null;
  hours_text?: string | null;
  price_range?: string | null;
  publication_status: PublicationStatus;
  verification_status: VerificationStatus;
  verified_at?: string | null;
  last_checked_at?: string | null;
  created_at: string;
  updated_at: string;
  categories?: PlaceCategory[];
}

export interface PlaceInput {
  slug: string;
  name: string;
  description_es?: string;
  description_en?: string;
  address?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number | null;
  longitude?: number | null;
  website_url?: string;
  instagram_url?: string;
  phone?: string;
  hours_text?: string;
  price_range?: string;
  publication_status?: PublicationStatus;
  verification_status?: VerificationStatus;
  verified_at?: string | null;
  last_checked_at?: string | null;
}

export async function fetchPublishedVerifiedPlaces(): Promise<Place[]> {
  const { data, error } = await db
    .from('places')
    .select('*')
    .eq('publication_status', 'published')
    .eq('verification_status', 'verified')
    .order('name', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchPlaceBySlug(slug: string): Promise<Place | null> {
  const { data, error } = await db
    .from('places')
    .select('*')
    .eq('slug', slug)
    .eq('publication_status', 'published')
    .eq('verification_status', 'verified')
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}

export async function fetchPlaceCategories(): Promise<PlaceCategory[]> {
  const { data, error } = await db
    .from('place_categories')
    .select('*')
    .order('name_es', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchAdminPlaces(): Promise<Place[]> {
  const { data, error } = await db
    .from('places')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createPlace(input: PlaceInput): Promise<Place> {
  const payload = {
    ...input,
    city: input.city || 'Puerto Vallarta',
    state: input.state || 'Jalisco',
    country: input.country || 'México',
    publication_status: input.publication_status || 'draft',
    verification_status: input.verification_status || 'unverified',
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await db
    .from('places')
    .insert(payload)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updatePlace(id: string, input: Partial<PlaceInput>): Promise<Place> {
  const { data, error } = await db
    .from('places')
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function addPlaceVerification(input: {
  placeId: string;
  method: VerificationMethod;
  evidenceNotes?: string;
}): Promise<void> {
  const now = new Date().toISOString();
  const { data: { session } } = await supabase.auth.getSession();

  const { error: verificationError } = await db.from('place_verifications').insert({
    place_id: input.placeId,
    method: input.method,
    evidence_notes: input.evidenceNotes?.trim() || null,
    verified_by: session?.user?.id || null,
    verified_at: now,
  });

  if (verificationError) throw verificationError;

  const { error: placeError } = await db
    .from('places')
    .update({
      verification_status: 'verified',
      verified_at: now,
      last_checked_at: now,
      updated_at: now,
    })
    .eq('id', input.placeId);

  if (placeError) throw placeError;
}

export async function publishVerifiedPlace(place: Place): Promise<Place> {
  if (place.verification_status !== 'verified') {
    throw new Error('Only verified places can be published.');
  }

  return updatePlace(place.id, { publication_status: 'published' } as Partial<PlaceInput>);
}

export async function unpublishPlace(placeId: string): Promise<Place> {
  return updatePlace(placeId, { publication_status: 'draft' } as Partial<PlaceInput>);
}

export async function linkArticleToPlace(articleId: string, placeId: string, relationType: 'featured' | 'mentioned' | 'recommended' = 'mentioned') {
  const { error } = await db
    .from('article_places')
    .upsert(
      { article_id: articleId, place_id: placeId, relation_type: relationType },
      { onConflict: 'article_id,place_id' }
    );

  if (error) throw error;
}
