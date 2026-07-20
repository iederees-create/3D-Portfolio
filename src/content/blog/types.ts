import type { ComponentType } from 'react';

/**
 * Metadata for a single blog article. Adding a new article to the site is
 * just: (1) add one entry here, (2) add one content component and register
 * it in `articleContentMap` in `articles.ts`. ArticleLayout, the blog
 * index, prev/next nav, and related-posts all derive from this shape.
 */
export interface ArticleMeta {
  slug: string;
  title: string;
  /** Short summary used on the blog index, teaser cards, and as the meta description fallback. */
  excerpt: string;
  /** ISO date string, e.g. '2026-07-13'. */
  datePublished: string;
  /** ISO date string. Defaults to datePublished when the article has never been updated. */
  dateModified: string;
  author: string;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  /** Omit when no real screenshot exists for the article yet — never substitute an unrelated image. */
  coverImage?: string;
  coverImageAlt?: string;
  /** Slugs of other articles to surface in the "Related articles" section. */
  relatedSlugs: string[];
  audioSrc?: string;
  audioTranscript?: string;
  listenEnabled?: boolean;
}

export type ArticleContentComponent = ComponentType;
