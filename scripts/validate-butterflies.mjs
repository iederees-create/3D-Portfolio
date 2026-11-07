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
const studioCSS = html.includes('href="./studio.css"') ? load("studio.css") : null;
const studioJS = html.includes('src="./studio.js"') ? load("studio.js") : null;
const launchCSS = html.includes('href="./launch.css"') ? load("launch.css") : null;
const schoolInfoJS = html.includes('src="./school-information.js"') ? load("school-information.js") : null;
const privacyHTML = html.includes('href="./privacy.html"') ? load("privacy.html") : null;
const sitemap = html.includes('rel="canonical"') ? load("sitemap.xml") : null;

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
if (studioCSS !== null && (Buffer.byteLength(studioCSS,'utf8') < 5000 || !studioCSS.includes('studio-bottom-nav') || !studioCSS.includes('studio-showcase'))) problems.push('Studio CSS missing or truncated');
if (studioJS !== null && (Buffer.byteLength(studioJS,'utf8') < 5000 || !studioJS.includes('accountGuidance') || !studioJS.includes('studioPanel'))) problems.push('Studio JS missing or truncated');
if (parentHTML !== null && studioJS !== null && (!parentHTML.includes('href="./studio.css"') || !parentHTML.includes('src="./studio.js"'))) problems.push('Parent portal is missing Studio files');
if (studioJS !== null && !html.includes('src="./studio.js"')) problems.push('Homepage is missing Studio JavaScript');
if (launchCSS !== null && Buffer.byteLength(launchCSS,'utf8') < 700) problems.push('Launch stylesheet missing or incomplete');
if (schoolInfoJS !== null && (!schoolInfoJS.includes('be_school_information') || !schoolInfoJS.includes('published=eq.true') || Buffer.byteLength(schoolInfoJS,'utf8') < 700)) problems.push('School-approved information renderer missing or unsafe');
if (privacyHTML !== null && (!privacyHTML.includes('interim technical information') || !privacyHTML.includes('noindex,follow'))) problems.push('School data-handling information page missing');
if (sitemap !== null && !sitemap.includes('https://iederees-create.github.io/3D-Portfolio/butterflies-educare/')) problems.push('School sitemap missing');
if (schoolInfoJS !== null && !html.includes('content="index,follow')) problems.push('School homepage must be indexable on public launch');
if (parentHTML !== null && !parentHTML.includes('content="noindex,nofollow"')) problems.push('Private parent portal must remain noindex');
if (parentHTML !== null && !parentHTML.includes('id="be-school-information-form"')) problems.push('Staff school-information publishing form missing');

if (/sb_secret_|service_role|NOWPAYMENTS_API_KEY|YOCO_SECRET_KEY/i.test(script + (atmosphereJS || '') + (networkJS || '') + (creativeJS || '') + (experienceJS || '') + (studioJS || '') + (schoolInfoJS || ''))) problems.push('Potential secret accidentally included in browser JavaScript');

if (problems.length) {
  for (const problem of problems) console.error('::error::Butterflies Educare: ' + problem);
  process.exitCode = 1;
} else {
  console.log('Butterflies Educare preview verified at ' + root + ' (' + Buffer.byteLength(html, 'utf8') + ' bytes HTML)');
}
