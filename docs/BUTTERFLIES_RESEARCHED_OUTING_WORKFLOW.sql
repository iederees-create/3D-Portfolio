-- Apply after the core fundraising schema; school-only research and preferences.
create table public.be_fundraiser_research(
 project_id uuid primary key references public.be_fundraising_projects(id) on delete cascade,
 host_event_name text not null,event_type text not null check(event_type in ('dated_event','ongoing_attraction')),
 host_schedule text not null,proposed_start timestamptz not null,proposed_end timestamptz not null check(proposed_end>proposed_start),
 venue text not null,admission_note text not null,age_note text not null,
 source_urls jsonb not null check(jsonb_typeof(source_urls)='array'),verification_note text not null,
 public_description text not null check(length(public_description)<=1200),fundraising_approach text not null,checked_on date not null,
 selected boolean not null default false,selected_by uuid references auth.users(id) on delete set null,selected_at timestamptz,
 logistics_confirmed boolean not null default false
);
alter table public.be_fundraiser_research enable row level security;
revoke all on public.be_fundraiser_research from anon;
grant select,insert,update,delete on public.be_fundraiser_research to authenticated;
create policy researched_outings_admin_only on public.be_fundraiser_research for all to authenticated using(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin')) with check(exists(select 1 from public.be_staff_memberships where user_id=(select auth.uid()) and staff_role='admin'));
create or replace function public.be_choose_fundraiser_outing(p_project_id uuid)
returns void language plpgsql security invoker set search_path='' as $$
begin
if auth.uid() is null or not exists(select 1 from public.be_staff_memberships where user_id=auth.uid() and staff_role='admin') then raise exception 'School administrator access required' using errcode='42501'; end if;
perform pg_advisory_xact_lock(601116);
if not exists(select 1 from public.be_fundraiser_research r join public.be_fundraising_projects p on p.id=r.project_id where r.project_id=p_project_id and not p.published) then raise exception 'This draft outing is not available for selection'; end if;
update public.be_fundraiser_research set selected=false;
update public.be_fundraiser_research set selected=true,selected_by=auth.uid(),selected_at=now() where project_id=p_project_id;
end $$;
revoke all on function public.be_choose_fundraiser_outing(uuid) from public,anon;
grant execute on function public.be_choose_fundraiser_outing(uuid) to authenticated;

create or replace function public.be_approve_fundraiser(p_project_id uuid,p_title text,p_description text,p_goal text,p_starts_at timestamptz,p_ends_at timestamptz,p_venue text,p_approved boolean)
returns uuid language plpgsql security invoker set search_path='' as $$
declare v_project public.be_fundraising_projects%rowtype; v_event uuid;
begin
 if auth.uid() is null or not exists(select 1 from public.be_staff_memberships where user_id=auth.uid() and staff_role='admin') then raise exception 'School administrator access required' using errcode='42501'; end if;
 if exists(select 1 from public.be_fundraiser_research where project_id=p_project_id and not logistics_confirmed) then raise exception 'This researched outing still needs organiser, cost and booking confirmation by the development team before publication'; end if;
 if p_approved is distinct from true then raise exception 'Confirm principal approval before publishing'; end if;
 if p_title is null or length(trim(p_title)) not between 3 and 140 or p_description is null or length(trim(p_description)) not between 15 and 1200 or p_venue is null or length(trim(p_venue)) not between 3 and 140 or length(coalesce(p_goal,''))>250 then raise exception 'Check the public title, description, goal and venue'; end if;
 if p_starts_at is null or p_starts_at<=now() or p_ends_at is null or p_ends_at<=p_starts_at then raise exception 'Choose a future start and an end after it'; end if;
 select * into v_project from public.be_fundraising_projects where id=p_project_id for update;
 if not found then raise exception 'Fundraising proposal not found'; end if;
 if v_project.status='completed' then raise exception 'A completed fundraiser cannot be reopened here'; end if;
 v_event:=v_project.calendar_event_id;
 if exists(select 1 from public.be_school_events where published and id is distinct from v_event and lower(trim(venue))=lower(trim(p_venue)) and starts_at<p_ends_at and coalesce(ends_at,starts_at+interval '1 hour')>p_starts_at) then raise exception 'This venue already has a published event at that time'; end if;
 if v_event is null then
 insert into public.be_school_events(title,description,starts_at,ends_at,venue,published) values(trim(p_title),trim(p_description),p_starts_at,p_ends_at,trim(p_venue),true) returning id into v_event;
 else
 update public.be_school_events set title=trim(p_title),description=trim(p_description),starts_at=p_starts_at,ends_at=p_ends_at,venue=trim(p_venue),published=true where id=v_event;
 if not found then raise exception 'Linked calendar event not found'; end if;
 end if;
 update public.be_fundraising_projects set title=trim(p_title),description=trim(p_description),goal_description=nullif(trim(coalesce(p_goal,'')),''),calendar_event_id=v_event,published=true,status='active' where id=p_project_id;
 return v_event;
end $$;
revoke all on function public.be_approve_fundraiser(uuid,text,text,text,timestamptz,timestamptz,text,boolean) from public,anon;
grant execute on function public.be_approve_fundraiser(uuid,text,text,text,timestamptz,timestamptz,text,boolean) to authenticated;
