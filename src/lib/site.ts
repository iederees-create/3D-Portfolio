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

/** Build an absolute site URL from an app-relative path (e.g. 'blog/' or 'blog/some-slug/'). */
export function toAbsoluteUrl(path: string): string {
  const trimmed = path.replace(/^\/+/, '');
  return `${SITE_URL}${trimmed}`;
}
