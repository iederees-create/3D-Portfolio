import type { ProjectCaseStudy } from '../../components/ProjectShowcase';

export type ProjectCategory = 'Service' | 'Beauty' | 'Education' | 'Creative' | 'Data';
export type EtsyStatus = 'none' | 'draft' | 'public';

export interface Project {
  title: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  liveUrl: string;
  /** Exact public Etsy product URL only. Omit when draft/none. */
  etsyUrl?: string;
  etsyStatus?: EtsyStatus;
  featured?: boolean;
  coverImage?: string;
  previewVideoMp4?: string;
  previewVideoWebm?: string;
  videoPoster?: string;
  galleryImages?: string[];
  galleryImageAlts?: string[];
  mediaAlt?: string;
  features?: string[];
  toolHighlight?: string;
  toolBadge?: string;
  caseStudy?: ProjectCaseStudy;
  seoTitle?: string;
  seoDescription?: string;
  articleSlug?: string;
  datePublished?: string;
  dateModified?: string;
  repositoryUrl?: string;
  projectStatus?: string;
  buyerAudience?: string;
  relatedProjectSlugs?: string[];
}
