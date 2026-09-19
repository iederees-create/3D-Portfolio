-- Shafeeqah Francis portfolio — enquiry queue, usage events, and site admins.
-- Apply in the shared NextGenWebs / Exchange-Line Supabase SQL editor
-- (project sijvvbozaufzpjirijhb). This is additive. It does not change
-- Exchange-Line lead policies and must not use public.is_internal(),
-- which would expose Exchange-Line lead PII to every internal profile.
--
-- After apply:
-- 1. Create the operator Auth user (magic link / invite) if they do not exist.
-- 2. insert into public.sf_site_admins(user_id, site_id)
--    values ('<auth.users id>', 'shafeeqah-portfolio');
-- 3. Add https://iederees-create.github.io/3D-Portfolio/admin-dashboard
--    to Auth redirect allow-list WITHOUT removing Exchange-Line URLs.
--
-- Public visitors never SELECT these tables. Event/enquiry writes are
-- intended for service-role edge functions, not anon table SELECT.

create extension if not exists pgcrypto;

create table if not exists public.sf_site_admins (
  user_id uuid not null references auth.users(id) on delete cascade,
  site_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, site_id)
);

create table if not exists public.sf_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  site_id text not null default 'shafeeqah-portfolio',
  event_name text not null,
  path text,
  page_id text,
  resource_key text,
  idempotency_key text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  is_synthetic boolean not null default false
);

create table if not exists public.sf_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  site_id text not null default 'shafeeqah-portfolio',
  reference text not null unique,
  path text not null check (path in ('project', 'employment')),
  service text,
  role text,
  description text not null,
  timing text,
  budget text,
  project_url text,
  contact_name text not null,
  email text not null,
  phone text,
  preferred_contact text,
  privacy_version text,
  source_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  idempotency_key text,
  is_synthetic boolean not null default false,
  status text not null default 'new' check (status in ('new', 'in_review', 'waiting', 'closed', 'spam')),
  owner text,
  next_action text,
  follow_up_date date
);

create unique index if not exists sf_events_site_idempotency_key
  on public.sf_events (site_id, idempotency_key)
  where idempotency_key is not null;

create unique index if not exists sf_enquiries_site_idempotency_key
  on public.sf_enquiries (site_id, idempotency_key)
  where idempotency_key is not null;

create index if not exists sf_events_site_created_idx
  on public.sf_events (site_id, created_at desc);

create index if not exists sf_events_site_name_created_idx
  on public.sf_events (site_id, event_name, created_at desc);

create index if not exists sf_events_synthetic_idx
  on public.sf_events (site_id, is_synthetic, created_at desc);

create index if not exists sf_enquiries_site_created_idx
  on public.sf_enquiries (site_id, created_at desc);

create index if not exists sf_enquiries_follow_up_idx
  on public.sf_enquiries (site_id, follow_up_date, status);

create or replace function public.sf_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists sf_enquiries_set_updated_at on public.sf_enquiries;
create trigger sf_enquiries_set_updated_at
  before update on public.sf_enquiries
  for each row execute function public.sf_set_updated_at();

-- Authorisation is membership of sf_site_admins for this site_id only.
-- Do not substitute public.is_internal() / profiles.role.
create or replace function public.is_sf_site_admin(p_site_id text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.sf_site_admins
    where user_id = auth.uid()
      and site_id = p_site_id
  );
$$;

create or replace function public.is_sf_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.is_sf_site_admin('shafeeqah-portfolio');
$$;

revoke all on function public.is_sf_site_admin(text) from public, anon;
revoke all on function public.is_sf_site_admin() from public, anon;
grant execute on function public.is_sf_site_admin(text) to authenticated;
grant execute on function public.is_sf_site_admin() to authenticated;

alter table public.sf_site_admins enable row level security;
alter table public.sf_events enable row level security;
alter table public.sf_enquiries enable row level security;

drop policy if exists sf_site_admins_self_read on public.sf_site_admins;
create policy sf_site_admins_self_read
  on public.sf_site_admins
  for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists sf_events_admin_read on public.sf_events;
create policy sf_events_admin_read
  on public.sf_events
  for select
  to authenticated
  using (public.is_sf_site_admin(site_id));

drop policy if exists sf_enquiries_admin_read on public.sf_enquiries;
create policy sf_enquiries_admin_read
  on public.sf_enquiries
  for select
  to authenticated
  using (public.is_sf_site_admin(site_id));

drop policy if exists sf_enquiries_admin_update on public.sf_enquiries;
create policy sf_enquiries_admin_update
  on public.sf_enquiries
  for update
  to authenticated
  using (public.is_sf_site_admin(site_id))
  with check (public.is_sf_site_admin(site_id));

revoke all on public.sf_site_admins from public, anon, authenticated;
revoke all on public.sf_events from public, anon, authenticated;
revoke all on public.sf_enquiries from public, anon, authenticated;

grant select on public.sf_site_admins to authenticated;
grant select on public.sf_events to authenticated;
grant select on public.sf_enquiries to authenticated;
grant update (status, owner, next_action, follow_up_date) on public.sf_enquiries to authenticated;

grant all on public.sf_site_admins to service_role;
grant all on public.sf_events to service_role;
grant all on public.sf_enquiries to service_role;

comment on table public.sf_events is
  'Shafeeqah portfolio usage events. No form PII. Counts are events, not unique visitors. WhatsApp clicks are not delivered messages. Affiliate clicks are not commissions.';
comment on table public.sf_enquiries is
  'Shafeeqah portfolio enquiry briefs stored for human follow-up. Not sent automatically by email or WhatsApp.';
comment on table public.sf_site_admins is
  'Auth users allowed to read Shafeeqah PII and events. Independent of Exchange-Line profiles.role / is_internal().';
comment on column public.sf_events.is_synthetic is
  'True for test traffic. Production metrics should filter is_synthetic = false unless an operator explicitly includes tests.';
comment on column public.sf_enquiries.is_synthetic is
  'True for test briefs. Default queue view excludes these rows.';
