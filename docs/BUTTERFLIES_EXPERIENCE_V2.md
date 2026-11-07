# Butterflies Educare — Experience V2
## Design intent
Make Butterflies Educare inviting and memorable **without making parents search harder**. Distinctive visual storytelling is used to reinforce three clear outcomes: find enrolment information, stay connected as a parent and contribute to the school. Official school facts are never invented.

## Audience research informing this release
- Coram Family and Childcare Survey 2025: in its surveyed parent sample, **92%** ranked hearing about their child's day among the three most important childcare features. Source: https://www.familyandchildcaretrust.org/sites/default/files/Childcare%20Survey%202025_8.pdf
- Child Trends (2026): surveyed US parents reported greater trust in school-origin information about education than information from social media or AI. Source: https://www.childtrends.org/publications/parents-trust-school-communications-education-more-AI-social-media-news
- McCrindle (2026) parent survey in Australia identified communication overload and the need for meaningful contact. Source: https://mccrindle.com.au/media-releases/parents-demand-better-school-communication/
- Nielsen Norman Group: authentic, transparent organisational information supports confidence; generic polished visuals cannot replace actual facts. Source: https://www.nngroup.com/reports/about-us-presenting-company-information/
- W3C WCAG 2.2: target adequate contrast, keyboard navigation, operable motion controls and reduced-motion preferences. Source: https://www.w3.org/TR/wcag/
- Google: aim for LCP under 2.5 s, INP under 200 ms and CLS under .1; **not measured in this release**. Source: https://developers.google.com/search/docs/appearance/core-web-vitals

These studies are from international samples and inform design hypotheses; they are **not** a substitute for observing Butterflies Educare's own parents.

## Delivered in this release
1. **Role-based visitor journeys** (prospective parent, existing family, community supporter) with direct portal links.
2. **School Guide:** accessible, client-side **rule-based** answer finder. It sends **no entered question text** to an AI provider or analytics service. It uses transparent prepared answers and, when relevant, the school's **published** announcements/events/fundraising feed from the existing Render API. When facts are unknown or the API fails, it says so and refers visitors to the school. Do not advertise it as generative AI.
3. **School-approved event → calendar:** when an event is available, visitors can download an ICS calendar entry. There is no event listed until school staff publish one. The event start time is taken from the published record, not invented; parents must still confirm changes.
4. **Optional parent morning checklist:** a few general reminders, saved only to localStorage on the parent's own device and reset each day. This is not a child record or an official school supply list.
5. **Additional dimensional CSS/SVG objects** including a layered illustrated book, botanical path cards, soft leaf orbits, dimensional card elevations and responsive parent art. This preserves the earlier butterfly flight, sunlight, and Giving Garden.
6. **Motion pause/resume** accessible to users; existing hero WebGL animation also pauses instead of continuing unnecessary frames. The site still respects OS reduced-motion preferences.

## Safety and approval gates
- Do not collect child names, IDs, medical information, imagery or private family details in the public School Guide.
- Do not introduce an unreviewed AI chatbot that generates school fees, opening hours or enrolment promises.
- The current Supabase Auth and parent portal remain unchanged; staff roles remain privileged. The school principal must still approve privacy details, redirect settings, contact information and public launch.
- Any real AI-powered knowledge assistant should be **phase 2**, only after school approval: server-side model with an approved, versioned school knowledge base, retrieval citations, clear confidence/fallback, no child data sent to the model, consent/retention design, injection-resistant tool restrictions and staff review. Hosting can reuse Render but an LLM provider may have costs.
- Community fundraising and sponsorship should never show simulated donations as actual progress.

## Release checks and regression targets
- `node scripts/validate-butterflies.mjs public/butterflies-educare`
- `node --check public/butterflies-educare/experience.js`
- Full portfolio and CraftBill builds via GitHub Actions.
- The production deploy verifies exact commit SHA, home page, new experience JavaScript/CSS and parent page.
- Functional browser regression still recommended: mobile 320/375/390/430/768px and desktop, sign-in/modal, keyboard input and screen-reader labeling, School Guide content when Render is offline, no published events, ICS download, local checklist, motion pause/resume.
- Future performance audits: Lighthouse on low-end Android throttling with LCP/INP/CLS field data; avoid converting every decorative object into WebGL.

## Next most valuable school-approved features
1. Actual school details and admissions criteria verified by the principal, transparent contact and reply expectations.
2. Staff publishing workflow for weekly approved news and event reminders.
3. Bilingual English/Afrikaans content after human verification, with additional languages based on family preference.
4. Enrolment application with lawful child-data handling and explicit guardian consent.
5. Consent-controlled private parent communication and staff-managed attachments.
6. Approved payment flow for fees/fundraising, with receipts and audit trails.
