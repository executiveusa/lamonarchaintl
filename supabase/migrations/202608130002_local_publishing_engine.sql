-- La Monarca Local Publishing Engine
-- Structured place records support a verified local guide while articles remain the editorial source of truth.

create table if not exists public.place_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_es text not null,
  name_en text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.places (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description_es text,
  description_en text,
  address text,
  neighborhood text,
  city text not null default 'Puerto Vallarta',
  state text not null default 'Jalisco',
  country text not null default 'México',
  latitude numeric,
  longitude numeric,
  website_url text,
  instagram_url text,
  phone text,
  hours_text text,
  price_range text,
  publication_status text not null default 'draft' check (publication_status in ('draft','published','archived')),
  verification_status text not null default 'unverified' check (verification_status in ('unverified','pending','verified','stale','rejected')),
  verified_at timestamptz,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.place_verifications (
  id uuid primary key default gen_random_uuid(),
  place_id uuid not null references public.places(id) on delete cascade,
  method text not null check (method in ('staff_visit','owner_confirmation','official_channel','location_hours_check','other')),
  evidence_notes text,
  verified_by uuid,
  verified_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.article_places (
  article_id uuid not null references public.articles(id) on delete cascade,
  place_id uuid not null references public.places(id) on delete cascade,
  relation_type text not null default 'mentioned' check (relation_type in ('featured','mentioned','recommended')),
  created_at timestamptz not null default now(),
  primary key (article_id, place_id)
);

create table if not exists public.place_category_links (
  place_id uuid not null references public.places(id) on delete cascade,
  category_id uuid not null references public.place_categories(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (place_id, category_id)
);

create index if not exists places_publication_verification_idx
  on public.places (publication_status, verification_status, city);
create index if not exists place_verifications_place_idx
  on public.place_verifications (place_id, verified_at desc);
create index if not exists article_places_place_idx
  on public.article_places (place_id);

alter table public.place_categories enable row level security;
alter table public.places enable row level security;
alter table public.place_verifications enable row level security;
alter table public.article_places enable row level security;
alter table public.place_category_links enable row level security;

-- Public readers can browse categories and only places that have passed the editorial verification gate.
drop policy if exists "public can read place categories" on public.place_categories;
create policy "public can read place categories"
on public.place_categories
for select
to anon, authenticated
using (true);

drop policy if exists "public can read verified published places" on public.places;
create policy "public can read verified published places"
on public.places
for select
to anon, authenticated
using (publication_status = 'published' and verification_status = 'verified');

-- Relationship rows expose IDs only; the place table still enforces the public verification gate.
drop policy if exists "public can read article place links" on public.article_places;
create policy "public can read article place links"
on public.article_places
for select
to anon, authenticated
using (true);

drop policy if exists "public can read place category links" on public.place_category_links;
create policy "public can read place category links"
on public.place_category_links
for select
to anon, authenticated
using (true);

-- Verification evidence is editorial/admin-only and is never exposed by a public SELECT policy.
-- Admin policies use the existing public.is_admin(user_id uuid) database function.
drop policy if exists "admins manage place categories" on public.place_categories;
create policy "admins manage place categories"
on public.place_categories
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "admins manage places" on public.places;
create policy "admins manage places"
on public.places
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "admins manage place verifications" on public.place_verifications;
create policy "admins manage place verifications"
on public.place_verifications
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "admins manage article place links" on public.article_places;
create policy "admins manage article place links"
on public.article_places
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "admins manage place category links" on public.place_category_links;
create policy "admins manage place category links"
on public.place_category_links
for all
to authenticated
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

-- Seed only taxonomy, never businesses. Business records must be researched and verified before publication.
insert into public.place_categories (slug, name_es, name_en)
values
  ('comer', 'Comer', 'Eat'),
  ('cafe', 'Café', 'Coffee'),
  ('arte', 'Arte', 'Art'),
  ('musica', 'Música', 'Music'),
  ('comprar-local', 'Comprar local', 'Shop local'),
  ('naturaleza', 'Naturaleza', 'Nature'),
  ('bienestar', 'Bienestar', 'Wellness'),
  ('hospedaje', 'Hospedaje', 'Stay'),
  ('experiencias', 'Experiencias', 'Experiences')
on conflict (slug) do nothing;
