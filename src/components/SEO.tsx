import { Helmet } from 'react-helmet-async';
import { SITE_NAME, DEFAULT_OG_IMAGE, toAbsoluteUrl } from '../lib/site';

interface SEOProps {
  title: string;
  description: string;
  /** App-relative path, e.g. '' for home, 'blog/', or 'blog/some-slug/'. */
  path: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  children?: React.ReactNode;
}

/**
 * Per-route document title and meta-tag management. Verified by mounting a
 * route and reading `document.title` / `document.querySelector('meta...')`
 * after navigation — react-helmet-async updates the real DOM `<head>`, not
 * just component state, so it works for a client-rendered SPA route change.
 */
export default function SEO({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  noIndex = false,
  children,
}: SEOProps) {
  const url = toAbsoluteUrl(path);
  const fullTitle = path === '' ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={ogImage} />
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@nextgenwebdevs" />

      {children}
    </Helmet>
  );
}
