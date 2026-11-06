# Butterflies Educare: publishing workflow for Grok and developers

**Live preview:** https://iederees-create.github.io/3D-Portfolio/butterflies-educare/

**Source:** `public/butterflies-educare/` in `iederees-create/3D-Portfolio`.

## Reliable change process

1. Read the current `main` branch and the existing `.github/workflows/deploy.yml`.
2. Make site changes on a new feature branch. Preserve the complete school page, favicon, existing Supabase updates and accessible/mobile layout. Never commit temporary placeholder content.
3. Run `node scripts/validate-butterflies.mjs public/butterflies-educare` and `node --check public/butterflies-educare/site.js`. For wider changes also run `npm ci --legacy-peer-deps && npm run build`.
4. Create and merge a GitHub pull request into `main` after the validation workflow passes. If your GitHub connection cannot merge, report the exact action that failed; a committed feature branch is **not** a live deployment.
5. Monitor the **Deploy to GitHub Pages** workflow until `Build and validate website`, `Deploy GitHub Pages` and `Verify actual live release` all succeed.
6. Check the live page and its content. Confirm the commit SHA at `https://iederees-create.github.io/3D-Portfolio/butterflies-educare/deploy-version.txt` matches the deployed main commit.
7. Report the verified live link and deployment run URL. If any step fails, report the real failure rather than claiming it is published.

## Safeguards

- The publishing workflow has read-only repository access, and never modifies or pushes commits back to `main`.
- Pull requests are validated before merge.
- Invalid or placeholder school pages fail before they can be deployed.
- A successful workflow means GitHub Pages served the specific expected commit and the school page's HTML, JavaScript and favicon were reachable at validation time.
- A successful deploy does not prove that every visual animation works. Check interactive designs on desktop and mobile too.
- Do not change unrelated portfolio/CraftBill projects or introduce paid services. The website is a **school preview**, not an approved official school launch.
- Do not introduce unapproved contact details, child photographs, parent application data collection, payments or donations.

## Diagnose a failure

- **PR validation failed:** open `Validate website pull requests` and fix the failing source/build check.
- **Build failed:** open `Deploy to GitHub Pages` and inspect the Build job logs.
- **Deploy failed:** inspect the Deploy job; prior GitHub Pages incidents involved `syncing_files` timeouts. Retry only after checking that build assets are valid, and confirm the latest SHA.
- **Live verification failed:** GitHub may have served an older release, or the HTML/assets were incomplete. Inspect `deploy-version.txt` and the Verify job. Do not mark the release live until the SHA agrees.
