/**
 * Canonical site constants shared by SEO metadata, JSON-LD, the sitemap,
 * and the RSS feed. Keeping this in one place means the domain only has to
 * be correct once — see .github/workflows/deploy.yml for the GitHub Pages
 * project this is built for.
 */
export const SITE_ORIGIN = 'https://iederees-create.github.io';
export const SITE_BASE_PATH = '/3D-Portfolio/';
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;
export const SITE_NAME = 'NextGenWebs';
export const DEFAULT_OG_IMAGE = `${SITE_URL}projects/insightforge/cover.webp`;

/** Founder headshot used on About, Contact, blog bylines, and Person schema. */
export const PROFILE_IMAGE_PATH = 'media/iederees-francis-portrait.webp';
export const PROFILE_IMAGE_JPG_PATH = 'media/iederees-francis.jpg';
export const PROFILE_IMAGE_URL = `${SITE_URL}${PROFILE_IMAGE_PATH}`;
export const PROFILE_IMAGE_ALT = 'Iederees Francis, founder of NextGenWebs — Cape Town web developer';
export const PROFILE_NAME = 'Iederees Francis';

/** Build an absolute site URL from an app-relative path (e.g. 'blog/' or 'blog/some-slug/'). */
export function toAbsoluteUrl(path: string): string {
  const trimmed = path.replace(/^\/+/, '');
  return `${SITE_URL}${trimmed}`;
}

/** App-relative public asset URL that respects Vite BASE_URL (GitHub Pages). */
export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.replace(/^\/+/, '')}`;
}

/**
 * True when a project's `liveUrl` points at a page inside this app (a case
 * study or product page) rather than a separately deployed live site.
 * Every real live-site URL in the project data is an absolute `https://`
 * link; only in-app case-study pages use a bare `BASE_URL`-relative path.
 */
export function isInternalProjectUrl(url: string): boolean {
  return !/^https?:\/\//.test(url);
}

/** Convert a `BASE_URL`-prefixed internal URL into a router-relative path for `<Link to>`. */
export function toRouterPath(url: string): string {
  const base = import.meta.env.BASE_URL;
  return url.startsWith(base) ? `/${url.slice(base.length)}` : url;
}
