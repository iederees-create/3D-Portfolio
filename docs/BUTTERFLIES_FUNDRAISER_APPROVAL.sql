alter table public.be_fundraising_projects add column calendar_event_id uuid unique references public.be_school_events(id) on delete set null;
create or replace function public.be_approve_fundraiser(p_project_id uuid,p_title text,p_description text,p_goal text,p_starts_at timestamptz,p_ends_at timestamptz,p_venue text,p_approved boolean)
returns uuid language plpgsql security invoker set search_path='' as $$
declare v_project public.be_fundraising_projects%rowtype; v_event uuid;
begin
 if auth.uid() is null or not exists(select 1 from public.be_staff_memberships where user_id=auth.uid() and staff_role='admin') then raise exception 'School administrator access required' using errcode='42501'; end if;
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
