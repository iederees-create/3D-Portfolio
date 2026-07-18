import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Linkedin, Twitter } from 'lucide-react';
import SEO from '../SEO';
import type { ArticleMeta } from '../../content/blog/types';
import { articles, getRelatedArticles } from '../../content/blog/articles';
import {
  PROFILE_IMAGE_ALT,
  PROFILE_IMAGE_PATH,
  PROFILE_IMAGE_URL,
  SITE_NAME,
  publicAsset,
  toAbsoluteUrl,
} from '../../lib/site';

const BASE = import.meta.env.BASE_URL;
const authorPortrait = publicAsset(PROFILE_IMAGE_PATH);

interface TocEntry {
  id: string;
  text: string;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

interface ArticleLayoutProps {
  meta: ArticleMeta;
  children: ReactNode;
}

/**
 * Reusable article page shell: SEO/JSON-LD, breadcrumb, meta row, an
 * auto-generated table of contents (built from the `<h2>` elements actually
 * rendered in `children`, so it never drifts from the real content), the
 * article body, related posts, and prev/next navigation. Adding article #3
 * only requires a content component and one `articles.ts` entry — this
 * layout is what makes that possible without duplicating page structure.
 */
export default function ArticleLayout({ meta, children }: ArticleLayoutProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocEntry[]>([]);
  const relatedArticles = getRelatedArticles(meta);

  const sorted = [...articles].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
  const currentIndex = sorted.findIndex((article) => article.slug === meta.slug);
  const prevArticle = currentIndex >= 0 ? sorted[currentIndex + 1] : undefined;
  const nextArticle = currentIndex > 0 ? sorted[currentIndex - 1] : undefined;

  useEffect(() => {
    const container = bodyRef.current;
    if (!container) return;
    const headings = Array.from(container.querySelectorAll('h2'));
    const entries: TocEntry[] = headings.map((heading, i) => {
      if (!heading.id) {
        heading.id = slugifyHeading(heading.textContent || `section-${i}`);
      }
      return { id: heading.id, text: heading.textContent || '' };
    });
    setToc(entries);
  }, [meta.slug]);

  const articleUrl = toAbsoluteUrl(`blog/${meta.slug}/`);
  const absoluteImage = meta.coverImage ? toAbsoluteUrl(meta.coverImage.replace(BASE, '')) : undefined;

  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.excerpt,
    author: {
      '@type': 'Person',
      name: meta.author,
      url: toAbsoluteUrl('about/'),
      image: PROFILE_IMAGE_URL,
    },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    datePublished: meta.datePublished,
    dateModified: meta.dateModified,
    ...(absoluteImage ? { image: absoluteImage } : {}),
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    keywords: meta.tags.join(', '),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: toAbsoluteUrl('') },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: toAbsoluteUrl('blog/') },
      { '@type': 'ListItem', position: 3, name: meta.title, item: articleUrl },
    ],
  };

  return (
    <>
      <SEO
        title={meta.title}
        description={meta.excerpt}
        path={`blog/${meta.slug}/`}
        ogType="article"
        ogImage={absoluteImage}
        ogImageAlt={meta.coverImageAlt}
      >
        <meta name="author" content={meta.author} />
        <meta property="article:published_time" content={meta.datePublished} />
        <meta property="article:modified_time" content={meta.dateModified} />
        <meta property="article:author" content={meta.author} />
        <meta property="article:section" content={meta.category} />
        {meta.tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}
      </SEO>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(blogPostingJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <article className="pt-32 pb-20 px-6 max-w-4xl mx-auto scroll-mt-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
          <Link to="/" className="hover:text-slate-300 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/blog/" className="hover:text-slate-300 transition-colors">Blog</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300 truncate max-w-[200px] sm:max-w-none">{meta.title}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-[80px] pointer-events-none" />

            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 mb-4 uppercase tracking-wide">
                <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full text-slate-300">
                  <Calendar size={14} /> {formatDate(meta.datePublished)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {meta.readingTimeMinutes} Min Read
                </span>
                <span className="text-primary-400 font-semibold bg-primary-500/10 px-3 py-1 rounded-full">
                  {meta.category}
                </span>
                <span className="inline-flex items-center gap-2 text-slate-400 normal-case tracking-normal">
                  <img
                    src={authorPortrait}
                    alt={PROFILE_IMAGE_ALT}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover border border-white/15"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="text-slate-300">By {meta.author}</span>
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                {meta.title}
              </h1>

              {meta.coverImage && (
                <img
                  src={meta.coverImage}
                  alt={meta.coverImageAlt || meta.title}
                  loading="lazy"
                  className="w-full rounded-2xl border border-white/10 mb-8"
                />
              )}
            </header>

            {toc.length > 1 && (
              <nav aria-label="Table of contents" className="mb-10 rounded-2xl bg-white/[0.03] border border-white/5 p-5">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">On this page</h2>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                  {toc.map((entry) => (
                    <li key={entry.id}>
                      <a href={`#${entry.id}`} className="text-slate-400 hover:text-primary-300 transition-colors">
                        {entry.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            <div ref={bodyRef}>{children}</div>

            {/* Social share */}
            <div className="flex items-center gap-3 pt-8 mt-10 border-t border-white/10">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Share</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(meta.title)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X (Twitter)"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              >
                <Twitter size={14} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Related articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  to={`/blog/${related.slug}/`}
                  className="block p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-primary-400 mb-2 block">{related.category}</span>
                  <h3 className="text-sm font-semibold text-white leading-snug">{related.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Prev / next */}
        {(prevArticle || nextArticle) && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevArticle ? (
              <Link
                to={`/blog/${prevArticle.slug}/`}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 block mb-1">← Older</span>
                <span className="text-sm text-slate-200">{prevArticle.title}</span>
              </Link>
            ) : <div />}
            {nextArticle && (
              <Link
                to={`/blog/${nextArticle.slug}/`}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors text-right"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 block mb-1">Newer →</span>
                <span className="text-sm text-slate-200">{nextArticle.title}</span>
              </Link>
            )}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/blog/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            ← Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
