import { supabase } from '@/integrations/supabase/client';

const db = supabase as any;

export type WalkingTourStatus = 'draft' | 'published' | 'archived';

export interface WalkingTour {
  id: string;
  slug: string;
  title_es: string;
  title_en: string;
  description_es?: string | null;
  description_en?: string | null;
  city: string;
  neighborhood?: string | null;
  duration_minutes?: number | null;
  meeting_point?: string | null;
  price_mxn?: number | null;
  price_usd?: number | null;
  booking_url?: string | null;
  status: WalkingTourStatus;
  created_at: string;
  updated_at: string;
}

export interface WalkingTourStop {
  tour_id: string;
  place_id: string;
  stop_order: number;
  stop_duration_minutes?: number | null;
  story_note_es?: string | null;
  story_note_en?: string | null;
  place?: {
    id: string;
    slug: string;
    name: string;
    address?: string | null;
    neighborhood?: string | null;
    city: string;
    latitude?: number | null;
    longitude?: number | null;
    verification_status: string;
    publication_status: string;
    verified_at?: string | null;
  } | null;
}

export async function fetchPublishedTours(): Promise<WalkingTour[]> {
  const { data, error } = await db
    .from('walking_tours')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function fetchPublishedTourBySlug(slug: string): Promise<WalkingTour | null> {
  const { data, error } = await db
    .from('walking_tours')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}

export async function fetchPublicTourStops(tourId: string): Promise<WalkingTourStop[]> {
  const { data, error } = await db
    .from('walking_tour_stops')
    .select(`
      tour_id,
      place_id,
      stop_order,
      stop_duration_minutes,
      story_note_es,
      story_note_en,
      place:places (
        id,
        slug,
        name,
        address,
        neighborhood,
        city,
        latitude,
        longitude,
        verification_status,
        publication_status,
        verified_at
      )
    `)
    .eq('tour_id', tourId)
    .order('stop_order', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function fetchAdminTours(): Promise<WalkingTour[]> {
  const { data, error } = await db
    .from('walking_tours')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createWalkingTour(input: {
  slug: string;
  titleEs: string;
  titleEn: string;
  descriptionEs?: string;
  descriptionEn?: string;
  neighborhood?: string;
  durationMinutes?: number | null;
  meetingPoint?: string;
  priceMxn?: number | null;
  priceUsd?: number | null;
}): Promise<WalkingTour> {
  const { data, error } = await db
    .from('walking_tours')
    .insert({
      slug: input.slug,
      title_es: input.titleEs,
      title_en: input.titleEn,
      description_es: input.descriptionEs || null,
      description_en: input.descriptionEn || null,
      neighborhood: input.neighborhood || null,
      duration_minutes: input.durationMinutes ?? null,
      meeting_point: input.meetingPoint || null,
      price_mxn: input.priceMxn ?? null,
      price_usd: input.priceUsd ?? null,
      status: 'draft',
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function addTourStop(input: {
  tourId: string;
  placeId: string;
  stopOrder: number;
  stopDurationMinutes?: number | null;
  storyNoteEs?: string;
  storyNoteEn?: string;
}): Promise<void> {
  const { data: place, error: placeError } = await db
    .from('places')
    .select('id, verification_status, publication_status')
    .eq('id', input.placeId)
    .single();

  if (placeError) throw placeError;
  if (!place || place.verification_status !== 'verified' || place.publication_status !== 'published') {
    throw new Error('Tour stops must be verified and published places.');
  }

  const { error } = await db.from('walking_tour_stops').insert({
    tour_id: input.tourId,
    place_id: input.placeId,
    stop_order: input.stopOrder,
    stop_duration_minutes: input.stopDurationMinutes ?? null,
    story_note_es: input.storyNoteEs || null,
    story_note_en: input.storyNoteEn || null,
  });

  if (error) throw error;
}

export async function publishWalkingTour(tourId: string): Promise<void> {
  const { error } = await db
    .from('walking_tours')
    .update({ status: 'published', updated_at: new Date().toISOString() })
    .eq('id', tourId);

  if (error) throw error;
}
