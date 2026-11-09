# Butterflies Educare — Unified School Calendar & Guest-Class Scheduling

Public calendar: https://iederees-create.github.io/3D-Portfolio/butterflies-educare/calendar.html

## Purpose
One calendar for published school events and opportunities for trusted community presenters to propose guest classes. Fewer WhatsApp back-and-forth messages and more enriching school activities.

## Delivered
- Public visitors browse published school events and genuinely open guest-class times in Africa/Johannesburg (SAST).
- Mobile-friendly month and day navigation, category filters, event detail and downloadable calendar invites for published events.
- Presenters sign into a confirmed school account, save an adult contact profile and privacy acknowledgement, select a published time, and submit a class title, general activity description and relevant experience.
- Submitting a proposal atomically holds the time until school staff decide. At most one pending or approved class can occupy the same slot. Presenter can withdraw pending request.
- Staff review privately, explicitly confirm principal approval and safeguarding checks, and approve/decline. Approval publishes an actual school event. Declining reopens the time. Staff can cancel approved classes, removing their published event.
- Staff create genuine class times or unpublished drafts. Two published guest slots cannot overlap in the same room.
- Homepage, parent portal, mobile navigation and existing school guide link to the shared calendar.

## Important restrictions
- No dates or actual class openings were invented. The school must publish its real availability before prospective presenters can book.
- No email/SMS confirmations configured. Proposal status is shown privately online.
- Screening and approval confirmation is a staff workflow control, not an automated background check. The school must verify suitability, safeguarding, supervision and any relevant credentials.
- This does not collect child names, attendance, photos, school fees or other sensitive child records.
- A request is not a confirmed booking or authorisation to enter school premises.
- Same-room guest slots cannot overlap. The staff form also checks existing published school events, but future school-event edits still require school coordination; do not promise automatic conflict-free scheduling for every event.

## Infrastructure and security
Existing Supabase project: sijvvbozaufzpjirijhb.
Private and RLS-protected class proposal records hold only adult contact details and the class idea.
School staff approve through authenticated restricted database functions, with the security-sensitive code in an unexposed private schema.
The public can only see open, published future guest slots; pending/confirmed requests are private to the presenter and staff.
No new Render or Supabase project, paid API or service-role key on the frontend.
Deploy tests reject placeholder homepages and verify the actual live files.

## To activate first bookings
1. Verify and assign a principal/staff admin account; no school staff had been assigned during the last audit.
2. Complete and test Supabase Auth email verification, password reset and parent-profile consent with a dedicated adult account.
3. Have school staff enter actual availability, rooms, confirmed event dates and the approval process.
4. Test two adults trying for the same time, staff approval, rejection, presenter withdrawal, event publication and cancellation.
5. Obtain school-approved privacy/safeguarding policies, relevant credential checks and contact/retention terms before broad use.
6. For optional external Google Calendar integration, arrange school-owned OAuth authorisation; the built-in calendar is currently the native source of truth.

## Next recommended features
1. Staff notifications for incoming class requests and approved-class confirmations using an approved school email service.
2. Staff-led presenter identity/credential review with protected documents and school safeguarding procedures.
3. Teacher weekly class updates and private parent photo permissions after a proper child-data policy.
4. English/Afrikaans school-approved translations, open-day and parent-meeting booking.
5. Optional authorised Google Calendar two-way syncing only after coordination rules and account ownership are agreed.

## Quality checks
Syntax and asset checks for calendar.html, calendar.js, calendar.css, calendar-teaser.css, homepage and parent portal.
Portfolio, CraftBill and actual published artifact builds.
Exact deployment revision verified from GitHub Pages.
The publish pipeline is not a substitute for adult-account, mobile and staff workflow testing.
