-- Truth-critical wiring for La Monarca Internacional.
-- This migration is intentionally explicit so the database can be exported/recreated.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  language text not null default 'es' check (language in ('es','en')),
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  message text,
  inquiry_type text not null default 'general',
  language text not null default 'es' check (language in ('es','en')),
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
alter table public.contact_submissions enable row level security;

-- Public visitors may subscribe themselves. No public SELECT/UPDATE/DELETE policy is created.
create policy if not exists "public can subscribe"
on public.newsletter_subscribers
for insert
to anon, authenticated
with check (char_length(email) between 3 and 320);

-- Public visitors may submit an inquiry. No public SELECT/UPDATE/DELETE policy is created.
create policy if not exists "public can submit contact"
on public.contact_submissions
for insert
to anon, authenticated
with check (char_length(email) between 3 and 320);

-- Existing admin_roles/articles policies are deliberately untouched here.
-- They require separate inspection against the live Supabase project before any security claim is made.
