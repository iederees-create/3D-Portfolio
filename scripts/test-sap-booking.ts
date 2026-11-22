import { enrichBookingHref, buildBookingPayload, formSubmitSucceeded, formatQuizResult, situationForQuizResult } from '../src/content/inbound/booking.ts';

let failed = 0;
function check(name: string, ok: boolean, detail?: unknown) {
  console.log(ok ? 'OK' : 'FAIL', name, detail ?? '');
  if (!ok) failed += 1;
}

const href = enrichBookingHref(
  '/sap-archive/book/',
  {
    pathname: '/sap-archive/check/',
    search: '?ref=email-pilgrims&utm_source=newsletter&utm_medium=email&utm_campaign=pilgrims&ignored=1',
  },
  'B',
);
const params = new URLSearchParams(href.split('?')[1]);
check('book link keeps ref', params.get('ref') === 'email-pilgrims');
check('book link keeps utm', params.get('utm_source') === 'newsletter' && params.get('utm_medium') === 'email' && params.get('utm_campaign') === 'pilgrims');
check('book link adds from and result', params.get('from') === '/sap-archive/check/' && params.get('result') === 'B');
check('book link drops unrelated query', params.get('ignored') === null);
check('other links stay put', enrichBookingHref('/sap-archive/guide/', { pathname: '/sap-archive/', search: '?ref=x' }, 'A') === '/sap-archive/guide/');
check('existing from is kept', enrichBookingHref('/sap-archive/book/?from=/already/', { pathname: '/sap-archive/', search: '' }, null).includes('from=%2Falready%2F') || enrichBookingHref('/sap-archive/book/?from=/already/', { pathname: '/sap-archive/', search: '' }, null).includes('from=/already/'));

const payload = buildBookingPayload(
  {
    fullName: 'Ada Lovelace',
    workEmail: 'ada@example.com',
    company: 'Example Ltd',
    jobTitle: 'SAP Director',
    phone: '',
    situation: 'Moving from ECC to S/4HANA',
    specialist: 'Oksana',
    note: 'Thursday mornings',
  },
  {
    sourcePage: '/sap-archive/',
    httpReferrer: 'https://example.com/newsletter',
    ref: 'email-pilgrims',
    utmSource: 'newsletter',
    utmMedium: 'email',
    utmCampaign: 'pilgrims',
    quizResult: formatQuizResult('A', 'Your situation: ECC to S/4HANA migration'),
    submittedAt: '2026-11-22T12:00:00.000Z',
  },
);
check('subject', payload._subject === 'New SAP archive consultation booking request');
check('template and captcha', payload._template === 'table' && payload._captcha === 'false');
check('reply to work email', payload._replyto === 'ada@example.com');
check('tracking fields', payload.ref === 'email-pilgrims' && payload.utm_campaign === 'pilgrims' && payload.source_page === '/sap-archive/');
check('quiz result text', payload.quiz_result.startsWith('A:'));
check('submitted at', payload.submitted_at === '2026-11-22T12:00:00.000Z');
check('honeypot empty', payload._honey === '');
check('situation preset', situationForQuizResult('C') === 'SharePoint without proper SAP integration' && situationForQuizResult('W') === '');
check('success flag', formSubmitSucceeded(200, { success: 'true' }) && !formSubmitSucceeded(500, { success: 'true' }) && !formSubmitSucceeded(200, { success: false }));

if (failed) {
  console.error(`${failed} booking check(s) failed`);
  process.exit(1);
}
console.log('All booking checks passed');
