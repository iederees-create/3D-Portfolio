import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, ShoppingBag, Sparkles, Layers, Star, Images, FileText } from 'lucide-react';
import { ProjectMedia } from '../components/ProjectMedia';
import { ProjectShowcase } from '../components/ProjectShowcase';
import SEO from '../components/SEO';
import { projects, projectCategories, type Project } from '../content/projects';

const catClass: Record<string, string> = {
  Service: 'cat-service',
  Beauty: 'cat-beauty',
  Education: 'cat-education',
  Creative: 'cat-creative',
  Data: 'cat-data',
};

const catEmoji: Record<string, string> = {
  Service: '🔧',
  Beauty: '💅',
  Education: '📚',
  Creative: '🎨',
  Data: '📊',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const hasShowcase = Boolean(project.galleryImages && project.galleryImages.length > 0);
  const publicEtsy = Boolean(project.etsyUrl && project.etsyStatus === 'public');

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

        <div className="card-accent-line rounded-t-2xl" />

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="cat-icon-bg p-2 rounded-xl text-base">{catEmoji[project.category]}</span>
              {project.featured && (
                <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  <Star size={9} fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <span className="cat-badge text-[11px] font-semibold px-2.5 py-1 rounded-full">
              {project.category}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2 leading-snug">
            <Link to={`/work/${project.slug}/`} className="hover:text-amber-200 transition-colors">
              {project.title}
            </Link>
          </h3>
          {project.toolBadge && (
            <span className="inline-flex items-center gap-1 self-start text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 mb-3 w-fit">
              <Sparkles size={9} /> {project.toolBadge}
            </span>
          )}
          <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-5">
            <Link
              to={`/work/${project.slug}/`}
              className="inline-flex items-center gap-2 text-xs font-medium text-sky-300 hover:text-sky-200 transition-colors"
            >
              <FileText size={14} /> Case study page
            </Link>
            {hasShowcase && (
              <button
                type="button"
                onClick={() => setShowcaseOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-medium text-amber-300 hover:text-amber-200 transition-colors"
              >
                <Images size={14} /> Gallery &amp; video
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag-mono text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-500 border border-white/5">
                {tag}
              </span>
            ))}
          </div>

          <div className={`grid ${publicEtsy ? 'grid-cols-2' : 'grid-cols-1'} gap-2 pt-4 border-t border-white/5`}>
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
            {publicEtsy && project.etsyUrl && (
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
          etsyUrl={publicEtsy ? project.etsyUrl : undefined}
          caseStudy={project.caseStudy}
        />
      )}
    </motion.div>
  );
}

export default function WorkPage() {
  const [filter, setFilter] = useState<string>('All');
  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 sm:pb-24">
      <SEO
        title="Work — Live Websites & Templates"
        description="Portfolio of live client websites, data products and digital templates by NextGenWebs — including interactive planners, analytics tools and local-service lead-generation sites."
        path="work/"
      />
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
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Live websites &amp; templates</h1>
        <p className="text-slate-400">
          Open a case-study page for technical detail, visit the live demo, or browse galleries when available.
          Etsy purchase links appear only for verified public product listings.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-10">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              filter === cat
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'liquid-glass text-slate-400 hover:text-white'
            }`}
          >
            {cat !== 'All' && catEmoji[cat] + ' '}
            {cat}
          </button>
        ))}
      </div>

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
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
