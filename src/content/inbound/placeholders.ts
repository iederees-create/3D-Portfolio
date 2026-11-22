/** Campaign tokens that must stay literal until Iederees replaces them. */
export const BOOKING_LINK = '{{BOOKING_LINK}}';
export const PRIVACY_LINK = '{{PRIVACY_LINK}}';

export const SAP_ARCHIVE_PATH = '/sap-archive/';
export const SAP_QUIZ_PATH = '/sap-archive/check/';
export const SAP_GUIDE_PATH = '/sap-archive/guide/';

/** Same profile already linked in the site footer. */
export const LINKEDIN_URL = 'https://www.linkedin.com/in/iederees-francis-936717392/';

const CAMPAIGN_PATHS: Record<string, string> = {
  '{{QUIZ_LINK}}': SAP_QUIZ_PATH,
  '{{GUIDE_LINK}}': SAP_GUIDE_PATH,
  '{{LANDING_LINK}}': SAP_ARCHIVE_PATH,
};

export function applyCampaignTokens(source: string): string {
  return Object.entries(CAMPAIGN_PATHS).reduce(
    (text, [token, path]) => text.split(token).join(path),
    source,
  );
}

export function resolveCampaignHref(href: string): string {
  return CAMPAIGN_PATHS[href] ?? href;
}

export function isPlaceholderHref(href: string): boolean {
  return href.includes('{{') && href.includes('}}');
}
