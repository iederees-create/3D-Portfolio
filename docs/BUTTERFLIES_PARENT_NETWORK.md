# Butterflies Educare — parent and community network (pilot)

**Website preview:** https://iederees-create.github.io/3D-Portfolio/butterflies-educare/
**Parent area:** https://iederees-create.github.io/3D-Portfolio/butterflies-educare/parent.html
**Existing backend:** https://product-listing-server.onrender.com/api/butterflies/health

## Delivered
- Mobile-friendly school network with a Create Account / Sign In / Reset Password modal, using the existing `portfolio` Supabase Auth project.
- Private parent profiles and consent, enrolment **information** enquiries (not confirmed registrations), secure school messages and staff replies, event RSVPs, and community / sponsorship / volunteering enquiries.
- School-approved public announcements, fundraising projects, events and attendance requests.
- Staff-only dashboard for submitting draft school news/events/projects, reviewing member activity, publishing approved content and replying to parents.
- Render `/api/butterflies/overview` for approved public content; browser falls back to Supabase read-only APIs if Render is unavailable.
- All school tables are isolated with `be_` names and row-level security. No new paid service or Supabase project.

## Before inviting real parents
1. The principal must approve the design, how parent contact details will be handled, the school's terms and privacy notice, and who should have staff access. This is a **preview** until that happens.
2. Add `https://iederees-create.github.io/3D-Portfolio/butterflies-educare/parent.html` to Supabase dashboard **Authentication → URL Configuration → Redirect URLs** for project `sijvvbozaufzpjirijhb`. Confirm the default Site URL and email templates do not send school users to another app. Check email provider settings, confirmation emails and password reset.
3. Do **not** disable email verification for convenience. Test sign-up, confirmation, password reset and sign-in with a dedicated test account before broad circulation.
4. Verify the correct principal/staff account identity outside the portal. Then assign a staff role through a privileged Supabase SQL operation, never through a public frontend:
   ```sql
   insert into public.be_staff_memberships (user_id,staff_role)
   select id,'admin' from auth.users where lower(email)=lower('verified-principal-email@example.org')
   on conflict(user_id) do update set staff_role=excluded.staff_role;
   ```
   Replace the placeholder with the **verified** email. This example is documentation, **not** a role assignment.
5. The school's official contact details, enrolment criteria, programmes, payment details and privacy-controller information are still unknown. Add only confirmed details.
6. Do not collect children’s names, health information, documents, photographs or payments in this pilot. A lawful, consent-managed enrolment workflow and Yoco payment integration require separate approval.
7. School staff must approve announcements, events and fundraising projects before publishing them, and handle enquiries on an agreed retention and response schedule.

## Supabase schema
Project: `sijvvbozaufzpjirijhb`.
Tables: `be_staff_memberships`, `be_parent_profiles`, `be_enrolment_enquiries`, `be_school_events`, `be_event_rsvps`, `be_fundraising_projects`, `be_sponsorship_enquiries`, `be_volunteer_interests`, `be_parent_messages`, existing `be_public_content`.
Role `anon` can only read published school content and public-approved projects/events. Parent contact data requires an authenticated session with RLS restricting access to the owner and verified school staff. There is no self-registration path to a school staff role.

## Developer notes
- Standalone files: `public/butterflies-educare/parent.html`, `network.css`, `network.js`. The original `index.html` only links them; don't overwrite its whole contents with generated placeholders.
- Supabase publishable key is intentionally safe for browsers, but service-role or secret keys must never appear in static JS.
- Render routes are read-only and publicly accessible; authenticated member and staff data is accessed with a verified Supabase session and table RLS.
- Do not invent school dates, event attendance counts, donation amounts, financial details or claims.
