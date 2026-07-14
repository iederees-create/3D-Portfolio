# Technical Cleanup Audit — 3D-Portfolio

**Repo:** `/home/iedrees/Workspace/3D-Portfolio`  
**Branch:** `agent/codex-portfolio-technical-cleanup`  
**Date:** 2026-07-14  
**Base:** latest `main` (already up to date with origin)

---

## 1. Package scripts

| Script | Before | After |
|---|---|---|
| `dev` | `vite` | unchanged |
| `build` | `tsc && vite build` | unchanged |
| `preview` | `vite preview` | unchanged |
| `lint` | **missing** | **`tsc --noEmit`** (low-risk; uses existing TypeScript) |

No ESLint/Prettier toolchain was present. A full ESLint install was **not** added (would expand deps and risk churn). Typecheck-as-lint is sufficient for this cleanup pass.

---

## 2. Missing lint script

**Finding:** No `lint` script in `package.json`.  
**Action:** Added `"lint": "tsc --noEmit"`.  
**Rationale:** Zero new dependencies; same checker already used in `build`.

---

## 3. Dependency vulnerabilities (`npm audit`)

| Item | Detail |
|---|---|
| Report | **3 vulnerabilities** (2 moderate, 1 high per npm summary) |
| Chain | `esbuild <=0.24.2` (moderate, GHSA-67mh-4wv8-2f99) ← `vite@5.x` ← `vite-plugin-pwa@0.20.x` |
| Advisory nature | Primarily **dev-server** request forgery class issue in esbuild; production static GitHub Pages deploy is lower direct exposure than local `vite dev` |
| `npm audit fix` (no force) | **No non-breaking fix applied** — remains unresolved without upgrade |
| `npm audit fix --force` | Would install **vite@8.x** (breaking). **Not run.** |

**Decision:** Document only. Schedule a deliberate Vite 6/7/8 + PWA plugin upgrade as a separate PR with regression testing. Do not force-fix on this branch.

---

## 4. Vite large chunk warning

| Metric (before cleanup) | Value |
|---|---|
| Single entry JS | `index-*.js` **~519 kB** minified (~157 kB gzip) |
| Warning | Chunks larger than 500 kB |

**Cause:** Eager import of all route pages + heavy vendor libs in one rollup chunk.

**Mitigations applied (safe):**

1. `React.lazy` + `Suspense` for all page routes in `src/App.tsx`  
2. `build.rollupOptions.output.manualChunks` in `vite.config.ts` for:
   - `react-vendor` (react, react-dom, react-router, helmet)
   - `motion-vendor` (framer-motion)
   - `icons-vendor` (lucide-react)
   - `three-vendor` (three / r3f / drei — only if pulled in)

**Note:** `HeroBackground.tsx` still uses `@react-three/*` but is **not imported by any live route**. Three.js may remain an unused dependency until a dedicated dead-code PR removes it.

---

## 5. Build output (baseline before code-split, for comparison)

```
dist/registerSW.js
dist/manifest.webmanifest
dist/index.html
dist/assets/index-*.css   ~43.6 kB
dist/assets/index-*.js    ~519 kB  (! 500 kB warning)
PWA generateSW: precache 6 entries (~554 KiB)
```

### Post-change build (this branch)

- **Lint:** `npm run lint` (`tsc --noEmit`) — **pass**
- **Build:** `npm run build` — **pass**
- **500 kB warning:** **cleared** (largest vendor chunk ~182 kB `react-vendor`; pages split)
- Entry/app chunks now include separate `HomePage`, `WorkPage`, `articles`, `motion-vendor`, `icons-vendor`, etc.
- PWA precache entries increased with more JS chunks (~20 entries, ~560 KiB shell)

---

## 6. Service worker status

| Item | Status |
|---|---|
| Plugin | `vite-plugin-pwa@0.20.x` |
| Register type | `autoUpdate` |
| Generated | `dist/sw.js`, `dist/workbox-*.js`, `dist/registerSW.js` |
| Precache | Small set of shell assets (not the multi-MB `public/videos` by default) |
| Risk | SW updates can sticky-cache shell; verify after deploys with hard refresh if chrome looks stale |

