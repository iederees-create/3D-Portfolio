// Social images (Buffer / Pinterest / TikTok posts) are stored in the repo as base64 text
// in scripts/social-assets/*.b64 and decoded into dist/social/ after the Vite build,
// so they are served as real image files at <base>/social/<name>.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'scripts', 'social-assets');
const outDir = join(root, 'dist', 'social');

if (existsSync(srcDir) && existsSync(join(root, 'dist'))) {
  mkdirSync(outDir, { recursive: true });
  let count = 0;
  for (const file of readdirSync(srcDir)) {
    if (!file.endsWith('.b64')) continue;
    const data = Buffer.from(readFileSync(join(srcDir, file), 'utf8').trim(), 'base64');
    writeFileSync(join(outDir, file.replace(/\.b64$/, '')), data);
    count += 1;
  }
  console.log(`decode-social: wrote ${count} image files to dist/social`);
}
