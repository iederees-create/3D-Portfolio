/**
 * Technology groups shown on the Home and Credentials pages.
 * Source: the tools and skills already listed on the Credentials page plus the
 * libraries this portfolio itself is built with (see package.json). No proficiency
 * scores are shown, because none can be verified.
 */
export interface TechGroup {
  id: string;
  label: string;
  blurb: string;
  items: string[];
}

export const techGroups: TechGroup[] = [
  {
    id: 'frontend',
    label: 'Front-end',
    blurb: 'Fast, responsive interfaces that work on any phone.',
    items: ['HTML & CSS', 'JavaScript (ES6+)', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Three.js / React Three Fiber'],
  },
  {
    id: 'backend',
    label: 'Back-end & data',
    blurb: 'Simple back-ends, forms and data tooling when a project needs them.',
    items: ['Node.js & Express', 'Supabase & SQL', 'EmailJS', 'Python (data)', 'Power BI'],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    blurb: 'Version control and hosting that keep projects easy to hand over.',
    items: ['Git & GitHub', 'GitHub Pages', 'Vercel'],
  },
  {
    id: 'design',
    label: 'Design & growth',
    blurb: 'Layout, search visibility and measurement.',
    items: ['UI/UX design', 'Figma', 'Canva', 'SEO & web performance', 'Google Analytics'],
  },
  {
    id: 'ai',
    label: 'AI & workflow',
    blurb: 'AI-assisted build and automation workflows.',
    items: ['Claude / Gemini', 'Notion'],
  },
];
