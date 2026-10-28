import { forwardRef, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, BookOpenCheck, Check, ExternalLink, ShoppingBag, Star } from 'lucide-react';
import type { Project } from '../../pages/WorkPage';
import { ProjectMedia } from '../ProjectMedia';
import { isInternalProjectUrl, toRouterPath } from '../../lib/site';
import { categoryShort, stackOf } from './workUtils';

interface Props {
  project: Project;
  index: number;
  onOpen: () => void;
}

const MAX_STACK = 4;

const ProjectCardPro = forwardRef<HTMLDivElement, Props>(function ProjectCardPro({ project, index, onOpen }, ref) {
  const reduced = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const stack = stackOf(project);
  const highlights = (project.features ?? []).slice(0, 2);
  const hasCaseStudy = Boolean(project.caseStudy);
  const internal = isInternalProjectUrl(project.liveUrl);

  // Cursor-follow glow only: the card itself stays still so text remains easy to read.
  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = cardRef.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <motion.div
      ref={ref}
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <article
        ref={cardRef}
        onMouseMove={onMove}
        className="glass-card group flex h-full flex-col rounded-2xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary-400/40 hover:shadow-2xl hover:shadow-black/40 motion-reduce:transform-none"
      >
        {/* Media with hover affordance. Clicking the media opens the case study. */}
        <div className="relative">
          <ProjectMedia
            title={project.title}
            coverImage={project.coverImage}
            previewVideoMp4={project.previewVideoMp4}
            previewVideoWebm={project.previewVideoWebm}
            videoPoster={project.videoPoster}
            mediaAlt={project.mediaAlt}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black">
              Open case study <ArrowUpRight size={13} />
            </span>
          </div>
          {project.featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-amber-200 backdrop-blur">
              <Star size={10} fill="currentColor" /> Featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
            <span className="text-primary-300">{categoryShort[project.category] ?? project.category}</span>
            {hasCaseStudy && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 normal-case tracking-normal text-emerald-300">
                <BookOpenCheck size={11} /> Case study
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold leading-snug text-white">{project.title}</h3>
          {project.toolBadge && <p className="mt-1.5 text-xs font-medium text-slate-400">{project.toolBadge}</p>}
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

          {highlights.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs leading-snug text-slate-300">
                  <Check size={13} className="mt-0.5 shrink-0 text-primary-300" />
                  <span className="line-clamp-2">{h}</span>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {stack.slice(0, MAX_STACK).map((t) => (
              <li key={t} className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-slate-400">
                {t}
              </li>
            ))}
            {stack.length > MAX_STACK && (
              <li className="rounded-md px-2 py-0.5 font-mono text-[10px] text-slate-500">+{stack.length - MAX_STACK} more</li>
            )}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
            <button
              type="button"
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              Case study <ArrowUpRight size={13} />
            </button>
            {internal ? (
              <Link
                to={toRouterPath(project.liveUrl)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Read more
              </Link>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                Live site <ExternalLink size={12} />
              </a>
            )}
            {project.etsyUrl && (
              <a
                href={project.etsyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/20 bg-orange-400/10 px-3.5 py-2 text-xs font-semibold text-orange-300 transition-colors hover:bg-orange-400/20"
                title="Buy this template on Etsy"
              >
                <ShoppingBag size={12} /> {project.etsyCtaLabel ?? 'Template'}
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.div>
  );
});

export default ProjectCardPro;