No SW disable recommended in this pass.

---

## 7. PWA assets

| Asset | Path | Notes |
|---|---|---|
| Manifest (static) | `public/site.webmanifest` | start_url `/3D-Portfolio/` |
| Manifest (build) | plugin-generated `dist/manifest.webmanifest` | mirrors vite config |
| Icon | `public/favicon.svg` only | No 192/512 PNG set; maskable SVG only — acceptable short-term, improve later |
| Theme | `#050505` / bg `#0F172A` | Matches dark portfolio |

---

## 8. Image / video asset sizes

### Project media (`public/projects/` ≈ 27 MB)

| Project folder | Approx size | Notes |
|---|---:|---|
| precision-laser | ~5.5 MB | includes large `preview.webm` (~4.1 MB) |
| westlake-pest-control | ~4.6 MB | |
| tableview-tiling | ~4.3 MB | |
| bank-desert-analysis | ~3.9 MB | some PNG stills larger than webp galleries |
| insightforge | ~3.8 MB | |
| vitality-wellness | ~2.8 MB | |
| southern-suburbs-builders | ~2.1 MB | |

Largest single project files: `preview.webm` / `preview.mp4` pairs — keep under stricter caps for future ElevenLabs composites (see media plan).

### Homepage / about reels (`public/videos/` ≈ 33 MB)

13× `vid*.mp4` (~2.2–2.8 MB each). Referenced by `ReelShowcase` and `AboutPage`.

### Untracked local clutter (repo root, **not** for commit)

~36 MB of `vid*.mp4` + `Act_as_an_expert_short_form_vi.mp4` sitting **outside** `public/`. Appear to be duplicates/work files. Do not commit.

---

## 9. Unused assets / dead code (technical)

| Item | Finding |
|---|---|
| `src/components/HeroBackground.tsx` | Uses three.js; **no imports** from pages — dead component |
| `@react-three/fiber`, `@react-three/drei`, `three` | Likely unused at runtime while HeroBackground is dead |
| Root `vid*.mp4` | Not used by app paths; untracked |
| `public/videos` vs root vids | App uses `public/videos` only |

**Not removed in this PR** (scope control). Recommended follow-up: delete or rewire HeroBackground; then drop three deps if unused.

---

## 10. Route health

| Route | Component | Notes |
|---|---|---|
| `/` | HomePage | OK |
| `/work` | WorkPage | OK |
| `/work/:slug` | ProjectPage | OK |
| `/about` | AboutPage | OK |
| `/blog` | BlogIndexPage | OK |
| `/blog/:slug` | ArticlePage | OK |
| `/contact` | ContactPage | OK |
| `/credentials` | CredentialsPage | OK |

Router basename from `import.meta.env.BASE_URL` → `/3D-Portfolio` (trailing slash stripped in `main.tsx`). Matches GitHub Pages base.

No 404 route component inside SPA (static `public/404.html` for host-level misses).

---

## 11. Changes made on this branch

1. Added `lint` script (`tsc --noEmit`)  
2. Route-level lazy loading + Suspense fallback  
3. Vite `manualChunks` vendor splits  
4. Created media drop folders for ElevenLabs integration  
5. Wrote `ELEVENLABS-MEDIA-INTEGRATION-PLAN.md`  
6. Did **not** run `npm audit fix --force`  
7. Did **not** copy unfinished ElevenLabs binary media  

---

## 12. Remaining / follow-up

- [ ] Planned Vite major upgrade to clear esbuild advisory without `--force` surprise  
- [ ] Remove or use `HeroBackground` + three dependencies  
- [ ] Optional PNG→webp for bank-desert large stills  
- [ ] Cap/compress project `preview.webm` over ~3 MB  
- [ ] Add 192/512 PWA PNG icons  
- [ ] Ignore or delete root untracked `vid*.mp4` clutter locally  
