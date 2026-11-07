#!/usr/bin/env node
/**
 * Reject incomplete or placeholder Butterflies Educare content in source and dist.
 * Usage: node scripts/validate-butterflies.mjs public/butterflies-educare
 *        node scripts/validate-butterflies.mjs dist/butterflies-educare
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || 'public/butterflies-educare');
const problems = [];
const load = (name) => {
  try { return fs.readFileSync(path.join(root, name), 'utf8'); }
  catch { problems.push('Missing or unreadable ' + name); return ''; }
};

const html = load('index.html');
const script = load('site.js');
const favicon = load('favicon.svg');
const atmosphereCSS = html.includes('href="./atmosphere.css"') ? load('atmosphere.css') : null;
const atmosphereJS = html.includes('src="./atmosphere.js"') ? load('atmosphere.js') : null;
const parentHTML = html.includes('src="./network.js"') ? load('parent.html') : null;
const networkCSS = html.includes('href="./network.css"') ? load('network.css') : null;
const networkJS = html.includes('src="./network.js"') ? load('network.js') : null;
const creativeCSS = html.includes('href="./creative-garden.css"') ? load('creative-garden.css') : null;
const creativeJS = html.includes('src="./creative-garden.js"') ? load('creative-garden.js') : null;
const experienceCSS = html.includes('href="./experience.css"') ? load('experience.css') : null;
const experienceJS = html.includes('src="./experience.js"') ? load('experience.js') : null;

if (Buffer.byteLength(html, 'utf8') < 4096) problems.push('index.html is unexpectedly small');
if (!/^\s*<!doctype html>/i.test(html)) problems.push('index.html is not a full HTML document');
if (!/<html\b[^>]*>/i.test(html) || !/<\/html\s*>/i.test(html)) problems.push('HTML root is incomplete');
if (!/<title>\s*Butterflies Educare\b/i.test(html)) problems.push('School page title is missing');
if (!/<main\b/i.test(html) || !/<\/main\s*>/i.test(html)) problems.push('Main website content is missing');
if (/PLACEHOLDER_(?:AGAIN|WILL_FAIL)|^\s*PLACEHOLDER\b/i.test(html)) problems.push('Placeholder content detected');
if (Buffer.byteLength(script, 'utf8') < 200) problems.push('site.js is missing or truncated');
if (!/<svg\b/i.test(favicon)) problems.push('favicon.svg is invalid');
if (atmosphereCSS !== null && Buffer.byteLength(atmosphereCSS, 'utf8') < 200) problems.push('atmosphere.css is missing or truncated');
if (atmosphereJS !== null && Buffer.byteLength(atmosphereJS, 'utf8') < 100) problems.push('atmosphere.js is missing or truncated');
if (parentHTML !== null && (!parentHTML.includes('<title>Parent & Community Network') || !parentHTML.includes('id="be-auth-dialog"'))) problems.push('Parent portal HTML missing or truncated');
if (networkCSS !== null && Buffer.byteLength(networkCSS,'utf8') < 1000) problems.push('Parent network CSS missing or truncated');
if (networkJS !== null && (!networkJS.includes('signInWithPassword') || !networkJS.includes('be_parent_profiles'))) problems.push('Parent network JavaScript missing or incomplete');
if (creativeCSS !== null && (!creativeCSS.includes('creative-giving-garden') || Buffer.byteLength(creativeCSS,'utf8') < 1000)) problems.push('Creative garden CSS missing or incomplete');
if (creativeJS !== null && (!creativeJS.includes('creative-vision-20261107') || Buffer.byteLength(creativeJS,'utf8') < 1000)) problems.push('Creative garden JavaScript missing or incomplete');
if (experienceCSS !== null && (!experienceCSS.includes('bex-journeys') || !experienceCSS.includes('bex-guide') || Buffer.byteLength(experienceCSS,'utf8') < 2000)) problems.push('School experience CSS missing or incomplete');
if (experienceJS !== null && (!experienceJS.includes('RULE-BASED') || !experienceJS.includes('getApprovedFeed') || !experienceJS.includes('downloadEvent') || Buffer.byteLength(experienceJS,'utf8') < 3000)) problems.push('School experience JavaScript missing or incomplete');
if (parentHTML !== null && experienceJS !== null && (!parentHTML.includes('href="./experience.css"') || !parentHTML.includes('src="./experience.js"'))) problems.push('Parent portal is missing the new experience module');
if (/sb_secret_|service_role|NOWPAYMENTS_API_KEY|YOCO_SECRET_KEY/i.test(script + (atmosphereJS || '') + (networkJS || '') + (creativeJS || '') + (experienceJS || ''))) problems.push('Potential secret accidentally included in browser JavaScript');

if (problems.length) {
  for (const problem of problems) console.error('::error::Butterflies Educare: ' + problem);
  process.exitCode = 1;
} else {
  console.log('Butterflies Educare preview verified at ' + root + ' (' + Buffer.byteLength(html, 'utf8') + ' bytes HTML)');
}
