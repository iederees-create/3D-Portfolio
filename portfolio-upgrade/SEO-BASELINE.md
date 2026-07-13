# SEO Baseline

## Public site
https://iederees-create.github.io/3D-Portfolio/

## Before this branch
- Home, work (no per-project URLs), about, blog index, 2 articles, contact, credentials
- Static sitemap with home + blog routes only
- RSS with existing articles
- Client-side SEO via react-helmet-async

## After this branch
- `/work/:slug/` dedicated pages for all catalogue projects
- Sitemap includes all work slugs + new article
- RSS includes construction article
- Project pages emit CreativeWork + BreadcrumbList JSON-LD
- Etsy CTAs gated by etsyStatus === public

## Crawlability decision
SPA on GitHub Pages with 404.html redirect trick. Google can execute JS for many routes; still not equivalent to multi-page HTML. Future improvement: pre-render or SSG. Documented as residual risk.

## Ranking disclaimer
SEO improvements increase discoverability and coverage but **cannot guarantee rankings or traffic**.
