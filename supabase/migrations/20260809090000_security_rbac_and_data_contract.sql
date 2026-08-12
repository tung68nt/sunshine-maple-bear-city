-- Production hardening. Apply to a preview project first, then production after backup.
-- This migration intentionally does not grant public SELECT access to PII.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'viewer' check (role in ('admin', 'editor', 'viewer')),
  is_active boolean not null default true,
  display_name text,
  department text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists department text;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, role, is_active)
  values (new.id, 'viewer', true)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles for select to authenticated using (id = auth.uid());

create or replace function public.current_cms_role()
returns text language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() and is_active = true $$;

-- Keep sensitive submissions minimal and consistent with server schemas.
-- Compatibility contract: production projects created before the CMS rewrite
-- can be missing these columns. Add them before any policy or index refers to
-- them, rather than requiring a manual series of SQL fixes.
alter table public.blog_posts add column if not exists published_at timestamptz;
alter table public.blog_posts add column if not exists updated_at timestamptz;
alter table public.blog_posts add column if not exists title text;
alter table public.blog_posts add column if not exists title_vi text;
alter table public.blog_posts add column if not exists title_en text;
alter table public.blog_posts add column if not exists excerpt text;
alter table public.blog_posts add column if not exists content text;
alter table public.blog_posts add column if not exists content_vi text;
alter table public.blog_posts add column if not exists content_en text;
alter table public.announcements add column if not exists is_active boolean not null default true;
alter table public.announcements add column if not exists title text;
alter table public.announcements add column if not exists content text;
alter table public.announcements add column if not exists priority text;
alter table public.announcements add column if not exists status text;
alter table public.announcements add column if not exists target_audience text;
alter table public.announcements add column if not exists updated_at timestamptz;
alter table public.custom_forms add column if not exists is_active boolean not null default true;
alter table public.admissions add column if not exists consent_at timestamptz;
alter table public.admissions add column if not exists source_ip_hash text;
alter table public.tour_bookings add column if not exists consent_at timestamptz;
alter table public.tour_bookings add column if not exists source_ip_hash text;
alter table public.form_responses add column if not exists is_partial boolean not null default false;

-- Policies do not protect a table until RLS itself is enabled.
alter table public.admissions enable row level security;
alter table public.tour_bookings enable row level security;
alter table public.form_responses enable row level security;
alter table public.utm_links enable row level security;
alter table public.pages enable row level security;
alter table public.blog_posts enable row level security;
alter table public.gallery_items enable row level security;
alter table public.staff enable row level security;
alter table public.events enable row level security;
alter table public.custom_forms enable row level security;
alter table public.announcements enable row level security;

-- Replace permissive public policies from the legacy master migration.
drop policy if exists "Public Submit Admissions" on public.admissions;
drop policy if exists "Public Submit Tour Bookings" on public.tour_bookings;
drop policy if exists "Public Submit Form Responses" on public.form_responses;
drop policy if exists "Public Read UTM Links" on public.utm_links;

-- PII is accessible only by active administrators. Public submissions use server-side
-- service_role after validation and Turnstile verification, never anon RLS grants.
drop policy if exists "Admins manage admissions" on public.admissions;
drop policy if exists "Admins manage tours" on public.tour_bookings;
drop policy if exists "Admins manage form responses" on public.form_responses;
drop policy if exists "Admins manage UTM links" on public.utm_links;
create policy "Admins manage admissions" on public.admissions for all to authenticated
  using (public.current_cms_role() = 'admin') with check (public.current_cms_role() = 'admin');
create policy "Admins manage tours" on public.tour_bookings for all to authenticated
  using (public.current_cms_role() = 'admin') with check (public.current_cms_role() = 'admin');
create policy "Admins manage form responses" on public.form_responses for all to authenticated
  using (public.current_cms_role() = 'admin') with check (public.current_cms_role() = 'admin');
create policy "Admins manage UTM links" on public.utm_links for all to authenticated
  using (public.current_cms_role() = 'admin') with check (public.current_cms_role() = 'admin');

-- Public reads are limited to published/visible content; editors manage content.
drop policy if exists "Public Read Pages" on public.pages;
drop policy if exists "Public Read Blog" on public.blog_posts;
drop policy if exists "Public Read Gallery" on public.gallery_items;
drop policy if exists "Public Read Staff" on public.staff;
drop policy if exists "Public Read Events" on public.events;
drop policy if exists "Public Read Custom Forms" on public.custom_forms;
drop policy if exists "Public Read Announcements" on public.announcements;
drop policy if exists "Public read published pages" on public.pages;
drop policy if exists "Public read published blog" on public.blog_posts;
drop policy if exists "Public read gallery" on public.gallery_items;
drop policy if exists "Public read staff" on public.staff;
drop policy if exists "Public read public events" on public.events;
drop policy if exists "Public read active forms" on public.custom_forms;
drop policy if exists "Public read active announcements" on public.announcements;

-- Some earlier installations store navigation inside `pages` and therefore do
-- not have navigation_items. Keep this migration compatible with both schemas.
do $$
begin
  if to_regclass('public.navigation_items') is not null then
    execute 'drop policy if exists "Public Read Navigation" on public.navigation_items';
  end if;
end $$;

create policy "Public read published pages" on public.pages for select using (status = 'published');
create policy "Public read published blog" on public.blog_posts for select using (status = 'published');
create policy "Public read gallery" on public.gallery_items for select using (true);
create policy "Public read staff" on public.staff for select using (true);
create policy "Public read public events" on public.events for select using (is_public = true);

-- Do not weaken a missing/legacy table to `USING (true)`. If an installation
-- lacks the visibility column, leave it without a public policy until its data
-- contract is migrated explicitly.
do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'custom_forms' and column_name = 'is_active') then
    execute 'create policy "Public read active forms" on public.custom_forms for select using (is_active = true)';
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'announcements' and column_name = 'is_active') then
    execute 'create policy "Public read active announcements" on public.announcements for select using (is_active = true)';
  end if;
end $$;

do $$
begin
  if to_regclass('public.navigation_items') is not null then
    execute 'drop policy if exists "Public read visible navigation" on public.navigation_items';
    execute 'create policy "Public read visible navigation" on public.navigation_items for select using (is_visible = true)';
  end if;
end $$;

do $$
declare t text;
begin
  foreach t in array array['pages','blog_posts','gallery_items','staff','events','custom_forms','navigation_items','announcements'] loop
    if to_regclass('public.' || t) is not null then
      execute format('drop policy if exists "Editors manage %s" on public.%I', t, t);
      execute format('create policy "Editors manage %s" on public.%I for all to authenticated using (public.current_cms_role() in (''admin'', ''editor'')) with check (public.current_cms_role() in (''admin'', ''editor''))', t, t);
    end if;
  end loop;
end $$;

create index if not exists idx_blog_posts_published_at on public.blog_posts(status, published_at desc);
create index if not exists idx_events_public_start on public.events(is_public, start_date);
create index if not exists idx_admissions_status_created on public.admissions(status, created_at desc);
create index if not exists idx_tours_status_created on public.tour_bookings(status, created_at desc);
create index if not exists idx_form_responses_form_created on public.form_responses(form_id, created_at desc);
