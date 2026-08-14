-- La Monarca governed editorial workflow
-- Keeps private production state separate from public articles and verified place records.

create table if not exists public.editorial_work_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  interview_id uuid references public.editorial_interviews(id) on delete set null,
  article_id uuid references public.articles(id) on delete set null,
  place_id uuid references public.places(id) on delete set null,
  stage text not null default 'scheduled' check (
    stage in (
      'scheduled',
      'interview_completed',
      'source_ready',
      'story_draft',
      'fact_check',
      'editor_approved',
      'published',
      'archived'
    )
  ),
  consent_checked boolean not null default false,
  source_material_checked boolean not null default false,
  facts_checked boolean not null default false,
  bilingual_reviewed boolean not null default false,
  route_candidate boolean not null default false,
  editor_approved_at timestamptz,
  published_at timestamptz,
  editorial_notes text,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint editorial_approval_requires_proof check (
    stage not in ('editor_approved', 'published')
    or (consent_checked and source_material_checked and facts_checked)
  ),
  constraint editorial_publish_requires_article check (
    stage <> 'published' or (article_id is not null and editor_approved_at is not null)
  ),
  constraint route_candidate_requires_published_place check (
    route_candidate = false or (stage = 'published' and place_id is not null)
  )
);

create index if not exists editorial_work_items_stage_idx
  on public.editorial_work_items (stage, updated_at desc);
create index if not exists editorial_work_items_place_idx
  on public.editorial_work_items (place_id);
create index if not exists editorial_work_items_interview_idx
  on public.editorial_work_items (interview_id);

alter table public.editorial_work_items enable row level security;

-- Editorial work items contain private source and production state. No public SELECT policy exists.
drop policy if exists "admins manage editorial work items" on public.editorial_work_items;
create policy "admins manage editorial work items"
on public.editorial_work_items
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Route-candidate status is only valid when the linked place is still verified and published.
create or replace function public.validate_editorial_route_candidate()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  place_ok boolean;
begin
  if new.route_candidate then
    select exists (
      select 1
      from public.places p
      where p.id = new.place_id
        and p.verification_status = 'verified'
        and p.publication_status = 'published'
    ) into place_ok;

    if not place_ok then
      raise exception 'Route candidates must link to a verified, published place';
    end if;
  end if;

  if new.stage = 'editor_approved' and new.editor_approved_at is null then
    new.editor_approved_at = now();
  end if;

  if new.stage = 'published' and new.published_at is null then
    new.published_at = now();
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists editorial_work_item_guard on public.editorial_work_items;
create trigger editorial_work_item_guard
before insert or update on public.editorial_work_items
for each row
execute function public.validate_editorial_route_candidate();
