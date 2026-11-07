# Butterflies Educare — Public Launch Runbook
Date: 7 November 2026

## Production URLs (existing services only)
- Public school website: https://iederees-create.github.io/3D-Portfolio/butterflies-educare/
- Parent & Community Network: https://iederees-create.github.io/3D-Portfolio/butterflies-educare/parent.html
- Interim data-handling information: https://iederees-create.github.io/3D-Portfolio/butterflies-educare/privacy.html
- Sitemap: https://iederees-create.github.io/3D-Portfolio/butterflies-educare/sitemap.xml
- Existing Render public API: https://product-listing-server.onrender.com/api/butterflies/health
- Existing Supabase project: sijvvbozaufzpjirijhb
- School records: be_* tables; private parent content protected by RLS.

## Launched in this release
- Public school homepage no longer has noindex; canonical, open graph and schema.org organization metadata.
- Parent app remains noindex; account and private submission pages should not be promoted as search landing pages.
- Accurate public wording: school website/network online, but unverified operational details and formal applications/fee collection not enabled.
- New published-only school-information panel for verified description, address, contact, hours, enrolment and fee guidance.
- New staff editor in the school management section. Staff can save drafts; publication requires a checked approval confirmation and adequate fields. RLS enforces staff access, with school details hidden publicly until published.
- Plain-language **interim technical data handling overview**—not a substitute for the school's approved POPIA notice. School must confirm responsible party, information officer/contact, retention/processor contracts and international transfer safeguards.
- Extra source, build and exact deployed-asset verification.

## CRITICAL: Activate school management before promoting parent signups
There were **zero assigned school staff accounts** at launch audit and **zero published school records**.
The principal or approved administrator must create an account and confirm their email. Then verify their identity through an independent school-approved channel. After verification only, an authorised privileged database operator may assign their role:

```sql
insert into public.be_staff_memberships(user_id,staff_role)
select id,'admin' from auth.users
where lower(email)=lower('VERIFIED_PRINCIPAL_EMAIL@EXAMPLE.COM')
  and email_confirmed_at is not null
on conflict(user_id) do update set staff_role=excluded.staff_role;
```
This snippet is **documentation only**. Do not execute with an invented address or assign administrative privileges to an unverified account. Ordinary site accounts cannot assign themselves roles through the frontend.

## CRITICAL: Finish Supabase Auth email configuration
In https://supabase.com/dashboard/project/sijvvbozaufzpjirijhb/auth/url-configuration add EXACTLY:
https://iederees-create.github.io/3D-Portfolio/butterflies-educare/parent.html
to the Redirect URLs allowlist. **Do not change the shared project's default Site URL**, because other apps use this project. Review templates for hardcoded {{ .SiteURL }} handling and ensure the school redirect is honored.
Check email provider and confirmed-email settings. Do not disable confirmation merely to simplify registration.

Perform a dedicated test-user journey with no child's data:
1. Sign up with an email you control.
2. Receive the confirmation email; click through to parent.html.
3. Sign in, set parent profile/consent and submit a generic enrolment information enquiry.
4. Confirm that a second account cannot see the first one's data.
5. Send a short message; authorised staff must see it and be able to reply.
6. Reset password and confirm the redirect.
7. Review staff role assignment and publish a single verified school announcement.
8. Check mobile navigation, real devices, Chrome/Firefox and any browser-specific errors.

## Official information still needed from the school
- Written approved school name/trading entity and address.
- Principal/admin verified email(s) and official contact email/phone.
- Opening/collection hours, age criteria, admissions steps, terms and availability.
- Correct school logo and permitted photos/media, with parent/guardian image permissions.
- Fees, payment recipient, Yoco/other approved provider, refund and receipt processes.
- Policy documents: privacy, retention, child safeguarding, acceptable-use, media consent, data access/correction/deletion and the information officer.
- School-approved fundraising project goals, sponsorship proposals and event dates.

## Launch boundaries
Do NOT enable school fee payments, fundraising checkout, public child profiles/photographs, child medical/intake uploads, or confirmed enrolment workflows until contracts, consent, school policy and payment verification are approved. The parent portal currently handles *general information requests only*. School approvals are separate from a developer's permission to work on the website.

## Search visibility
The homepage is eligible for indexing; indexing is not immediate or guaranteed.
Register/verify the school property in Google Search Console and submit:
https://iederees-create.github.io/3D-Portfolio/butterflies-educare/sitemap.xml
Request inspection of the homepage. Do not index the parent dashboard, interim privacy documentation or private member pages.
If the school owns an official domain, configure its DNS and approved domain ownership first, then update canonical, redirects, Auth allowlist, API CORS and sitemap with that real domain.

## Shared infrastructure caution
Supabase security advisors reported vulnerabilities involving **other applications in the shared project** (security-definer views/functions). Do not edit those unrelated projects without scoped review; consider isolating the school into its own project in the future if the school wants full operational independence. This release leaves other projects untouched.
