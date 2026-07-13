# Final QA

## Commands run
```
npm install
npm run build   # tsc && vite build — PASSED 2026-07-13
```

## Results
- TypeScript compile: pass (after removing accidental nested slug fields)
- Vite production build: pass
- No automated unit test suite defined in package.json

## Manual checks recommended
- Open `/work/southern-suburbs-builders/` with preview server
- Confirm Etsy buttons absent on draft projects
- Confirm gallery images load
- Confirm sitemap lists new routes
