import { supabase } from '@/integrations/supabase/client';

const db = supabase as any;

export type EditorialStage =
  | 'scheduled'
  | 'interview_completed'
  | 'source_ready'
  | 'story_draft'
  | 'fact_check'
  | 'editor_approved'
  | 'published'
  | 'archived';

export interface EditorialWorkItem {
  id: string;
  title: string;
  interview_id?: string | null;
  article_id?: string | null;
  place_id?: string | null;
  stage: EditorialStage;
  consent_checked: boolean;
  source_material_checked: boolean;
  facts_checked: boolean;
  bilingual_reviewed: boolean;
  route_candidate: boolean;
  editor_approved_at?: string | null;
  published_at?: string | null;
  editorial_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchEditorialWorkItems(): Promise<EditorialWorkItem[]> {
  const { data, error } = await db
    .from('editorial_work_items')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createEditorialWorkItem(input: {
  title: string;
  interviewId?: string;
  articleId?: string;
  placeId?: string;
  notes?: string;
}): Promise<EditorialWorkItem> {
  const { data: { session } } = await supabase.auth.getSession();
  const { data, error } = await db
    .from('editorial_work_items')
    .insert({
      title: input.title.trim(),
      interview_id: input.interviewId || null,
      article_id: input.articleId || null,
      place_id: input.placeId || null,
      editorial_notes: input.notes?.trim() || null,
      created_by: session?.user?.id || null,
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function updateEditorialWorkItem(
  id: string,
  patch: Partial<Pick<
    EditorialWorkItem,
    | 'stage'
    | 'article_id'
    | 'place_id'
    | 'consent_checked'
    | 'source_material_checked'
    | 'facts_checked'
    | 'bilingual_reviewed'
    | 'route_candidate'
    | 'editorial_notes'
  >>,
): Promise<EditorialWorkItem> {
  const { data, error } = await db
    .from('editorial_work_items')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export function editorialGateSummary(item: EditorialWorkItem): string[] {
  const missing: string[] = [];
  if (!item.consent_checked) missing.push('consent');
  if (!item.source_material_checked) missing.push('source material');
  if (!item.facts_checked) missing.push('fact check');
  if (!item.bilingual_reviewed) missing.push('bilingual review');
  if (!item.article_id) missing.push('linked article');
  if (!item.place_id) missing.push('linked place for route eligibility');
  return missing;
}
