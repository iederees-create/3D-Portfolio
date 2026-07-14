# Homepage Revamp QA

## Commands Run

### Repository Verification

- `git status --short`
  - Result before edits: clean worktree.
- `git branch --show-current`
  - Result: `agent/codex-homepage-revamp`.
- `git remote -v`
  - Result: `origin https://github.com/iederees-create/3D-Portfolio.git` for fetch and push.
- `git log -5 --oneline`
  - Result:
    - `16a5c6d Merge portfolio upgrade batch 1`
    - `f34c0fc Add portfolio article roadmap and batch QA`
    - `639fb68 Add reusable project route foundation`
    - `3bb6a6e Implement verified missing project media`
    - `881c70d Add rebellious NextGenWebs favicon`

### Project Count

- Programmatic count command:
  - `node -e "const fs=require('fs'); const s=fs.readFileSync('src/pages/WorkPage.tsx','utf8'); const m=s.match(/export const projects: Project\\[\\] = \\[([\\s\\S]*?)\\n\\];\\n\\nconst categories/); const body=m[1]; console.log((body.match(/\\n  \\{\\n    title:/g)||[]).length);"`
- Result: `18`.
- Homepage now derives the project proof stat from `projects.length` and renders `18+`.

### Dependency Install

- `npm install`
- Result: passed.
- Notes:
  - Installed 492 packages and audited 493 packages.
  - npm reported 3 dependency vulnerabilities: 2 moderate, 1 high.
  - No automatic `npm audit fix --force` was run because it can introduce breaking changes.

### Lint

- `npm run lint`
- Result: failed because `package.json` does not define a `lint` script.
- Actual npm message: `Missing script: "lint"`.

### Build

- `npm run build`
- Result: passed.
- Output summary:
  - TypeScript compile completed.
  - Vite production build completed.
  - PWA files generated.
- Build warning:
  - Vite reported one chunk larger than 500 kB after minification and suggested code splitting or adjusting `chunkSizeWarningLimit`.

### Production Preview Smoke Check

- Initial `npm run preview -- --host 127.0.0.1 --port 4173` inside sandbox failed with:
  - `bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted`
- Reran with escalation:
  - `npm run preview -- --host 127.0.0.1 --port 4173`
- Result: passed.
- Local preview URL:
  - `http://127.0.0.1:4173/3D-Portfolio/`

### Browser Route Checks

Headless Chrome checks were run against the production preview:

- `google-chrome --headless --disable-gpu --no-sandbox --dump-dom http://127.0.0.1:4173/3D-Portfolio/`
  - Result: homepage rendered.
  - Verified DOM includes the updated homepage title, meta description, structured data, H1, `18+` project stat, template CTA, blog CTA, Work links, Contact links, data section and interactive tools section.
- `google-chrome --headless --disable-gpu --no-sandbox --dump-dom http://127.0.0.1:4173/3D-Portfolio/work`
  - Result: Work route rendered.
  - Verified DOM includes `Portfolio - 18 Projects` and project cards.
- `google-chrome --headless --disable-gpu --no-sandbox --dump-dom http://127.0.0.1:4173/3D-Portfolio/blog`
  - Result: Blog route rendered.
  - Verified DOM includes Blog title and real article cards.
- `google-chrome --headless --disable-gpu --no-sandbox --dump-dom http://127.0.0.1:4173/3D-Portfolio/contact`
  - Result: Contact route rendered.
  - Verified DOM includes Etsy and custom quote contact CTAs.

Headless Chrome emitted Google API registration warnings such as `PHONE_REGISTRATION_ERROR` / `DEPRECATED_ENDPOINT`. These came from Chrome internals during headless execution, not from the Vite app build output.

### Screenshot Smoke Checks

- `google-chrome --headless --disable-gpu --no-sandbox --screenshot=/tmp/home-desktop.png --window-size=1440,1400 http://127.0.0.1:4173/3D-Portfolio/`
  - Result: screenshot file written, 199361 bytes.
- `google-chrome --headless --disable-gpu --no-sandbox --screenshot=/tmp/home-mobile.png --window-size=390,1200 http://127.0.0.1:4173/3D-Portfolio/`
  - Result: screenshot file written, 53776 bytes.
- Visual inspection limitation:
  - The local image viewer failed with the same sandbox wrapper issue: `bwrap: loopback: Failed RTM_NEWADDR: Operation not permitted`.

## Manual Review Notes

- Homepage is now substantially fuller and routes visitors into Work, Templates, Blog, Contact, Data Products and Interactive Tools.
- No fake testimonials, revenue claims, ranking claims, review counts or sales counts were added.
- No fake Etsy product URLs were added; homepage links only to the real Etsy shop URL: `https://nextgenwebs.etsy.com`.
- Homepage proof stats are grounded in local project/article data:
  - `18+` real portfolio projects from `projects.length`.
  - `7+` website template builds from project title/description matching.
  - `5+` interactive tools from `toolBadge` / `toolHighlight` metadata.
  - `2` data products from `category === 'Data'`.
  - `3` blog articles from `articles.length`.
  - `18` live demos from project entries with `liveUrl`.
- Homepage SEO now includes a route-specific title, description, Open Graph tags and accurate `ProfessionalService` structured data.
- Build passed; lint could not run because no lint script exists.
