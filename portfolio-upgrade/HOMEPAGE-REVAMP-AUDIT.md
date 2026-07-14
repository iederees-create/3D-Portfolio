# Homepage Revamp Audit

## Repository State

- Worktree: `/home/iedrees/Workspace/3D-Portfolio-homepage-codex`
- Branch verified: `agent/codex-homepage-revamp`
- Remote verified: `origin https://github.com/iederees-create/3D-Portfolio.git`
- Projects source of truth found in: `src/pages/WorkPage.tsx`
- Blog source of truth found in: `src/content/blog/articles.ts`

## Current Homepage Sections Before Revamp

- Narrow hero with greeting chip.
- H1: `Premium Web Development.`
- Short paragraph about fast, high-performance websites.
- Primary CTA to Work and secondary CTA to About.
- Right-side mission and tech stack notes.
- Two stat cards: hardcoded `14+ Projects Launched` and `100% Custom Built`.
- Skills ticker.

## Current Project Count

- Homepage previously showed: `14+ Projects Launched`.
- That number was hardcoded in `HomePage.tsx` as `PROJECT_COUNT = 14`.

## Actual Project Count

- Programmatic count from the exported `projects` array: `18`.
- Homepage proof should use `projects.length`, currently rendering as `18+`.
- Live demo URLs in project data: `18`.
- Data projects: `2`.
- Website template builds detected from project title/description: `7`.
- Interactive tools detected from `toolBadge` / `toolHighlight`: `5`.
- Blog articles: `3`.

## Missing Homepage Sections

- No visitor pathway selection for custom websites, templates, data products, interactive tools, proof, or contact.
- No featured project strip using real project data.
- No website template positioning beyond a navbar Etsy link.
- No local business lead-generation explanation.
- No dedicated data/analytics product section.
- No interactive tools showcase.
- No process section.
- No proof section grounded in actual portfolio data.
- No blog/insights teaser.
- No FAQ.
- No final conversion CTA beyond the initial buttons.
- No homepage-specific SEO component or structured data.

## Conversion Weaknesses

- The value proposition was too generic for small business owners, local service businesses, template buyers and data-product buyers.
- The page did not explain practical deliverables such as quote planners, calculators, booking funnels, local SEO, CSV dashboards or privacy-first tools.
- The hardcoded project count under-represented the real portfolio inventory.
- Visitors had to infer what NextGenWebs builds by clicking into Work; the homepage did not route them by intent.
- There was no proof hierarchy beyond a small stat card.
- The page did not use existing screenshots or project data to build trust.
- The Etsy path was present in the navbar but not positioned for template buyers on the homepage.

## Proposed New Homepage Structure

1. Hero with sharper positioning for websites, templates, calculators and dashboards.
2. Proof panel using real counts from project and blog data.
3. Visitor pathway cards: Work, Templates, Blog, Custom Build, Data Products, Interactive Tools.
4. Featured project strip using real featured projects.
5. Practical sections for local businesses, template buyers, data products and custom builds.
6. Interactive tools showcase sourced from projects with tool metadata.
7. Data and analytics product section sourced from Data-category projects.
8. Process section.
9. Proof/stat section based only on real portfolio data.
10. Blog teaser from real article metadata.
11. Etsy shop CTA using only the real shop URL.
12. Custom project CTA.
13. FAQ.
14. Final CTA.

## Guardrails

- Do not invent testimonials, reviews, sales, revenue, rankings or conversion uplift.
- Do not add fake Etsy product URLs.
- Keep proof stats tied to actual arrays and metadata.
- Keep the dark premium style but add stronger section rhythm and wider content blocks.
