create table public.be_family_children (
 id uuid primary key default gen_random_uuid(), parent_id uuid not null references auth.users(id) on delete cascade,
 display_name text not null check(length(trim(display_name)) between 1 and 100),
 birth_date date check(birth_date >= date '2000-01-01' and birth_date <= current_date),
 school_group text not null default '' check(length(school_group)<=80),
 created_at timestamptz not null default now(), unique(id,parent_id)
);
alter table public.be_family_children enable row level security;
revoke all on public.be_family_children from anon;
grant select,insert,update,delete on public.be_family_children to authenticated;
create policy family_read on public.be_family_children for select to authenticated using (parent_id=(select auth.uid()) or exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create policy family_add on public.be_family_children for insert to authenticated with check(parent_id=(select auth.uid()));
create policy family_edit on public.be_family_children for update to authenticated using(parent_id=(select auth.uid())) with check(parent_id=(select auth.uid()));
create policy family_remove on public.be_family_children for delete to authenticated using(parent_id=(select auth.uid()));
create table public.be_family_class_requests(
 id uuid primary key default gen_random_uuid(), parent_id uuid not null references auth.users(id) on delete cascade,
 child_id uuid not null, class_id uuid not null references public.be_regular_classes(id),
 status text not null default 'pending' check(status in ('pending','confirmed','declined','cancelled')),
 created_at timestamptz not null default now(),
 foreign key(child_id,parent_id) references public.be_family_children(id,parent_id) on delete cascade,
 unique(child_id,class_id)
);
alter table public.be_family_class_requests enable row level security;
revoke all on public.be_family_class_requests from anon,authenticated;
grant select,insert on public.be_family_class_requests to authenticated;
grant update(status) on public.be_family_class_requests to authenticated;
create policy class_read on public.be_family_class_requests for select to authenticated using(parent_id=(select auth.uid()) or exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create policy class_add on public.be_family_class_requests for insert to authenticated with check(parent_id=(select auth.uid()) and status='pending' and exists(select 1 from public.be_regular_classes where id=class_id and published and accepting_interest));
create policy class_cancel on public.be_family_class_requests for update to authenticated using(parent_id=(select auth.uid())) with check(parent_id=(select auth.uid()) and status='cancelled');
create policy class_review on public.be_family_class_requests for update to authenticated using(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin')) with check(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create table public.be_family_fundraiser_support(
 id uuid primary key default gen_random_uuid(),parent_id uuid not null references auth.users(id) on delete cascade,
 project_id uuid not null references public.be_fundraising_projects(id) on delete cascade,
 support_type text not null check(support_type in ('volunteer','goods','sponsor')),
 status text not null default 'interested' check(status in ('interested','contacted','cancelled')),
 created_at timestamptz not null default now(), unique(parent_id,project_id)
);
alter table public.be_family_fundraiser_support enable row level security;
revoke all on public.be_family_fundraiser_support from anon,authenticated;
grant select,insert on public.be_family_fundraiser_support to authenticated;
grant update(status,support_type) on public.be_family_fundraiser_support to authenticated;
create policy support_read on public.be_family_fundraiser_support for select to authenticated using(parent_id=(select auth.uid()) or exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create policy support_add on public.be_family_fundraiser_support for insert to authenticated with check(parent_id=(select auth.uid()) and status='interested' and exists(select 1 from public.be_fundraising_projects where id=project_id and published));
create policy support_change on public.be_family_fundraiser_support for update to authenticated using(parent_id=(select auth.uid())) with check(parent_id=(select auth.uid()) and status in ('interested','cancelled'));
create policy support_review on public.be_family_fundraiser_support for update to authenticated using(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin')) with check(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create index be_family_children_parent on public.be_family_children(parent_id);
create index be_family_requests_parent on public.be_family_class_requests(parent_id);
create index be_family_requests_class on public.be_family_class_requests(class_id);
create index be_family_support_project on public.be_family_fundraiser_support(project_id);
