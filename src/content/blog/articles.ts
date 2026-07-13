import type { ArticleContentComponent, ArticleMeta } from './types';
import WhyEducationalBusinessesNeedCustomLearningHubsContent from './why-educational-businesses-need-custom-learning-hubs';
import BankDesertAnalysisContent from './bank-desert-analysis-python-census-google-places';
import ConstructionWebsiteQuotePlannerContent from './construction-website-quote-planner';

/**
 * Article metadata, newest first. To add a new article: write its content
 * component in this directory, add one entry here, and register the
 * component below in `articleContentMap` — nothing else needs to change.
 */
export const articles: ArticleMeta[] = [
  {
    slug: 'construction-website-quote-planner',
    title: 'How to Build a Construction Website That Generates Better Quote Requests',
    excerpt:
      'Design a builder website that turns vague renovation enquiries into structured quote briefs — with a Renovation Scope & Budget Planner, honest preliminary ranges, and WhatsApp handoff. Worked example: Southern Suburbs Builders template.',
    datePublished: '2026-07-13',
    dateModified: '2026-07-13',
    author: 'Iedrees Francis',
    category: 'Case Study / Construction Web',
    tags: ['Construction', 'Lead Generation', 'Website Template', 'JavaScript', 'Local SEO', 'Quote Form'],
    readingTimeMinutes: 14,
    coverImage: `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/01-cover.webp`,
    coverImageAlt:
      'Southern Suburbs Builders construction website template cover showing the Renovation Scope and Budget Planner concept',
    relatedSlugs: [
      'bank-desert-analysis-python-census-google-places',
      'why-educational-businesses-need-custom-learning-hubs',
    ],
  },
  {
    slug: 'bank-desert-analysis-python-census-google-places',
    title: 'How to Build a Bank Desert Analysis Project with Python, Pandas, Census Data and Google Places',
    excerpt: 'A practical guide to planning, sourcing data for, and analysing a bank desert / financial-access project in Python — Census ACS, Google Places, Pandas cleaning, mapping, and statistics, without a fabricated conclusion.',
    datePublished: '2026-07-13',
    dateModified: '2026-07-13',
    author: 'Iedrees Francis',
    category: 'Data',
    tags: ['Python', 'Pandas', 'Census API', 'Geospatial', 'Statistics', 'Financial Inclusion'],
    readingTimeMinutes: 12,
    coverImage: `${import.meta.env.BASE_URL}projects/bank-desert-analysis/01-cover.png`,
    coverImageAlt: 'Bank Desert Analysis Student Lab dashboard showing the Financial Access Score, interactive map, and statistics lab used to teach bank desert research',
    relatedSlugs: [
      'construction-website-quote-planner',
      'why-educational-businesses-need-custom-learning-hubs',
    ],
  },
  {
    slug: 'why-educational-businesses-need-custom-learning-hubs',
    title: 'Why Educational Businesses Need Custom Learning Hubs: The Fluent Path Story',
    excerpt: 'The modern tutoring business has outgrown generic drag-and-drop website builders. Here is how I built the Fluent Path Tutoring template to solve this exact problem.',
    datePublished: '2026-07-12',
    dateModified: '2026-07-12',
    author: 'Iedrees Francis',
    category: 'Case Study / EdTech',
    tags: ['Case Study', 'EdTech', 'React', 'TypeScript'],
    readingTimeMinutes: 4,
    // No dedicated Fluent Path screenshot exists in this repo yet — omitted
    // rather than borrowing an unrelated project's image.
    relatedSlugs: [
      'bank-desert-analysis-python-census-google-places',
      'construction-website-quote-planner',
    ],
  },
];

export const articleContentMap: Record<string, ArticleContentComponent> = {
  'construction-website-quote-planner': ConstructionWebsiteQuotePlannerContent,
  'bank-desert-analysis-python-census-google-places': BankDesertAnalysisContent,
  'why-educational-businesses-need-custom-learning-hubs': WhyEducationalBusinessesNeedCustomLearningHubsContent,
};

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(article: ArticleMeta): ArticleMeta[] {
  return article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((found): found is ArticleMeta => Boolean(found));
}
