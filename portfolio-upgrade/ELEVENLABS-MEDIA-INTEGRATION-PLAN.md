# ElevenLabs Media Integration Plan — 3D-Portfolio

**Status:** Preparation only — **do not copy unfinished videos/audio** until finals are approved.  
**Related scripts:** `ct-lead-gen` → `elevenlabs-production/` (voice scripts + generation queue).  
**Portfolio branch:** `agent/codex-portfolio-technical-cleanup`

---

## 1. Source folders (outside this repo)

| Source | Content |
|---|---|
| `ct-lead-gen/.../elevenlabs-production/` | Scripts, queue, naming rules (no binaries required) |
| Local ElevenLabs export directory (operator machine) | Final MP3 voiceovers |
| Local video editor exports | Final MP4/WebM with burned VO or separate audio mux |

Do not treat root untracked `vid*.mp4` in the portfolio clone as ElevenLabs finals.

---

## 2. Target folders (this repo)

### Preferred new drop zones (created)

```
public/media/nextgenwebs-video/     # finished portfolio-ready video
public/media/nextgenwebs-audio/     # finished VO beds if kept separate
```

### Existing structures to continue using

| Path | Current role |
|---|---|
| `public/projects/<project-slug>/` | Per-project cover, gallery, `preview.mp4`, `preview.webm`, `video-poster.webp` |
| `public/videos/vid1.mp4` … `vid14.mp4` | Homepage/about **ReelShowcase** shorts (existing social-style clips) |

**Rule:** Product walkthroughs with ElevenLabs narration should land primarily under **`public/projects/<slug>/`** (replace or add `preview.*` + poster) **or** under `public/media/nextgenwebs-video/` with a stable name, then referenced from `WorkPage` / `ProjectMedia`. Prefer project folders for case-study pages; use `public/media/nextgenwebs-video/` for brand/homepage multi-product cuts.

---

## 3. Naming rules

Align with ElevenLabs production naming where possible:

```
{product-slug}-{use-case}-{variant}-v{n}.{ext}
```

Examples:

| File | Use |
|---|---|
| `construction-portfolio-walkthrough-v1.mp4` | Project page / work showcase |
| `construction-portfolio-walkthrough-v1.webm` | Optional efficient companion |
| `construction-portfolio-walkthrough-v1-poster.webp` | Poster frame |
| `pest-control-portfolio-walkthrough-v1.mp3` | Audio-only bed if video edited later |
| `nextgenwebs-brand-homepage-v1.mp4` | Homepage hero/brand block |

Product slugs: `construction`, `bank-desert`, `insightforge`, `tiling`, `wellness`, `pest-control`, `zen-skin`, `solar`, `precision-laser`, `nextgenwebs`.

When replacing an existing project preview, either:

- overwrite `preview.mp4` / `preview.webm` / `video-poster.webp` after backup, **or**  
- add versioned files and update the project media fields in code in a dedicated content PR.

---

## 4. Which videos belong where

### Homepage

| Asset type | Placement | Notes |
|---|---|---|
| Brand film (`nextgenwebs-brand-homepage-v1`) | Homepage hero or mid-page “Studio” block | One only; keep short cutdown optional |
| Existing `public/videos/vid*.mp4` | `ReelShowcase` / about strip | Leave until intentionally replaced |
| Full 45s product walkthroughs | **Not** all on homepage | Too heavy; link out to `/work/:slug` |

### Project pages (`/work/:slug`)

| Asset type | Placement |
|---|---|
| 45s portfolio walkthrough VO+video | Primary project video (`preview.mp4` / webm) |
| Poster image | `video-poster.webp` required |
| Gallery stills | Existing numbered webp/png — unchanged unless refresh PR |

Map (when finals exist):

| Product | Project folder (current) |
|---|---|
| Construction | `public/projects/southern-suburbs-builders/` |
| Tiling | `public/projects/tableview-tiling/` |
| Pest control | `public/projects/westlake-pest-control/` |
| Wellness | `public/projects/vitality-wellness/` |
| Bank Desert | `public/projects/bank-desert-analysis/` |
| Analytics dashboard | `public/projects/insightforge/` |
| Precision Laser | `public/projects/precision-laser/` |
| Solar / Zen Skin | add folders only when project entries + media are ready |

### Social / YouTube only (do **not** bloat the portfolio bundle)

| Asset type | Destination |
|---|---|
| 15–20s Shorts / Reels VO + vertical edits | YouTube / IG / FB — host on those platforms |
| Etsy 15s listing VO + square cuts | Etsy listing media — **not** portfolio git |
| Cold outreach voice notes | Private CRM / send tools — **not** public portfolio |
| Blog audio summaries | Optional future blog player; not required in `public/` until article UX exists |

---

## 5. Max recommended sizes

| Asset | Max recommended | Hard caution |
|---|---:|---:|
| Project `preview.mp4` | ≤ **2.5 MB** | \>4 MB hurts mobile |
| Project `preview.webm` | ≤ **2.0 MB** | current precision-laser webm ~4.1 MB — compress on next replace |
| Homepage brand MP4 | ≤ **3.0 MB** | Prefer 45–75s efficient encode |
| Reel/`vid*.mp4` | ≤ **3.0 MB** each | already ~2.2–2.8 MB |
| Poster WebP | ≤ **150 KB** | 1280px wide enough |
| Standalone MP3 VO | ≤ **500 KB** for 45s | 128 kbps mono/stereo OK |

Encoding guidance (operator): H.264 + yuv420p, 720p or 1080p, 30 fps, CRF ~28–32 for UI screen captures; provide WebM VP9/AV1 only if size wins.

---

## 6. Poster image requirements

Every portfolio video must ship with a poster:

| Requirement | Spec |
|---|---|
| Format | `.webp` preferred (`.jpg` fallback OK) |
| Naming | `video-poster.webp` in project folder **or** `{name}-poster.webp` beside versioned video |
| Dimensions | Match video aspect (16:9 for walkthroughs) |
| Content | Real UI frame + readable product title text if needed |
| Accessibility | `ProjectMedia` / video `poster` attribute must be set |
| Claims | No fake ratings, bestsellers, or medical claims on poster text |

---

## 7. Integration steps (when finals exist)

1. QA audio against `elevenlabs-production` scripts (no hype claims).  
2. Mux VO into screen capture; export MP4 + optional WebM.  
3. Export poster WebP from a mid-demo frame.  
4. Copy into the correct `public/projects/<slug>/` **or** `public/media/nextgenwebs-video/`.  
5. Update project media fields only if filenames change (separate content-aware PR if copy changes).  
6. `npm run build` and smoke-test `/work` + project page video element.  
7. Do not commit experimental takes.

---

## 8. What not to put in git

- Raw ElevenLabs batch dumps  
- Uncompressed 4K screen recordings  
- Duplicate root `vid*.mp4` work files  
- Outreach voice notes  
- Etsy-only listing clips (keep in seller packs / Etsy, not portfolio)

---

## 9. Checklist before first media PR

- [ ] English VO approved  
- [ ] Video under size caps  
- [ ] Poster present  
- [ ] Fictional demo disclaimer not contradicted by on-screen text  
- [ ] No exact Etsy URL required in video if still pending  
- [ ] Build passes  
