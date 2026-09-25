# Portfolio Etsy Link Audit

Performed 2026-07-13 against Francis Listing Manager (`product-listing-server.onrender.com`),
Etsy API mode: Live, Connected: Yes, Shop: NextGenWebs — via the tool's own product list and
Etsy connection status only. No scraping of etsy.com, no Etsy automation.

## Method

Every project in `src/pages/HomePage.tsx`'s `projects[]` array was matched by name against the
11 products currently tracked in Francis Listing Manager. A project only keeps a public
`etsyUrl` if a matching product record exists there AND its status reflects a real, published,
publicly-viewable Etsy listing (internal status "Published" — not "Content Ready", "Draft",
"Ready to List", or "Archived", and not merely "an Etsy draft exists").

## Findings

| Project | SKU / Listing Manager match | Listing status | Previous URL | Verified URL | Action | Unresolved |
|---|---|---|---|---|---|---|
| InsightForge Business Analytics Studio | id 11 | Content Ready (Etsy draft created, not published) | none | — | None needed — already correctly unlinked | Awaiting human publish decision |
| Tiling Contractor Website Template | id 10 | Content Ready (Etsy draft created, not published) | none | — | None needed — already correctly unlinked | Awaiting human publish decision |
| Vitality Wellness Website Template | id 9 | Content Ready | none | — | None needed — already correctly unlinked | Awaiting content/listing progress |
| Pest Control Website Template (Westlake) | id 8 | Content Ready | none | — | None needed — already correctly unlinked | Awaiting content/listing progress |
| Zen Skin Studio Website Template | id 7 | Content Ready | none | — | None needed — already correctly unlinked | Awaiting content/listing progress |
| Claude Code Solar Lead Generation Template | no matching product | missing | none | — | None needed — already correctly unlinked | Not yet a Listing Manager product |
| RAVERSUS Clinical Portal | not a sellable template | n/a | none | — | Not applicable (client system, not a digital product) | — |
| Summit Painting CT | no matching product | missing | `https://nextgenwebs.etsy.com` (generic shop root) | none | **Removed** generic link | Not a Listing Manager product — likely a client site, not intended for resale |
| Amore Nails CT | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | Same as above |
| Pixel Perfect Hair | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | Same as above |
| Acme Plumbing Claremont | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | Same as above |
| Window Wizards CT | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | Same as above |
| First Choice Construction | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | Same as above |
| Creator Hub Pro Template | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | If this is meant to be a real sellable template, it needs a Listing Manager product created first |
| Aura Signs | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | Same as above |
| Fluent Path Tutoring | no matching product | missing | `https://nextgenwebs.etsy.com` | none | **Removed** | Same as above |

Other Francis Listing Manager products (Freelance Invoice Template, Wedding Budget Tracker,
Instagram Story Template Pack, AI Chatbot Starter Web App, Modern Portfolio Website Template,
Minimalist Productivity Planner) do not correspond to any portfolio project and were not
in scope for this audit.

## Result

**Zero** of the 16 portfolio projects currently have a genuinely published, verifiable Etsy
listing. All 9 generic `https://nextgenwebs.etsy.com` (shop-root) links have been removed —
a shop-root URL is not a product-specific purchase link and should never have stood in for one.
No new `etsyUrl` values were added anywhere, including for Bank Desert Analysis Student Lab
(still pending its own draft — see the release report).

## Reusable release rule

After any listing is manually published on Etsy, add its exact public listing URL to the
matching portfolio project's `etsyUrl` field before considering that product's release
complete. Never link the shop root or a draft URL as a purchase link.

## Follow-up — 2026-09-16

Re-checked live Etsy state via Francis Listing Manager's authenticated `/api/etsy/listings`
(Etsy API mode: Live, Connected: Yes, Shop: NextGenWebs, `state` read directly from Etsy, not
from local cache). Three projects that were correctly unlinked above now have a real, active,
publicly-purchasable listing and their `etsyUrl` was added in `src/pages/WorkPage.tsx`:

| Project | Etsy listing id | State | etsyUrl added |
|---|---|---|---|
| Trade Business Quote & Estimate Calculator | 4565932701 | active | `https://www.etsy.com/listing/4565932701/trade-business-quote-estimate-calculator` |
| Cleaning Business Instant Quote Kit | 4575649514 | active | `https://www.etsy.com/listing/4575649514/cleaning-business-quote-calculator-kit` |
| Booking Landing Page Kit | 4575621298 | active | `https://www.etsy.com/listing/4575621298/booking-landing-page-website-template` |

All other "no etsyUrl" entries from the original audit were left untouched - not re-verified
in this pass, still pending their own publish decision.
