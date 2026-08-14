-- La Monarca Walking Tours
-- Monetization is layered on top of the verified local catalog. No tour inventory is seeded.

create table if not exists public.walking_tours (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_es text not null,
  title_en text not null,
  description_es text,
  description_en text,
  city text not null default 'Puerto Vallarta',
  neighborhood text,
  duration_minutes integer check (duration_minutes is null or duration_minutes > 0),
  meeting_point text,
  price_mxn numeric(10,2) check (price_mxn is null or price_mxn >= 0),
  price_usd numeric(10,2) check (price_usd is null or price_usd >= 0),
  booking_url text,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.walking_tour_stops (
  tour_id uuid not null references public.walking_tours(id) on delete cascade,
  place_id uuid not null references public.places(id) on delete restrict,
  stop_order integer not null check (stop_order > 0),
  stop_duration_minutes integer check (stop_duration_minutes is null or stop_duration_minutes > 0),
  story_note_es text,
  story_note_en text,
  created_at timestamptz not null default now(),
  primary key (tour_id, place_id),
  unique (tour_id, stop_order)
);

create index if not exists walking_tours_status_city_idx
  on public.walking_tours (status, city);
create index if not exists walking_tour_stops_tour_order_idx
  on public.walking_tour_stops (tour_id, stop_order);

alter table public.walking_tours enable row level security;
alter table public.walking_tour_stops enable row level security;

-- Public readers may only see tours the editorial team explicitly publishes.
drop policy if exists "public can read published walking tours" on public.walking_tours;
create policy "public can read published walking tours"
on public.walking_tours
for select
to anon, authenticated
using (status = 'published');

-- Public stop visibility additionally requires the linked place to be both verified and published.
drop policy if exists "public can read verified published tour stops" on public.walking_tour_stops;
create policy "public can read verified published tour stops"
on public.walking_tour_stops
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.walking_tours tour
    where tour.id = walking_tour_stops.tour_id
      and tour.status = 'published'
  )
  and exists (
    select 1
    from public.places place
    where place.id = walking_tour_stops.place_id
      and place.publication_status = 'published'
      and place.verification_status = 'verified'
  )
);

-- Admin/editorial management relies on the existing is_admin(auth.uid()) function.
drop policy if exists "admins manage walking tours" on public.walking_tours;
create policy "admins manage walking tours"
on public.walking_tours
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "admins manage walking tour stops" on public.walking_tour_stops;
create policy "admins manage walking tour stops"
on public.walking_tour_stops
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- A database trigger prevents a tour from being published unless it has at least two
-- stops and every stop references a currently verified, published place.
create or replace function public.validate_walking_tour_publish()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  stop_count integer;
  invalid_stop_count integer;
begin
  if new.status = 'published' and old.status is distinct from 'published' then
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
  end if;

  return new;
end;
$$;

drop trigger if exists walking_tour_publish_guard on public.walking_tours;
create trigger walking_tour_publish_guard
before update of status on public.walking_tours
for each row
execute function public.validate_walking_tour_publish();
