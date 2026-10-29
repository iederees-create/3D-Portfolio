import type { Project } from '../../pages/WorkPage';

/**
 * Canonical technology filters. Project tags are free text ("HTML5", "CSS3", "Tailwind CSS"…),
 * so aliases are folded into one filter each. Only tags/tools that already exist on a project count.
 */
const TECH_ALIASES: Record<string, string[]> = {
  Angular: ['angular', 'angular 22'],
  RxJS: ['rxjs'],
  React: ['react', 'components', 'component driven'],
  TypeScript: ['typescript'],
  JavaScript: ['javascript', 'html/css/js'],
  'HTML & CSS': ['html', 'css', 'html5', 'css3', 'html/css/js'],
  'Tailwind CSS': ['tailwind', 'tailwind css'],
  Vite: ['vite'],
  'Node.js': ['node.js', 'express'],
  Python: ['python', 'pandas', 'jupyter'],
  'Data viz': ['data visualisation', 'data visuals', 'd3', 'leaflet'],
  'Spreadsheets': ['excel', 'google sheets', 'formulas'],
  'AI / LLM': ['ai assistant', 'openai', 'claude code', 'machine learning'],
  'Local SEO': ['local seo', 'seo framework', 'etsy seo'],
  Accessibility: ['accessibility'],
  'Quote / booking tools': ['quote planner', 'tile calculator', 'booking'],
  'Lead generation': ['lead generation', 'lead research', 'lead routing', 'lead scoring', 'prospecting'],
};

export function techOf(project: Project): string[] {
  const haystack = new Set<string>();
  project.tags.forEach((t) => haystack.add(t.toLowerCase()));
  project.caseStudy?.toolsUsed.forEach((t) => haystack.add(t.toLowerCase()));
  return Object.entries(TECH_ALIASES)
    .filter(([, aliases]) => aliases.some((a) => haystack.has(a)))
    .map(([name]) => name);
}

/** Raw display stack: tags plus case-study tools, de-duplicated case-insensitively. */
export function stackOf(project: Project): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  [...project.tags, ...(project.caseStudy?.toolsUsed ?? [])].forEach((t) => {
    const key = t.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(t);
    }
  });
  return out;
}

export function hasGallery(project: Project) {
  return Boolean(project.galleryImages && project.galleryImages.length > 0);
}

export function searchText(project: Project): string {
  return [
    project.title,
    project.category,
    project.description,
    project.toolBadge ?? '',
    ...project.tags,
    ...(project.features ?? []),
  ]
    .join(' ')
    .toLowerCase();
}

export const categoryShort: Record<string, string> = {
  Service: 'Service business',
  Beauty: 'Beauty & wellness',
  Education: 'Education',
  Creative: 'Creative',
  Data: 'Data & tools',
  'Marketing / Finance / Affiliate Funnel': 'Marketing & finance',
  'AI / Web App / Support Automation': 'AI & web apps',
};
