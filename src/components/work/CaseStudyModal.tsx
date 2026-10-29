import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Check, ExternalLink, Image as ImageIcon,
  Mail, MessageCircle, Play, ShoppingBag, Box, X,
} from 'lucide-react';
import type { Project } from '../../pages/WorkPage';
import ErrorBoundary from '../ErrorBoundary';
import Reveal from '../Reveal';
import { useCan3D } from '../../hooks/useCapabilities';
import { hireMailto, whatsappLink } from '../../lib/contact';
import { isInternalProjectUrl, toRouterPath } from '../../lib/site';
import { categoryShort, stackOf } from './workUtils';

// The 3D laptop (three.js) only downloads when a visitor opens a case study on a capable device.
const DeviceMockup3D = lazy(() => import('../3d/DeviceMockup3D'));

type ViewMode = '3d' | 'image' | 'video';

interface Props {
  project: Project;
  slug: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

/** A device-framed flat screenshot, used when 3D is unavailable or the visitor picks "Image". */
function FlatPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-t-xl border border-white/15 bg-slate-800 p-2 shadow-2xl">
        <img src={src} alt={alt} className="aspect-[16/10] w-full rounded-md bg-black/40 object-cover object-top" />
      </div>
      <div className="mx-auto h-2.5 w-[106%] -translate-x-[2.8%] rounded-b-xl bg-gradient-to-b from-slate-600 to-slate-800" />
    </div>
  );
}

