-- La Monarca article publication truth
-- Public visibility must agree with the governed editorial workflow.

alter table public.articles
  add column if not exists publication_status text not null default 'published'
  check (publication_status in ('draft','published','archived'));

create index if not exists articles_publication_created_idx
  on public.articles (publication_status, created_at desc);

-- Existing rows remain published to preserve the site's current behavior.
-- New application-created stories are explicitly inserted as drafts.

create or replace function public.validate_editorial_work_item_truth()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  place_ok boolean;
  article_place_ok boolean;
  interview_consent_ok boolean := true;
begin
  -- A linked interview cannot pass editor approval without a recorded consent state.
  if new.interview_id is not null and new.stage in ('editor_approved', 'published') then
    select exists (
      select 1
      from public.editorial_interviews i
      where i.id = new.interview_id
        and i.consent_status in ('verbal','written')
    ) into interview_consent_ok;

    if not interview_consent_ok then
      raise exception 'A linked interview needs recorded verbal or written consent before approval';
    end if;
  end if;

  -- La Monarca is bilingual; public publication requires bilingual review.
  if new.stage = 'published' and not new.bilingual_reviewed then
    raise exception 'Published stories require bilingual review';
  end if;

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

    select exists (
      select 1
      from public.article_places ap
      where ap.article_id = new.article_id
        and ap.place_id = new.place_id
    ) into article_place_ok;

    if not article_place_ok then
      raise exception 'Route candidates require the published article to be linked to the same place';
    end if;
  end if;

  if new.stage = 'editor_approved' and new.editor_approved_at is null then
    new.editor_approved_at = now();
  end if;

  if new.stage = 'published' then
    if new.article_id is null then
      raise exception 'Published workflow items require a linked article';
    end if;
    if new.editor_approved_at is null then
      raise exception 'Published workflow items require prior editor approval';
    end if;

    new.published_at = coalesce(new.published_at, now());

    update public.articles
    set publication_status = 'published', updated_at = now()
    where id = new.article_id;
  end if;

  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists editorial_work_item_guard on public.editorial_work_items;
create trigger editorial_work_item_guard
before insert or update on public.editorial_work_items
for each row
execute function public.validate_editorial_work_item_truth();
