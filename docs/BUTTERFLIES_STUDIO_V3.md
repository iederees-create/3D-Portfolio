# Butterflies Educare — Studio V3 (parent-first redesign)

This release is a significant visual and usability upgrade to **both** school homepage and parent portal. Existing public school information, sign-in, Supabase security, the Render API, and all Grok-inspired butterfly assets remain unchanged.

## Design improvements
- A consistent warm, botanical visual identity with deeper dimensional cards, softer light, typography and consistent CTA treatment.
- Schoolhouse hero receives an elegant illustrated caption and layered lighting; the existing butterfly animations are preserved rather than replaced.
- Each major content section receives its own depth and background treatment. Portal stats, account forms and content cards use the same premium visual language.
- A thin scroll-progress bar, a keyboard-focusable back-to-top control and a **mobile quick-access navigation dock** appear on both site and portal.
- No new tracking, analytics, hosting service, 3D library or remote image fetches.

## Useful parent / community tools
- **Support Studio**: on-device draft generator for a first sponsorship or community partnership message, with copy and downloadable text. No text leaves the browser automatically; no AI model invents details.
- **Volunteer matching**: local choice-based suggestions for events, fundraising, communications or in-kind resources; links to the existing parent/community enquiry forms.
- **Support process guide**: transparently explains how the school would review any offer; no payments or fake donation statistics.
- **Parent activity filter**: filter existing private enquiries and messages by category without accessing anyone else's information. Uses only DOM entries already loaded for that account.
- **Account usability**: show/hide password, local password-strength guidance and warnings about obvious email-domain typos. Does not modify Supabase authentication or claim that a password is guaranteed secure.
- Corrected outdated parent-copy: the existing parent portal works as a **preview**; school-approved details and verified enrolment availability are still pending.

## Privacy and accessibility
- Never submit child names, ID numbers, medical information or photographs through the public forms. School staff must approve the privacy process before inviting families broadly.
- All community pitch text remains in the user's browser; copying/downloading requires an intentional click.
- Keep form labels, button states, keyboard focus, tab interactions and minimum mobile touch targets.
- Reduced-motion preferences still govern visual effects; no new WebGL surfaces added.
- Keep the existing three-step GitHub Pages production workflow, including exact commit-version verification.

## Next release goals that need school approval
1. Principal-provided school story, programmes, age criteria, hours, address, fee structures and photography with valid consent.
2. Confirmed parent onboarding and account-email redirects; properly test sign-up, password reset and staff reply journey.
3. Staff-defined enrolment follow-up processes and privacy retention schedule.
4. Verified sponsorship deck, suggested fundraising priorities, school-reviewed language and official contact channels.
5. Human-reviewed multilingual content and a retrieval-grounded AI assistant under data-processing rules.

## GitHub development
Edit **`public/butterflies-educare/studio.css`** and **`studio.js`** for these visual/UX features. Avoid replacing the 27 KB homepage HTML with placeholders. Always re-fetch the entire file after any targeted edit and make sure the CI validates both homepage and parent portal. Use a pull request, then verify the live GitHub Pages release SHA.

After a successful deploy, test desktop/mobile 320, 375, 390, 430, 768 and 1440px, auth modal, local draft copy/download, parent activity filtering and the mobile dock. Passing CI is not a substitute for real-browser visual QA.