function ProcessStep({ n, title, children, defaultOpen = false }: { n: number; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const reduced = useReducedMotion();
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-2xl"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/15 text-sm font-bold text-primary-300">{n}</span>
        <span className="flex-1 text-sm font-semibold text-white sm:text-base">{title}</span>
        <ChevronDown size={18} className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-slate-300">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CaseStudyModal({ project, slug, onClose, onPrev, onNext }: Props) {
  const reduced = useReducedMotion();
  const can3D = useCan3D(768);
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = useMemo(() => {
    const list: { src: string; alt: string }[] = [];
    if (project.coverImage) list.push({ src: project.coverImage, alt: project.mediaAlt ?? `${project.title} cover` });
    (project.galleryImages ?? []).forEach((src, i) => list.push({ src, alt: project.galleryImageAlts?.[i] ?? `${project.title} screenshot ${i + 1}` }));
    return list;
  }, [project]);
  const hasVideo = Boolean(project.previewVideoMp4 || project.previewVideoWebm);
  const [imageIndex, setImageIndex] = useState(0);
  const [mode, setMode] = useState<ViewMode>('image');
  const stack = stackOf(project);
  const cs = project.caseStudy;
  const internal = isInternalProjectUrl(project.liveUrl);

  // Default to the 3D mockup when the device can handle it.
  useEffect(() => {
    setImageIndex(0);
    setMode(can3D && images.length > 0 ? '3d' : 'image');
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project, can3D, images.length]);

  // Dialog behaviour: focus management, scroll lock, Escape and arrow keys.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  const current = images[imageIndex];
  const enquirySubject = `Enquiry about: ${project.title}`;
  const enquiryBody = `Hi Iederees,\n\nI saw "${project.title}" on your portfolio and I'm interested in something similar.\n\nHere's what I have in mind:\n\n`;

  // Portalled to <body> so the dialog sits above the sticky header (the page content has its own stacking context).
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        tabIndex={-1}
        initial={reduced ? false : { y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={reduced ? undefined : { y: 30, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-slate-950 shadow-2xl outline-none sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-primary-300">
              {categoryShort[project.category] ?? project.category} · Case study
            </p>
            <h2 id="case-study-title" className="mt-1 text-xl font-bold leading-tight text-white sm:text-2xl">{project.title}</h2>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {onPrev && (
              <button type="button" onClick={onPrev} aria-label="Previous project" className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                <ChevronLeft size={20} />
              </button>
            )}
            {onNext && (
              <button type="button" onClick={onNext} aria-label="Next project" className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                <ChevronRight size={20} />
              </button>
            )}
            <button type="button" onClick={onClose} aria-label="Close case study" className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          {/* Preview */}
          {(images.length > 0 || hasVideo) && (
            <div className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-6 sm:px-8">
              <div role="group" aria-label="Preview mode" className="mb-4 flex justify-center gap-1.5">
                {can3D && images.length > 0 && (
                  <button type="button" onClick={() => setMode('3d')} aria-pressed={mode === '3d'} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${mode === '3d' ? 'bg-white text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                    <Box size={13} /> 3D preview
                  </button>
                )}
                {images.length > 0 && (
                  <button type="button" onClick={() => setMode('image')} aria-pressed={mode === 'image'} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${mode === 'image' ? 'bg-white text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                    <ImageIcon size={13} /> Screenshots
                  </button>
                )}
                {hasVideo && (
                  <button type="button" onClick={() => setMode('video')} aria-pressed={mode === 'video'} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${mode === 'video' ? 'bg-white text-black' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
                    <Play size={13} /> Video
                  </button>
                )}
              </div>

              <div className="relative mx-auto min-h-[220px] max-w-3xl">
                {mode === '3d' && current ? (
                  <div className="relative aspect-[16/10] w-full cursor-grab active:cursor-grabbing">
                    <ErrorBoundary fallback={<FlatPreview src={current.src} alt={current.alt} />}>
                      <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-slate-500">Loading 3D preview…</div>}>
                        <DeviceMockup3D image={current.src} />
                      </Suspense>
                    </ErrorBoundary>
                    <p className="pointer-events-none absolute bottom-0 left-0 right-0 text-center text-[11px] text-slate-500">Drag to rotate · pick a screenshot below to change the screen</p>
                  </div>
                ) : mode === 'video' && hasVideo ? (
                  <video controls playsInline preload="metadata" poster={project.videoPoster} className="aspect-video w-full rounded-xl bg-black">
                    {project.previewVideoWebm && <source src={project.previewVideoWebm} type="video/webm" />}
                    {project.previewVideoMp4 && <source src={project.previewVideoMp4} type="video/mp4" />}
                  </video>
                ) : current ? (
                  <FlatPreview src={current.src} alt={current.alt} />
                ) : null}
              </div>

              {images.length > 1 && mode !== 'video' && (
                <ul className="mt-5 flex gap-2 overflow-x-auto pb-1 sm:justify-center" aria-label="Screenshots">
                  {images.map((img, i) => (
                    <li key={img.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setImageIndex(i)}
                        aria-label={`Show screenshot ${i + 1}: ${img.alt}`}
                        aria-current={i === imageIndex}
                        className={`block overflow-hidden rounded-lg border-2 transition-all ${i === imageIndex ? 'border-primary-400 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img.src} alt="" loading="lazy" className="h-12 w-20 object-cover object-top" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="space-y-12 px-5 py-8 sm:px-8 sm:py-10">
            {/* Overview */}
            <Reveal>
              <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-300">Overview</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-200">{project.description}</p>
                  {project.toolHighlight && (
                    <p className="mt-4 rounded-xl border border-primary-400/20 bg-primary-500/5 p-4 text-sm leading-relaxed text-slate-300">
                      <span className="font-semibold text-white">{project.toolBadge ?? 'Key feature'}: </span>
                      {project.toolHighlight}
                    </p>
                  )}
                </div>
                <dl className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm">
                  <div>
                    <dt className="text-xs text-slate-500">Type</dt>
                    <dd className="font-medium text-white">{categoryShort[project.category] ?? project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Delivery</dt>
                    <dd className="font-medium text-white">
                      {project.status ? 'Source project · deployment pending' : internal ? 'Case study page' : 'Live demo site'}
                      {project.etsyUrl ? ' · Template on Etsy' : ''}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Documented</dt>
                    <dd className="font-medium text-white">{cs ? 'Process write-up & test notes' : 'Features & tech stack'}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <Reveal>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-300">What&rsquo;s included</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.features.map((f, i) => (
                    <motion.li
                      key={f}
                      initial={reduced ? false : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                      className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 text-sm text-slate-300"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-primary-300" /> {f}
                    </motion.li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Tech stack */}
            <Reveal>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-300">Tech stack</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stack.map((t) => (
                  <li key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-200 transition-colors hover:border-primary-400/50 hover:bg-primary-500/10">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Process (only where the repo has a written case study) */}
            {cs ? (
              <Reveal>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-300">Process breakdown</h3>
                <div className="mt-4 space-y-3">
                  <ProcessStep n={1} title="Approach" defaultOpen>{cs.methodology}</ProcessStep>
                  <ProcessStep n={2} title={`Challenge: ${cs.technicalChallenge.title}`}>{cs.technicalChallenge.body}</ProcessStep>
                  <ProcessStep n={3} title="Privacy & safety design">{cs.privacyDesign}</ProcessStep>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="rounded-2xl border border-dashed border-white/10 p-5 text-sm text-slate-400">
                  A written process breakdown for this project has not been published yet. Ask me how it was built and I&rsquo;ll walk you through it.
                </div>
              </Reveal>
            )}

            {/* Results: only recorded test notes */}
            {cs && cs.testResults.length > 0 && (
              <Reveal>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-primary-300">Test results &amp; verification notes</h3>
                <ul className="mt-4 space-y-3">
                  {cs.testResults.map((r) => (
                    <li key={r} className="flex items-start gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-4 text-sm leading-relaxed text-slate-200">
                      <Check size={16} className="mt-0.5 shrink-0 text-emerald-300" /> {r}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 px-5 py-4 sm:hidden">
            {internal ? (
              <Link to={toRouterPath(project.liveUrl)} onClick={onClose} className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-slate-300 hover:text-white">Read more</Link>
            ) : (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-slate-300 hover:text-white">
                Live site <ExternalLink size={13} />
              </a>
            )}
            {project.etsyUrl && (
              <a href={project.etsyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-orange-300 hover:text-orange-200">
                <ShoppingBag size={13} /> {project.etsyCtaLabel ?? 'Buy template'}
              </a>
            )}
            <Link to={`/work/${slug}/`} onClick={onClose} className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold text-slate-400 hover:text-white">
              Full details page
            </Link>
          </div>
        </div>

        {/* Conversion footer: always visible */}
        <div className="flex flex-col gap-3 border-t border-white/10 bg-slate-950/95 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="hidden text-sm text-slate-400 sm:block">Want something like this for your business?</p>
          <div className="flex flex-wrap items-center gap-2">
            <Link to="/contact" onClick={onClose} className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-slate-200">
              Get a free quote <ArrowRight size={14} />
            </Link>
            <a href={hireMailto(enquirySubject, enquiryBody)} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <Mail size={14} /> Hire me
            </a>
            <a href={whatsappLink(`Hi Iederees! I saw your "${project.title}" project and I'd like to chat about something similar.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              <MessageCircle size={14} /> <span className="sr-only sm:not-sr-only">WhatsApp</span>
            </a>
            <div className="hidden items-center gap-2 sm:flex">
            {internal ? (
              <Link to={toRouterPath(project.liveUrl)} onClick={onClose} className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-semibold text-slate-300 hover:text-white">Read more</Link>
            ) : (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-semibold text-slate-300 hover:text-white">
                Live site <ExternalLink size={13} />
              </a>
            )}
            {project.etsyUrl && (
              <a href={project.etsyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-semibold text-orange-300 hover:text-orange-200">
                <ShoppingBag size={13} /> {project.etsyCtaLabel ?? 'Buy template'}
              </a>
            )}
            <Link to={`/work/${slug}/`} onClick={onClose} className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm font-semibold text-slate-400 hover:text-white">
              Full details page
            </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
