create table public.be_school_enrolments(
 id uuid primary key default gen_random_uuid(),
 child_name text not null check(length(trim(child_name)) between 1 and 100),
 school_year integer not null check(school_year between 2020 and 2100),
 group_name text not null default 'Unassigned' check(length(group_name) between 1 and 100),
 status text not null default 'enrolled' check(status in ('enrolled','left','withdrawn')),
 parent_id uuid references public.be_parent_profiles(user_id) on delete set null,
 guardian_email text check(guardian_email is null or length(guardian_email) between 5 and 254),
 application_id uuid unique references public.be_applications_2027(id) on delete set null,
 created_at timestamptz not null default now()
);
alter table public.be_school_enrolments enable row level security;
revoke all on public.be_school_enrolments from anon;
grant select,insert,update,delete on public.be_school_enrolments to authenticated;
create policy enrolled_guardian_read on public.be_school_enrolments for select to authenticated using(parent_id=(select auth.uid()));
create policy enrolled_admin_manage on public.be_school_enrolments for all to authenticated using(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin')) with check(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create index be_school_enrolments_year_status on public.be_school_enrolments(school_year,status);
create index be_school_enrolments_parent on public.be_school_enrolments(parent_id);

create table public.be_presenter_requests(
 id uuid primary key default gen_random_uuid(), requested_by uuid not null references auth.users(id) on delete cascade,
 presenter_name text not null check(length(trim(presenter_name)) between 2 and 100),
 contact_email text not null check(length(contact_email) between 5 and 254),
 contact_phone text not null check(length(contact_phone) between 5 and 40),
 organisation text not null default '' check(length(organisation)<=150),
 class_title text not null check(length(trim(class_title)) between 3 and 140),
 class_description text not null check(length(class_description) between 20 and 2000),
 age_group text not null check(length(age_group) between 2 and 100),
 experience text not null check(length(experience) between 10 and 1500),
 preferred_start timestamptz not null,
 course_end date not null,
 duration_minutes integer not null check(duration_minutes between 10 and 480),
 frequency text not null check(frequency in ('once','weekly','fortnightly','monthly','other')),
 session_count integer not null check(session_count between 1 and 100),
 availability text not null check(length(availability) between 5 and 1000),
 fees text not null check(length(fees) between 3 and 500),
 materials text not null check(length(materials) between 2 and 1000),
 space_needs text not null check(length(space_needs) between 2 and 1000),
 max_attendees integer not null check(max_attendees between 1 and 300),
 preferred_slot_id uuid references public.be_class_slots(id) on delete set null,
 privacy_ack_at timestamptz not null default now(),
 safeguarding_ack_at timestamptz not null default now(),
 status text not null default 'pending' check(status in ('pending','needs_information','approved','declined','withdrawn')),
 school_reply text not null default '' check(length(school_reply)<=1500),
 created_at timestamptz not null default now(),
 check(course_end >= (preferred_start at time zone 'Africa/Johannesburg')::date)
);
alter table public.be_presenter_requests enable row level security;
revoke all on public.be_presenter_requests from anon,authenticated;
grant select on public.be_presenter_requests to authenticated;
grant insert(requested_by,presenter_name,contact_email,contact_phone,organisation,class_title,class_description,age_group,experience,preferred_start,course_end,duration_minutes,frequency,session_count,availability,fees,materials,space_needs,max_attendees,preferred_slot_id) on public.be_presenter_requests to authenticated;
grant update(status,school_reply) on public.be_presenter_requests to authenticated;
create policy presenter_own_read on public.be_presenter_requests for select to authenticated using(requested_by=(select auth.uid()));
create policy presenter_submit on public.be_presenter_requests for insert to authenticated with check(requested_by=(select auth.uid()) and status='pending' and school_reply='' and preferred_start>now());
create policy presenter_withdraw on public.be_presenter_requests for update to authenticated using(requested_by=(select auth.uid()) and status in ('pending','needs_information')) with check(requested_by=(select auth.uid()) and status='withdrawn' and school_reply='');
create policy presenter_admin_read on public.be_presenter_requests for select to authenticated using(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create policy presenter_admin_review on public.be_presenter_requests for update to authenticated using(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin')) with check(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create index be_presenter_requests_owner on public.be_presenter_requests(requested_by);
create index be_presenter_requests_status on public.be_presenter_requests(status);
create index be_presenter_requests_slot on public.be_presenter_requests(preferred_slot_id);
alter policy be_slots_public_available on public.be_class_slots to authenticated;
create policy be_slots_visitor_open on public.be_class_slots for select to anon using(published and state='open' and ends_at>now());
alter policy be_event_public_read on public.be_school_events to authenticated;
create policy be_event_visitor_published on public.be_school_events for select to anon using(published=true);

-- Review and replies are managed only by school administrators.
drop policy presenter_withdraw on public.be_presenter_requests;
alter policy be_regular_classes_public on public.be_regular_classes to authenticated;
create policy be_regular_classes_visitor_published on public.be_regular_classes for select to anon using(published=true);
