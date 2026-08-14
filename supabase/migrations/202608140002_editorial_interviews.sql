-- La Monarca Editorial Interviews
-- Interview records are private editorial source material. Public publication happens through articles.

create table if not exists public.editorial_interviews (
  id uuid primary key default gen_random_uuid(),
  subject_name text not null,
  subject_type text not null default 'person' check (subject_type in ('artist','business_owner','chef','maker','guide','person','other')),
  place_id uuid references public.places(id) on delete set null,
  article_id uuid references public.articles(id) on delete set null,
  interview_date date,
  interviewer text,
  consent_status text not null default 'not_recorded' check (consent_status in ('not_recorded','verbal','written')),
  status text not null default 'planned' check (status in ('planned','completed','approved_for_story','archived')),
  source_notes text,
  transcript_url text,
  recording_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists editorial_interviews_place_idx
  on public.editorial_interviews (place_id, interview_date desc);
create index if not exists editorial_interviews_status_idx
  on public.editorial_interviews (status, interview_date desc);

alter table public.editorial_interviews enable row level security;

-- Interview notes, recordings, transcripts, and consent state are never publicly readable.
drop policy if exists "admins manage editorial interviews" on public.editorial_interviews;
create policy "admins manage editorial interviews"
on public.editorial_interviews
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));
