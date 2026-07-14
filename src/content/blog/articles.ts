import type { ArticleContentComponent, ArticleMeta } from './types';
import WhyEducationalBusinessesNeedCustomLearningHubsContent from './why-educational-businesses-need-custom-learning-hubs';
import BankDesertAnalysisContent from './bank-desert-analysis-python-census-google-places';
import ConstructionWebsiteQuotePlannerContent from './construction-website-quote-planner';
import LaserCuttingWebsiteQuotePlannerContent from './laser-cutting-website-quote-planner';

/**
 * Article metadata, newest first. To add article #4: write its content
 * component in this directory, add one entry here, and register the
 * component below in `articleContentMap` — nothing else needs to change.
 */
export const articles: ArticleMeta[] = [
  {
    slug: 'laser-cutting-website-quote-planner',
    title: 'How to Build a Laser Cutting Website That Gets Better Quote Requests',
    excerpt: 'Why "how much to laser this?" enquiries waste time on both sides, and how an interactive Laser Cut & Engraving Quote Planner turns them into structured, production-ready quote briefs.',
    datePublished: '2026-07-14',
    dateModified: '2026-07-14',
    author: 'Iedrees Francis',
    category: 'Case Study / Fabrication',
    tags: ['Case Study', 'Laser Cutting', 'Fabrication', 'HTML5', 'JavaScript'],
    readingTimeMinutes: 6,
    coverImage: `${import.meta.env.BASE_URL}projects/precision-laser/cover.webp`,
    coverImageAlt: 'Precision Laser Website Template homepage with the Laser Cut & Engraving Quote Planner',
    relatedSlugs: ['construction-website-quote-planner'],
  },
  {
    slug: 'construction-website-quote-planner',
    title: 'How to Build a Construction Website That Generates Better Quote Requests',
    excerpt: 'Why a brochure-style contractor website loses good leads to vague enquiries, and how an interactive Renovation Scope & Budget Planner turns "how much to renovate?" into a structured, site-inspection-ready brief.',
    datePublished: '2026-07-13',
    dateModified: '2026-07-13',
    author: 'Iedrees Francis',
    category: 'Case Study / Construction',
    tags: ['Case Study', 'Construction', 'Lead Generation', 'HTML5', 'JavaScript'],
    readingTimeMinutes: 6,
    coverImage: `${import.meta.env.BASE_URL}projects/southern-suburbs-builders/cover.webp`,
    coverImageAlt: 'Southern Suburbs Builders website template homepage with the Renovation Scope & Budget Planner',
    relatedSlugs: ['bank-desert-analysis-python-census-google-places'],
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
    relatedSlugs: ['why-educational-businesses-need-custom-learning-hubs'],
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
    relatedSlugs: ['bank-desert-analysis-python-census-google-places'],
  },
];

export const articleContentMap: Record<string, ArticleContentComponent> = {
  'laser-cutting-website-quote-planner': LaserCuttingWebsiteQuotePlannerContent,
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
