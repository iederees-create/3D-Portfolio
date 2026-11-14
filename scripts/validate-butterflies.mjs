#!/usr/bin/env node
/**
 * Reject incomplete or placeholder Butterflies Educare content in source and dist.
 * Usage: node scripts/validate-butterflies.mjs public/butterflies-educare
 *        node scripts/validate-butterflies.mjs dist/butterflies-educare
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

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
const calendarHTML = html.includes('href="./calendar.html"') ? load('calendar.html') : null;
const calendarJS = calendarHTML ? load('calendar.js') : null;
const calendarCSS = calendarHTML ? load('calendar.css') : null;
const calendarTeaserCSS = html.includes('href="./calendar-teaser.css"') ? load('calendar-teaser.css') : null;

if (Buffer.byteLength(html, 'utf8') < 4096) problems.push('index.html is unexpectedly small');

/* Guard the fully designed homepage against accidental replacement with a bare hero.
   The school experience relies on these sections and client assets existing together. */
const requiredHomeSections = [
  'id="top"', 'id="explore"', 'id="about"', 'id="news"',
  'id="parents"', 'id="community"', 'id="contact"', 'be-calendar-promo'
];
for (const section of requiredHomeSections) {
  if (!html.includes(section)) problems.push('Full school homepage section missing: ' + section);
}
const requiredHomeAssets = [
  'src="./site.js"', 'src="./atmosphere.js"', 'src="./network.js"',
  'src="./creative-garden.js"', 'src="./experience.js"',
  'src="./studio.js"', 'src="./school-information.js"'
];
for (const asset of requiredHomeAssets) {
  if (!html.includes(asset)) problems.push('School homepage script missing: ' + asset);
}
if (Buffer.byteLength(html, 'utf8') < 24000) problems.push('Full interactive school homepage is unexpectedly short');

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
if (calendarHTML !== null && (Buffer.byteLength(calendarHTML,'utf8') < 4000 || !calendarHTML.includes('id="cal-days"') || !calendarHTML.includes('id="cal-request-form"') || !calendarHTML.includes('id="cal-staff"'))) problems.push('Shared school calendar page missing or truncated');
if (calendarJS !== null && (Buffer.byteLength(calendarJS,'utf8') < 5000 || !calendarJS.includes('be_request_class_slot') || !calendarJS.includes('be_staff_review_class_proposal'))) problems.push('Guest-class calendar booking logic missing');
if (calendarCSS !== null && (Buffer.byteLength(calendarCSS,'utf8') < 1500 || !calendarCSS.includes('cal-calendar-layout'))) problems.push('Responsive calendar styling missing');
if (calendarTeaserCSS !== null && Buffer.byteLength(calendarTeaserCSS,'utf8') < 800) problems.push('Calendar discovery panel missing');
if (calendarHTML !== null && !html.includes('be-calendar-promo')) problems.push('Homepage must link guest-class calendar');
if (parentHTML !== null && calendarHTML !== null && !parentHTML.includes('href="./calendar.html"')) problems.push('Parent network must link shared calendar');
if (sitemap !== null && calendarHTML !== null && !sitemap.includes('calendar.html')) problems.push('School sitemap must include shared calendar');


if (/sb_secret_|service_role|NOWPAYMENTS_API_KEY|YOCO_SECRET_KEY/i.test(script + (atmosphereJS || '') + (networkJS || '') + (creativeJS || '') + (experienceJS || '') + (studioJS || '') + (schoolInfoJS || '') + (calendarJS || ''))) problems.push('Potential secret accidentally included in browser JavaScript');

/* WhatsApp website-support release checks: every school route must expose the same safe enquiry widget. */
const supportJS=load('whatsapp-support.js');
const supportCSS=load('whatsapp-support.css');
for (const page of ['index.html','parent.html','calendar.html','privacy.html','apply-2027.html','principal.html']) {
  const source=page==='index.html'?html:load(page);
  if (!source.includes('href="./whatsapp-support.css"') || !source.includes('src="./whatsapp-support.js"'))
    problems.push('WhatsApp Support widget missing from '+page);
}
if (!supportJS.includes('27762851980') || !supportJS.includes('https://wa.me/') ||
    !supportJS.includes('My question: ') || !supportJS.includes('const url = new URL(window.location.href)'))
  problems.push('WhatsApp support message, number or private-URL protection missing');
if (!supportCSS.includes('.be-wa-trigger') || !supportCSS.includes('.be-wa-dialog'))
  problems.push('WhatsApp support button or enquiry dialog styling missing');

/* Application and school-management release checks. */
const applicationPage = load('apply-2027.html');
const applicationScript = load('applications-2027.js');
const applicationCSS = load('applications-2027.css');
const principalPage = load('principal.html');
const principalScript = load('principal-dashboard.js');
const principalCSS = load('principal-dashboard.css');

if (!html.includes('href="./apply-2027.html"')) problems.push('Homepage 2027 application link is missing');
if (parentHTML !== null && !parentHTML.includes('href="./apply-2027.html"')) problems.push('Parent portal 2027 application link is missing');
if (!applicationPage.includes('id="application-form"') ||
    !applicationPage.includes('id="review-summary"') ||
    !applicationPage.includes('id="staff-panel"')) problems.push('2027 school application flow missing from public bundle');
if (!applicationScript.includes('be_submit_application_2027') ||
    !applicationScript.includes('be_review_application_2027') ||
    !applicationScript.includes('be_application_health_2027')) problems.push('2027 application JS workflow missing');
if (!applicationCSS.includes('.form-step')) problems.push('2027 form styling missing');
if (!principalPage.includes('id="principal-app"') ||
    !principalPage.includes('id="developer-tools"') ||
    !principalPage.includes('id="owner-staff-form"')) problems.push('School management / owner console missing');
if (!principalScript.includes('be_developer_owners') ||
    !principalScript.includes('be_owner_manage_staff') ||
    !principalScript.includes('be_owner_list_staff')) problems.push('Developer owner role checks missing');
if (!principalCSS.includes('.owner-console')) problems.push('Developer owner responsive styling missing');
if (networkCSS !== null && !networkCSS.includes('body.be-network a.be-btn.be-primary:visited')) problems.push('Dark parent CTA link text contrast fix missing');

for (const filename of [
  'site.js', 'atmosphere.js', 'network.js', 'creative-garden.js',
  'experience.js', 'studio.js', 'school-information.js', 'calendar.js',
  'applications-2027.js', 'principal-dashboard.js', 'whatsapp-support.js'
]) {
  const checked = spawnSync(process.execPath, ['--check', path.join(root, filename)], { encoding: 'utf8' });
  if (checked.status !== 0) {
    problems.push('JavaScript syntax check failed for ' + filename + ': ' +
      (checked.stderr || checked.error?.message || 'unknown error').slice(0, 200));
  }
}

if (problems.length) {
  for (const problem of problems) console.error('::error::Butterflies Educare: ' + problem);
  process.exitCode = 1;
} else {
  console.log('Butterflies Educare preview verified at ' + root + ' (' + Buffer.byteLength(html, 'utf8') + ' bytes HTML)');
}
