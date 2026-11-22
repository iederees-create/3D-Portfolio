export const SAP_BOOK_PATH = '/sap-archive/book/';
export const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/iedereesfrancis@gmail.com';
export const QUIZ_RESULT_STORAGE_KEY = 'sap-archive-quiz-result';

export const BOOKING_SUBJECT = 'New SAP archive consultation booking request';

export const SITUATION_OPTIONS = [
  'Moving from ECC to S/4HANA',
  'No structured document management',
  'SharePoint without proper SAP integration',
  'Not sure',
] as const;

export type SituationOption = (typeof SITUATION_OPTIONS)[number];
export type SpecialistName = 'John' | 'Oksana';

const RESULT_TO_SITUATION: Record<string, SituationOption> = {
  A: 'Moving from ECC to S/4HANA',
  B: 'No structured document management',
  C: 'SharePoint without proper SAP integration',
};

export const QUIZ_RESULT_LABELS: Record<string, string> = {
  A: 'ECC to S/4HANA migration',
  B: 'No structured document management',
  C: 'SharePoint without proper SAP integration',
  W: 'Well covered',
};

export interface StoredQuizResult {
  id: string;
  headline: string;
}

export function rememberQuizResult(id: string, headline: string) {
  try {
    sessionStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify({ id, headline }));
  } catch {
    // Private browsing can block storage. The query string still carries the result.
  }
}

export function readQuizResult(): StoredQuizResult | null {
  try {
    const raw = sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredQuizResult;
    if (!parsed || typeof parsed.id !== 'string') return null;
    return { id: parsed.id, headline: typeof parsed.headline === 'string' ? parsed.headline : '' };
  } catch {
    return null;
  }
}

export function situationForQuizResult(resultId: string): SituationOption | '' {
  return RESULT_TO_SITUATION[resultId] ?? '';
}

export function formatQuizResult(resultId: string, headline = ''): string {
  if (!resultId) return 'Not provided';
  const label = headline || QUIZ_RESULT_LABELS[resultId] || '';
  return label ? `${resultId}: ${label}` : resultId;
}

const TRACKING_KEYS = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'result'] as const;

export function isBookingHref(href: string): boolean {
  return href === SAP_BOOK_PATH || href.startsWith(`${SAP_BOOK_PATH}?`);
}

/** Keep ref, utm and quiz result when a consultation link leaves the current page. */
export function enrichBookingHref(
  href: string,
  location: { pathname: string; search: string },
  quizResultId?: string | null,
): string {
  if (!isBookingHref(href)) return href;
  const next = new URLSearchParams(href.includes('?') ? href.slice(href.indexOf('?') + 1) : '');
  const current = new URLSearchParams(location.search.startsWith('?') ? location.search.slice(1) : location.search);
  if (!next.get('from') && location.pathname && location.pathname !== SAP_BOOK_PATH.replace(/\/$/, '')) {
    next.set('from', location.pathname);
  }
  for (const key of TRACKING_KEYS) {
    if (!next.get(key) && current.get(key)) next.set(key, current.get(key) as string);
  }
  if (!next.get('result') && quizResultId) next.set('result', quizResultId);
  const query = next.toString();
  return query ? `${SAP_BOOK_PATH}?${query}` : SAP_BOOK_PATH;
}

export interface BookingFormInput {
  fullName: string;
  workEmail: string;
  company: string;
  jobTitle: string;
  phone: string;
  situation: string;
  specialist: SpecialistName;
  note: string;
}

export interface BookingContext {
  sourcePage: string;
  httpReferrer: string;
  ref: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  quizResult: string;
  submittedAt: string;
}

export function buildBookingPayload(input: BookingFormInput, context: BookingContext) {
  return {
    full_name: input.fullName.trim(),
    work_email: input.workEmail.trim(),
    _replyto: input.workEmail.trim(),
    company: input.company.trim(),
    job_title: input.jobTitle.trim(),
    phone: input.phone.trim(),
    situation: input.situation,
    preferred_specialist: input.specialist,
    note: input.note.trim(),
    consent: 'yes',
    source_page: context.sourcePage,
    http_referrer: context.httpReferrer,
    ref: context.ref,
    utm_source: context.utmSource,
    utm_medium: context.utmMedium,
    utm_campaign: context.utmCampaign,
    quiz_result: context.quizResult || 'Not provided',
    submitted_at: context.submittedAt,
    _subject: BOOKING_SUBJECT,
    _template: 'table',
    _captcha: 'false',
    _honey: '',
  };
}

export function formSubmitSucceeded(status: number, body: { success?: unknown } | null): boolean {
  if (!status || status < 200 || status >= 300) return false;
  return body?.success === true || body?.success === 'true';
}
