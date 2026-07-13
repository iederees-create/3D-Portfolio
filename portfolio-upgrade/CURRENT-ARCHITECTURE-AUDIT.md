# Current Architecture Audit

**Date:** 2026-07-13  
**Worktree:** 3D-Portfolio-grok-seo  
**Branch:** agent/grok-portfolio-seo  
**Base:** origin/main @ ebec0a1 (at branch creation)

## Stack
- React 18 + TypeScript + Vite 5
- react-router-dom v6 with basename `/3D-Portfolio`
- react-helmet-async for per-route SEO
- Tailwind CSS, Framer Motion, Three.js (hero)
- GitHub Pages deploy via `.github/workflows/deploy.yml` on **main** only
- SPA 404 fallback via `public/404.html` + index.html decode script

## Project data (before this branch)
- Embedded `projects` array in `src/pages/WorkPage.tsx`
- Showcase modal via `ProjectShowcase` when gallery present
- Etsy buttons only if `etsyUrl` set; audit docs require draft listings omit URL

## Project data (after this branch)
- Extracted to `src/content/projects/{types,projects,index}.ts`
- Extended fields: slug, seoTitle, seoDescription, articleSlug, etsyStatus, relatedProjectSlugs, etc.
- Work cards link to `/work/:slug/` case-study pages
- Etsy shown only when `etsyStatus === 'public'` and `etsyUrl` set

## Blog
- `src/content/blog/articles.ts` registry + per-article TSX content components
- Routes: `/blog`, `/blog/:slug`
- Two existing articles + new construction article on this branch

## SEO surfaces
- `src/components/SEO.tsx` — title, description, canonical, OG, Twitter
- `src/lib/site.ts` — SITE_URL constants
- Static `public/sitemap.xml`, `public/rss.xml`, `public/robots.txt`

## Gaps remaining
- Not all 18 projects have full galleries/videos
- Keyword research incomplete for every project (seed files for primary ones)
- Full 2500–4500 word articles not written for every project (honest scope)
- No automated sitemap generator in build pipeline (static XML updated manually)
- Dedicated project pages are client-rendered SPA routes (crawlability depends on crawler JS + 404 SPA trick)
