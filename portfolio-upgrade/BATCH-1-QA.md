# Batch 1 QA

Date: 2026-07-14
Branch: agent/codex-portfolio-upgrade

## Commands Run

| Command | Result | Notes |
|---|---|---|
| git status --short | Pass | Showed unrelated pre-existing untracked root files plus this batch changes. |
| git branch --show-current | Pass | agent/codex-portfolio-upgrade |
| git remote -v | Pass | origin points to https://github.com/iederees-create/3D-Portfolio.git |
| git log -5 --oneline | Pass | Starting HEAD included 2803963 Add construction template case study and SEO article. |
| git merge-base --is-ancestor origin/main HEAD | Pass | Exit code 0. |
| npm install | Pass with warnings | Up to date. Audit reported 3 vulnerabilities: 2 moderate, 1 high. No automatic audit fix run. |
| npm run lint | Not available | Failed with Missing script: "lint". package.json has dev/build/preview only. |
| npm run build | Pass | tsc and Vite build completed successfully. Final build: assets/index-BbM4-_Zd.js and assets/index-BVdQxTZn.css. |

## Build Output Checks

- Confirmed `dist/favicon.svg` exists.
- Confirmed `dist/site.webmanifest` exists.
- Confirmed generated PWA `dist/manifest.webmanifest` now points to `/3D-Portfolio/favicon.svg` with `theme_color` `#050505`.
- Confirmed `dist/index.html` contains the requested favicon, site manifest, and theme-color tags.

## Route And Content Checks

- Homepage route remains `/` under BrowserRouter basename `/3D-Portfolio`.
- Work page remains `/work` and now links each card to `/work/:slug/`.
- Direct project route foundation added at `/work/:slug`.
- Southern Suburbs Builders article remains registered at `/blog/construction-website-quote-planner/`.
- Southern Suburbs Builders project media and data were preserved; no files in `public/projects/southern-suburbs-builders/` were modified.
- Sitemap now includes `/work/` plus every generated project route.
- RSS still contains the three current articles, including the Southern Suburbs Builders article.

## Media Checks

- Pest Control Website Template now has cover, 10 gallery images, MP4, WebM, poster and media manifest.
- Vitality Wellness Website Template now has 10 gallery images and media manifest; existing cover/video/poster were retained.
- No exact public Etsy listing URL was added.
- Existing generic Fluent Path article "Buy on Etsy" CTA was replaced with an internal project discussion CTA.

## Manual Validation Limits

- Browser/mobile/keyboard checks were not run with Playwright in this batch; validation was limited to TypeScript build, static route/data inspection, generated dist artifacts, and media file verification.
- The project does not provide a test script.
