-- La Monarca route field testing
-- A walking-tour draft is not sellable merely because its stops exist in the database.
-- Editors must physically test the route and record the result before publication.

create table if not exists public.walking_tour_field_tests (
  id uuid primary key default gen_random_uuid(),
  tour_id uuid not null references public.walking_tours(id) on delete cascade,
  tested_at timestamptz not null default now(),
  tested_by uuid,
  tested_stop_count integer not null check (tested_stop_count > 0),
  actual_duration_minutes integer not null check (actual_duration_minutes > 0),
  approximate_distance_km numeric(6,2) check (approximate_distance_km is null or approximate_distance_km >= 0),
  result text not null check (result in ('needs_work','pass')),
  route_flow_notes text,
  safety_notes text,
  accessibility_notes text,
  heat_rest_notes text,
  business_readiness_notes text,
  general_notes text,
  created_at timestamptz not null default now()
);

create index if not exists walking_tour_field_tests_tour_date_idx
  on public.walking_tour_field_tests (tour_id, tested_at desc);

alter table public.walking_tour_field_tests enable row level security;

-- Field-test notes are operational/editorial records and are never public by default.
drop policy if exists "admins manage walking tour field tests" on public.walking_tour_field_tests;
create policy "admins manage walking tour field tests"
on public.walking_tour_field_tests
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Strengthen the publication guard: the route must have been physically tested and passed
-- with the same number of stops that currently make up the route.
create or replace function public.validate_walking_tour_publish()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  stop_count integer;
  invalid_stop_count integer;
  passing_test_count integer;
begin
  if new.status = 'published' and (tg_op = 'INSERT' or old.status is distinct from 'published') then
    select count(*) into stop_count
    from public.walking_tour_stops
    where tour_id = new.id;

    if stop_count < 2 then
      raise exception 'A walking tour needs at least two stops before publication';
    end if;

    select count(*) into invalid_stop_count
    from public.walking_tour_stops ts
    join public.places p on p.id = ts.place_id
    where ts.tour_id = new.id
      and not (p.publication_status = 'published' and p.verification_status = 'verified');

    if invalid_stop_count > 0 then
      raise exception 'Every walking tour stop must reference a verified, published place';
    end if;

    select count(*) into passing_test_count
    from public.walking_tour_field_tests ft
    where ft.tour_id = new.id
      and ft.result = 'pass'
      and ft.tested_stop_count = stop_count;

    if passing_test_count = 0 then
      raise exception 'A walking tour must pass a real-world field test with its current stop count before publication';
    end if;
  end if;

  return new;
end;
$$;

-- Recreate the trigger so the strengthened guard applies to both direct published inserts
-- and later draft-to-published updates.
drop trigger if exists walking_tour_publish_guard on public.walking_tours;
create trigger walking_tour_publish_guard
before insert or update of status on public.walking_tours
for each row
execute function public.validate_walking_tour_publish();
