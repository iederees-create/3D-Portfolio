import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, ShoppingBag, Mail, Sparkles, ArrowDown, Zap, Layers, Star } from 'lucide-react';
import QuoteChat from './QuoteChat';
import MagneticButton from './components/MagneticButton';

import ThemePicker from './components/ThemePicker';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import KonamiCode from './components/KonamiCode';
interface Project {
  title: string;
  category: 'Service' | 'Beauty' | 'Education' | 'Creative';
  description: string;
  tags: string[];
  liveUrl: string;
  etsyUrl?: string;
  featured?: boolean;
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

// ─── Animated project card ───────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

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
          <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

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
    </motion.div>
  );
}

// ─── Skills ticker ───────────────────────────────────────
const skills = ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Framer Motion', 'Node.js', 'Supabase', 'Figma', 'UI/UX Design', 'SEO', 'GitHub Pages', 'Responsive Design', 'Web Performance'];

function SkillsTicker() {
  const doubled = [...skills, ...skills];
  return (
    <div className="ticker-wrap py-3 border-y border-white/5 my-16">
      <div className="ticker-track">
        {doubled.map((s, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-sm text-slate-500 whitespace-nowrap">
            <Zap size={11} className="text-primary-500" fill="currentColor" />
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Stat item ───────────────────────────────────────────
function StatItem({ value, label }: { value: string; label: string }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'backOut' }}
      className="stat-card rounded-2xl px-6 py-5 text-center"
    >
      <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
      <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">{label}</div>
    </motion.div>
  );
}

// ─── Main App ────────────────────────────────────────────
export default function App() {
  const [filter, setFilter] = useState<string>('All');

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
      title: 'Claude Code Solar Lead Generation Template',
      category: 'Service',
      description: 'A responsive solar-installer website template developed with assistance from Claude Code. It includes an interactive savings calculator, lead-capture form, project filtering, configurable business information and mobile-first design.',
      tags: ['Claude Code', 'HTML5', 'CSS3', 'JavaScript', 'GitHub Pages', 'Responsive Design'],
      liveUrl: 'https://iederees-create.github.io/ac-solar-solutions-ct/',
      // etsyUrl intentionally omitted - the "View on Etsy" button only
      // appears once a real Etsy listing URL exists for this template.
      featured: true,
    },
    {
      title: 'Pest Control Website Template',
      category: 'Service',
      description: 'A conversion-focused website template for pest-control companies, exterminators and termite specialists, featuring service presentation, quote-request flows, WhatsApp contact, mobile-first design and simple business customisation.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local SEO', 'Lead Generation', 'Pest Control'],
      liveUrl: 'https://iederees-create.github.io/westlake-pest-control-template/',
      // etsyUrl intentionally omitted - the "View on Etsy" button only
      // appears once a real, published Etsy listing URL exists for this template.
      featured: true,
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
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  // Dynamic time-based greeting
  const hour = new Date().getHours();
  let greeting = 'Welcome';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else if (hour < 22) greeting = 'Good evening';
  else greeting = 'Working late?';

  return (
    <div className="relative w-full min-h-screen bg-[#0F172A] text-slate-100 overflow-x-hidden">
      <KonamiCode />
      <TerminalEasterEgg />
      
      {/* ── Nav ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/10 bg-[#0F172A]"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 h-full">
            <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold font-mono text-sm">
              NX
            </div>
            <span className="font-bold text-sm tracking-widest uppercase">NextGenWebs</span>
          </div>
          <div className="flex items-center h-full border-l border-white/10">
            <a href="#" className="hidden md:flex items-center justify-center h-full px-5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="#work" className="hidden md:flex items-center justify-center h-full px-5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="hidden md:flex items-center justify-center h-full px-5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
              About
            </a>
            <ThemePicker />
            <a
              href="https://nextgenwebs.etsy.com"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center justify-center h-full px-6 text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-white/5 border-l border-white/10 transition-colors"
            >
              Templates
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center h-full px-8 bg-white text-black text-xs font-bold tracking-wide hover:bg-slate-200 transition-colors border-l border-white/10"
            >
              Contact
            </a>
          </div>
        </div>
      </motion.header>

      {/* ── Architectural Hero ── */}
      <section className="relative w-full pt-16 min-h-[90vh] flex flex-col border-b border-white/10">
        <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 border-x border-white/10">
          
          {/* Left Column (Main Copy) */}
          <div className="lg:col-span-7 flex flex-col justify-center p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-block border border-white/20 px-3 py-1 mb-8 text-[10px] tracking-wide text-slate-400 uppercase">
                {greeting} — Welcome
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-white">
                Premium<br />
                <span className="text-slate-500">Web Development.</span>
              </h1>
              
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mb-12">
                We build fast, high-performance websites designed to help your business grow. Custom code, clean design, and real results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton>
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm tracking-wide hover:bg-slate-200 transition-colors"
                  >
                    View Projects <ArrowDown size={16} />
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right Column (Data/Stats Grid) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="flex-1 border-b border-white/10 p-8 flex flex-col justify-center">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wide">Our Mission</div>
                  <div className="text-lg font-medium text-slate-200">Convert traffic into revenue through strategic, beautiful design.</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 mb-1 uppercase tracking-wide">Tech Stack</div>
                  <div className="text-lg font-medium text-slate-200">React / TypeScript / Tailwind</div>
                </div>
              </motion.div>
            </div>
            <div className="h-48 grid grid-cols-2">
              <div className="border-r border-white/10 p-6 flex flex-col justify-end bg-white/5">
                <div className="text-4xl font-bold text-white mb-1">{projects.length}+</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Projects Launched</div>
              </div>
              <div className="p-6 flex flex-col justify-end">
                <div className="text-4xl font-bold text-white mb-1">100%</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">Custom Built</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Skills Ticker ── */}
      <SkillsTicker />

      {/* ── Work Grid ── */}
      <section id="work" className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-slate-400 mb-4">
            <Layers size={11} />
            Portfolio — {projects.length} Projects
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Live client websites
          </h2>
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

      {/* ── Contact CTA ── */}
      <section id="contact" className="relative cta-glow py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-medium text-pink-300 mb-6">
              <Sparkles size={11} />
              Ready to grow your business online?
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium italic leading-tight mb-5">
              Let's build your{' '}
              <span className="gradient-text-warm">online presence</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Get a custom, professional website built for your business — fast, mobile-ready, and designed to convert visitors into customers.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <MagneticButton>
                <a
                  href="https://nextgenwebs.etsy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-base transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1"
                >
                  <ShoppingBag size={18} />
                  Shop Templates on Etsy
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="mailto:hello@nextgenwebs.co.za"
                  className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full liquid-glass text-slate-300 hover:text-white font-semibold text-base transition-all hover:-translate-y-1"
                >
                  <Mail size={18} />
                  Get a Custom Quote
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles size={13} className="text-primary-400" />
          <span className="font-bold text-sm text-white">NextGenWebs</span>
        </div>
        <p className="text-xs text-slate-600">© 2026 NextGenWebs · Premium Web Design · Built with React + TypeScript + Framer Motion</p>
      </footer>

      {/* ── Floating Quote Chat ── */}
      <QuoteChat />
    </div>
  );
}
