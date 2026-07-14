# Current Portfolio Audit

Date verified: 2026-07-14
Branch: agent/codex-portfolio-upgrade
Starting main SHA: 28039631769868e165629c28881b94d9edb80eb3

## Starting Point

- Repository found at `/home/iedrees/Workspace/3D-Portfolio`; requested `/home/iederees/Workspace/3D-Portfolio-codex` was not present in this environment.
- Claude completion commit `2803963 Add construction template case study and SEO article` is present at the starting HEAD.
- Work branch `agent/codex-portfolio-upgrade` was created from that verified starting point.
- Untracked root files existed before work started: `.agents/`, `.claude/`, `skills-lock.json`, `Act_as_an_expert_short_form_vi.mp4`, and `vid*.mp4`. They are unrelated and not part of this audit.

## Current Routes And Content

- Homepage, work page, about, blog index, article page, contact, and credentials routes exist.
- Blog article routes exist at `/blog/:slug`.
- Dedicated project routes `/work/:slug` do not exist yet.
- Project data currently lives in `src/pages/WorkPage.tsx`.
- SEO metadata is handled by `src/components/SEO.tsx` with canonical URLs from `src/lib/site.ts`.

## Projects

| Project | Cover image | Gallery count | MP4 | WebM | Poster | Related article | Project page status | Etsy URL status | Missing media / article / notes |
|---|---:|---:|---:|---:|---:|---|---|---|---|
| InsightForge Business Analytics Studio | `public/projects/insightforge/cover.webp` | 10 | `preview.mp4` | `preview.webm` | `video-poster.webp` | Missing | No dedicated route | Hidden; draft only per code comment and Etsy audit | Media complete. Article missing. |
| Bank Desert Analysis Student Lab | `public/projects/bank-desert-analysis/01-cover.png` | 4 | `preview.mp4` | `preview.webm` | `video-poster.webp` | `bank-desert-analysis-python-census-google-places` | No dedicated route | Hidden; draft only per code comment and Etsy audit | Media present but only 4 gallery images. Article exists. |
| RAVERSUS Clinical Portal | None | 0 | None | None | None | Missing | No dedicated route | No project Etsy URL | Missing portfolio media and article. Candidate RAVERSUS media exists in workspace but needs careful product/privacy review before use. |
| Tiling Contractor Website Template | `public/projects/tableview-tiling/cover.webp` | 10 | `preview.mp4` | `preview.webm` | `video-poster.webp` | Missing | No dedicated route | Hidden; no `etsyUrl` | Media complete. Article missing and high priority. |
| Construction Website Template | `public/projects/southern-suburbs-builders/cover.webp` | 10 | `preview.mp4` | `preview.webm` | `video-poster.webp` | `construction-website-quote-planner` | No dedicated route | Hidden; draft only per code comment and Etsy audit | Claude media and article present. Do not modify except verified fixes. |
| Claude Code Solar Lead Generation Template | None | 0 | None | None | None | Missing | No dedicated route | No project Etsy URL | Missing media and article. Source folder likely `/home/iedrees/Workspace/ac-solar-solutions-ct` or Etsy seller pack; not implemented in initial pass. |
| Pest Control Website Template | None | 0 | None | None | None | Missing | No dedicated route | No project Etsy URL | Verified seller-pack images and MP4 found for Westlake Pest Control. Article missing and high priority. |
| Vitality Wellness Website Template | `public/projects/vitality-wellness/cover.webp` | 0 | `preview.mp4` | `preview.webm` | `video-poster.webp` | Missing | No dedicated route | No project Etsy URL | Verified seller-pack gallery found; current portfolio lacks gallery. Article missing. |
| Summit Painting CT | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Missing media and article. Candidate screenshots exist but not priority. |
| Amore Nails CT | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Missing media and article. |
| Pixel Perfect Hair | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Candidate screenshots/videos exist but older and not priority. Missing article. |
| Zen Skin Studio Website Template | None | 0 | None | None | None | Missing | No dedicated route | No project Etsy URL | Missing media and article. Source packs exist in workspace but not confirmed in this first implementation pass. |
| Acme Plumbing Claremont | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Candidate screenshots exist but not priority. Missing article. |
| Window Wizards CT | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Candidate screenshots exist but not priority. Missing article. |
| First Choice Construction | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Missing media and article. |
| Creator Hub Pro Template | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Missing media and article. |
| Aura Signs | None | 0 | None | None | None | Missing | No dedicated route | Removed generic shop-root URL per Etsy audit | Missing media and article. |
| Fluent Path Tutoring | None | 0 | None | None | None | `why-educational-businesses-need-custom-learning-hubs` | No dedicated route | Removed generic shop-root URL per Etsy audit | Article exists, but no dedicated screenshot/cover in repo. |

## Blog

Current articles:

- `construction-website-quote-planner` for Construction Website Template.
- `bank-desert-analysis-python-census-google-places` for Bank Desert Analysis Student Lab.
- `why-educational-businesses-need-custom-learning-hubs` for Fluent Path Tutoring.

Missing articles:

- Tiling Contractor Website Template.
- InsightForge Business Analytics Studio.
- Pest Control Website Template.
- Claude Code Solar Lead Generation Template.
- Zen Skin Studio Website Template.
- Vitality Wellness Website Template.
- RAVERSUS Clinical Portal.
- Remaining legacy/client template projects.

## Links, SEO, And Feeds

- `public/sitemap.xml` includes homepage, blog index, and the three current article routes. It does not include `/work/` or project routes yet.
- `public/rss.xml` includes the three current articles, including the Southern Suburbs Builders article.
- `public/robots.txt` allows all and points to the sitemap.
- Global Etsy shop links exist in nav/footer/contact/blog article contexts. Project-level `etsyUrl` fields are hidden unless exact public listing URLs are verified.
- No exact active public Etsy listing URL is present for any project. Draft listings remain hidden.

## Duplicate Assets

- Root-level untracked `vid*.mp4` files duplicate media-like names and predate this work; left untouched.
- Westlake Pest Control seller-pack appears in multiple copied Southern Suburbs worktrees (`southern-suburbs-builders-codex`, `-claude`, `-grok`) plus the direct `clients/westlake-pest-control` source. The direct source was used for verification.
- Southern Suburbs source media exists in release-build folders, but the portfolio already contains Claude's completed media and was not modified.

## Unsupported Claims / Factual Gaps

- Portfolio descriptions for projects without full source review are treated as existing copy, not newly verified claims.
- RAVERSUS media may contain regulated health/bioelectric product context; requires separate factual and compliance review before adding media or claims.
- Draft Etsy products must remain unlinked until exact public listing URLs are verified after manual publication.
