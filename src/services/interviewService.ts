import { supabase } from '@/integrations/supabase/client';

const db = supabase as any;

export type InterviewSubjectType = 'artist' | 'business_owner' | 'chef' | 'maker' | 'guide' | 'person' | 'other';
export type InterviewConsentStatus = 'not_recorded' | 'verbal' | 'written';
export type InterviewStatus = 'planned' | 'completed' | 'approved_for_story' | 'archived';

export interface EditorialInterview {
  id: string;
  subject_name: string;
  subject_type: InterviewSubjectType;
  place_id?: string | null;
  article_id?: string | null;
  interview_date?: string | null;
  interviewer?: string | null;
  consent_status: InterviewConsentStatus;
  status: InterviewStatus;
  source_notes?: string | null;
  transcript_url?: string | null;
  recording_url?: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchEditorialInterviews(): Promise<EditorialInterview[]> {
  const { data, error } = await db
    .from('editorial_interviews')
    .select('*')
    .order('interview_date', { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createEditorialInterview(input: {
  subjectName: string;
  subjectType: InterviewSubjectType;
  placeId?: string;
  interviewDate?: string;
  interviewer?: string;
  consentStatus: InterviewConsentStatus;
  status: InterviewStatus;
  sourceNotes?: string;
  transcriptUrl?: string;
  recordingUrl?: string;
}): Promise<EditorialInterview> {
  const { data, error } = await db
    .from('editorial_interviews')
    .insert({
      subject_name: input.subjectName.trim(),
      subject_type: input.subjectType,
      place_id: input.placeId || null,
      interview_date: input.interviewDate || null,
      interviewer: input.interviewer?.trim() || null,
      consent_status: input.consentStatus,
      status: input.status,
      source_notes: input.sourceNotes?.trim() || null,
      transcript_url: input.transcriptUrl?.trim() || null,
      recording_url: input.recordingUrl?.trim() || null,
      updated_at: new Date().toISOString(),
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
