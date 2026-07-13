import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { Globe, ShoppingBag, Sparkles, Layers, Star, Images } from 'lucide-react';
import { ProjectMedia } from '../components/ProjectMedia';
import { ProjectShowcase } from '../components/ProjectShowcase';

interface Project {
  title: string;
  category: 'Service' | 'Beauty' | 'Education' | 'Creative';
  description: string;
  tags: string[];
  liveUrl: string;
  etsyUrl?: string;
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
}

const catClass: Record<string, string> = {
  Service: 'cat-service',
  Beauty: 'cat-beauty',
  Education: 'cat-education',
  Creative: 'cat-creative',
};

const catEmoji: Record<string, string> = {
  Service: '🔧',
  Beauty: '💅',
  Education: '📚',
  Creative: '🎨',
};

// ─── Animated project card ───────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const hasShowcase = Boolean(project.galleryImages && project.galleryImages.length > 0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  }

  function handleMouseLeave() {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        ref={cardRef}
        className={`glass-card rounded-2xl flex flex-col justify-between ${catClass[project.category]}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transition: 'transform 0.18s ease, box-shadow 0.3s ease' }}
      >
        <ProjectMedia
          title={project.title}
          coverImage={project.coverImage}
          previewVideoMp4={project.previewVideoMp4}
          previewVideoWebm={project.previewVideoWebm}
          videoPoster={project.videoPoster}
          mediaAlt={project.mediaAlt}
        />

        {/* Accent top line */}
        <div className="card-accent-line rounded-t-2xl" />

        <div className="p-6 flex flex-col flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="cat-icon-bg p-2 rounded-xl text-base">{catEmoji[project.category]}</span>
              {project.featured && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Star size={9} fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <span className={`cat-badge text-[11px] font-semibold px-2.5 py-1 rounded-full`}>
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{project.title}</h3>
          {project.toolBadge && (
            <span className="inline-flex items-center gap-1 self-start text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 mb-3 w-fit">
              <Sparkles size={9} /> {project.toolBadge}
            </span>
          )}
          <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

          {hasShowcase && (
            <button
              type="button"
              onClick={() => setShowcaseOpen(true)}
              className="mb-5 inline-flex items-center gap-2 self-start text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors"
            >
              <Images size={14} /> View full gallery &amp; preview video
            </button>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500 border border-white/5">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className={`grid ${project.etsyUrl ? 'grid-cols-2' : 'grid-cols-1'} gap-2 pt-4 border-t border-white/5`}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all group/btn"
              title="Live Site"
            >
              <Globe size={15} className="text-slate-400 group-hover/btn:text-white transition-colors" />
              <span className="text-[10px] text-slate-500 group-hover/btn:text-slate-300 transition-colors">Live Site</span>
            </a>
            {project.etsyUrl && (
              <a
                href={project.etsyUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 transition-all group/btn border border-orange-500/10"
                title="Buy on Etsy"
              >
                <ShoppingBag size={15} className="text-orange-400 group-hover/btn:text-orange-300 transition-colors" />
                <span className="text-[10px] text-orange-500/70 group-hover/btn:text-orange-300 transition-colors">Buy Template</span>
              </a>
            )}
          </div>
        </div>
      </div>
      {hasShowcase && (
        <ProjectShowcase
          isOpen={showcaseOpen}
          onClose={() => setShowcaseOpen(false)}
          title={project.title}
          description={project.description}
          galleryImages={project.galleryImages ?? []}
          mediaAlts={project.galleryImageAlts ?? []}
          previewVideoMp4={project.previewVideoMp4}
          previewVideoWebm={project.previewVideoWebm}
          videoPoster={project.videoPoster}
          features={project.features}
          toolHighlight={project.toolHighlight}
          liveUrl={project.liveUrl}
          etsyUrl={project.etsyUrl}
        />
      )}
    </motion.div>
  );
}

// ─── Projects data ────────────────────────────────────────────────────────────
const projects: Project[] = [
  {
    title: 'RAVERSUS Clinical Portal',
    category: 'Service',
    description: 'Advanced interactive digital clinic and product reservation platform engineered for high-end bioelectric healing technology.',
    tags: ['E-Commerce', 'Custom Animations', 'API Integration'],
    liveUrl: 'https://iederees-create.github.io/raversus-v3/',
    featured: true,
  },
  {
    title: 'Tiling Contractor Website Template',
    category: 'Service',
    description: 'A premium lead-generation website template for tiling contractors and flooring specialists, featuring an interactive Tile Project Planner, quantity estimator, structured quote summaries, WhatsApp handoff, responsive design and simple business customisation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Lead Generation', 'Tile Calculator'],
    liveUrl: 'https://iederees-create.github.io/tableview-tiling-ct-ct/',
    featured: true,
    toolBadge: 'Interactive Tile Project Planner',
    toolHighlight: 'The Tile Project Planner is an original 8-step calculator: visitors enter their room measurements and tile size, choose a layout, and get an instant area/tile/box/cost estimate with indicative material guidance — then send a structured quote request via WhatsApp or email.',
    coverImage: `${import.meta.env.BASE_URL}projects/tableview-tiling/cover.webp`,
    previewVideoMp4: `${import.meta.env.BASE_URL}projects/tableview-tiling/preview.mp4`,
    previewVideoWebm: `${import.meta.env.BASE_URL}projects/tableview-tiling/preview.webm`,
    videoPoster: `${import.meta.env.BASE_URL}projects/tableview-tiling/video-poster.webp`,
    mediaAlt: 'Tiling contractor website template with an interactive Tile Project Planner',
    galleryImages: [
      `${import.meta.env.BASE_URL}projects/tableview-tiling/01-cover.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/02-desktop.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/03-mobile.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/04-planner.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/05-results.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/06-quote-whatsapp.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/07-services-gallery.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/08-site-config.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/09-themes.webp`,
      `${import.meta.env.BASE_URL}projects/tableview-tiling/10-included-files.webp`,
    ],
    galleryImageAlts: [
      'Tiling contractor website template cover image showing the interactive tile calculator, responsive design, and digital download',
      'Desktop homepage view of the tiling contractor website template with hero, services grid, and premium architectural design',
      'Mobile homepage and open hamburger navigation menu on the tiling contractor website template',
      'Tile Project Planner interactive tool showing the project-type selection step of the 8-step wizard',
      'Tile Project Planner results step showing measured area, wastage, tile count, box count, and material cost',
      'Tile Project Planner structured quote summary with copy, print, download, and WhatsApp send options',
      'Tiling services grid and project gallery of layout patterns including herringbone and chevron',
      'site-config.js configuration file used to rebrand the tiling website template without editing HTML',
      'Three colour theme presets: Limestone Studio, Charcoal Brass, and Coastal Clay',
      'List of included files, buyer guide, and support documentation in the tiling website template package',
    ],
    features: [
      '8-step Tile Project Planner: type, measurements, tile size, layout, conditions, wastage, estimate, send',
      'Unit conversion (m/cm/ft/in) and single/multiple/wall/floor-plus-wall measurement modes',
      'Instant tile, box, and material-cost estimate — always rounded up, never fractional',
      'Indicative adhesive/grout/levelling/waterproofing guidance, clearly labelled as non-binding',
      'Structured quote summary: copy, print, download, WhatsApp, or email handoff',
      'Three switchable colour themes: Limestone Studio, Charcoal Brass, Coastal Clay',
      'Accessible: keyboard navigation, screen reader support, visible focus states',
      'Zero external dependencies — no CDN fonts, scripts, or tracking',
    ],
  },
  {
    title: 'Claude Code Solar Lead Generation Template',
    category: 'Service',
    description: 'A responsive solar-installer website template developed with assistance from Claude Code. It includes an interactive savings calculator, lead-capture form, project filtering, configurable business information and mobile-first design.',
    tags: ['Claude Code', 'HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'Responsive Design'],
    liveUrl: 'https://iederees-create.github.io/ac-solar-solutions-ct/',
    featured: true,
  },
  {
    title: 'Pest Control Website Template',
    category: 'Service',
    description: 'A conversion-focused website template for pest-control companies, exterminators and termite specialists, featuring service presentation, quote-request flows, WhatsApp contact, mobile-first design and simple business customisation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Lead Generation', 'Pest Control'],
    liveUrl: 'https://iederees-create.github.io/westlake-pest-control-template/',
    featured: true,
  },
  {
    title: 'Vitality Wellness Website Template',
    category: 'Beauty',
    description: 'A premium React website template for wellness studios, skincare businesses and beauty practitioners, featuring an interactive consultation finder, treatment presentation, booking flows, responsive design and central business customisation.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Responsive Design', 'Local SEO', 'Lead Generation'],
    liveUrl: 'https://iederees-create.github.io/vitality-wellness-claremont-ct/',
    featured: true,
    coverImage: `${import.meta.env.BASE_URL}projects/vitality-wellness/cover.webp`,
    previewVideoMp4: `${import.meta.env.BASE_URL}projects/vitality-wellness/preview.mp4`,
    previewVideoWebm: `${import.meta.env.BASE_URL}projects/vitality-wellness/preview.webm`,
    videoPoster: `${import.meta.env.BASE_URL}projects/vitality-wellness/video-poster.webp`,
    mediaAlt: 'Vitality Wellness website template: sage-and-gold wellness studio homepage with a hero section, consultation finder and treatment pricing cards.',
  },
  {
    title: 'Summit Painting CT',
    category: 'Service',
    description: 'Premium service business landing page engineered for local visibility, featuring optimized client onboarding paths.',
    tags: ['React', 'Tailwind', 'Vite'],
    liveUrl: 'https://iederees-create.github.io/summit-painting-ct-ct/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
    featured: true,
  },
  {
    title: 'Amore Nails CT',
    category: 'Beauty',
    description: 'Elegant boutique beauty salon application showcasing creative portfolios, service menus, and modern interactive touchpoints.',
    tags: ['TypeScript', 'Tailwind CSS', 'UI/UX'],
    liveUrl: 'https://iederees-create.github.io/amore-nails-ct/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
    featured: true,
  },
  {
    title: 'Pixel Perfect Hair',
    category: 'Beauty',
    description: 'Highly visual digital showroom tailored for modern salon styling branding and clean presentation workflows.',
    tags: ['React', 'Vite', 'Responsive Layout'],
    liveUrl: 'https://iederees-create.github.io/pixel-perfect-hair/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
  },
  {
    title: 'Zen Skin Studio Website Template',
    category: 'Beauty',
    description: 'A premium conversion-focused website template for aesthetic clinics, skincare studios and beauty practitioners, featuring treatment presentation, online enquiry flows, WhatsApp booking, mobile-first design and simple business customisation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Beauty Business'],
    liveUrl: 'https://iederees-create.github.io/zen-skin-studio-template/',
    featured: true,
  },
  {
    title: 'Acme Plumbing Claremont',
    category: 'Service',
    description: 'Conversion-driven emergency dispatch and routing hub optimized for high performance and clean visual hierarchy.',
    tags: ['React', 'SEO Framework', 'Tailwind'],
    liveUrl: 'https://iederees-create.github.io/acme-plumbing-claremont-ct/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
  },
  {
    title: 'Window Wizards CT',
    category: 'Service',
    description: 'Polished commercial service application focusing on interactive quotes and premium glass components.',
    tags: ['TypeScript', 'Vite', 'Components'],
    liveUrl: 'https://iederees-create.github.io/window-wizards-ct-ct/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
  },
  {
    title: 'First Choice Construction',
    category: 'Service',
    description: 'Heavyweight construction enterprise portal designed to showcase multi-stage real estate developments and scale.',
    tags: ['React', 'Production Build', 'Tailwind'],
    liveUrl: 'https://iederees-create.github.io/first-choice-construction-ct/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
    featured: true,
  },
  {
    title: 'Creator Hub Pro Template',
    category: 'Creative',
    description: 'A modular, backend-ready portfolio ecosystem designed for high-tier digital creators to manage brand partnerships and media grids.',
    tags: ['Component Driven', 'Supabase Ready', 'Responsive UI'],
    liveUrl: 'https://iederees-create.github.io/creator-hub-template/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
    featured: true,
  },
  {
    title: 'Aura Signs',
    category: 'Creative',
    description: 'Stunning artistic branding workspace focused on visual design aesthetics, layout assets, and sign production.',
    tags: ['UI/UX Design', 'Vite', 'Tailwind'],
    liveUrl: 'https://iederees-create.github.io/aura-signs/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
  },
  {
    title: 'Fluent Path Tutoring',
    category: 'Education',
    description: 'Clean learning management index and appointment hub designed for modern educational structures and smooth navigation.',
    tags: ['TypeScript', 'React', 'Data Visuals'],
    liveUrl: 'https://iederees-create.github.io/fluent-path-tutoring/',
    etsyUrl: 'https://nextgenwebs.etsy.com',
  },
];

const categories = ['All', 'Service', 'Beauty', 'Education', 'Creative'];

export default function WorkPage() {
  const [filter, setFilter] = useState<string>('All');
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-slate-400 mb-4">
          <Layers size={11} />
          Portfolio — {projects.length} Projects
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Live client websites
        </h1>
        <p className="text-slate-400">Click any card to visit the live site, buy the template, or view the source code.</p>
      </motion.div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              filter === cat
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'liquid-glass text-slate-400 hover:text-white'
            }`}
          >
            {cat !== 'All' && catEmoji[cat] + ' '}{cat}
          </button>
        ))}
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
