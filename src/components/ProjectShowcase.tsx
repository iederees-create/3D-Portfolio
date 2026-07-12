import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Pause, Play, ShoppingBag, X } from 'lucide-react'

export interface ProjectCaseStudy {
  methodology: string
  toolsUsed: string[]
  technicalChallenge: { title: string; body: string }
  privacyDesign: string
  testResults: string[]
}

interface ProjectShowcaseProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  galleryImages: string[]
  mediaAlts: string[]
  previewVideoMp4?: string
  previewVideoWebm?: string
  videoPoster?: string
  features?: string[]
  toolHighlight?: string
  /** Optional detailed case-study breakdown (methodology, tooling, challenges, privacy, test results). */
  caseStudy?: ProjectCaseStudy
  liveUrl: string
  etsyUrl?: string
}

/**
 * Full-screen accessible media showcase for a portfolio project: a
 * gallery/video carousel with keyboard, swipe, and click navigation, plus a
 * feature summary and CTAs. The video (when present) is slide 0; gallery
 * images follow. Only renders when the parent supplies at least one
 * gallery image, keeping projects without a full showcase unaffected.
 */
export function ProjectShowcase({
  isOpen,
  onClose,
  title,
  description,
  galleryImages,
  mediaAlts,
  previewVideoMp4,
  previewVideoWebm,
  videoPoster,
  features,
  toolHighlight,
  caseStudy,
  liveUrl,
  etsyUrl,
}: ProjectShowcaseProps) {
  const hasVideo = Boolean(previewVideoMp4 || previewVideoWebm)
  const slideCount = galleryImages.length + (hasVideo ? 1 : 0)
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchStartX = useRef<number | null>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  const goTo = (next: number) => {
    setIndex(((next % slideCount) + slideCount) % slideCount)
    setIsPlaying(false)
  }

  useEffect(() => {
    if (!isOpen) return
    previouslyFocused.current = document.activeElement as HTMLElement
    setIndex(0)
    dialogRef.current?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
      previouslyFocused.current?.focus?.()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') goTo(index - 1)
      else if (e.key === 'ArrowRight') goTo(index + 1)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, index, slideCount])

  if (!isOpen) return null

  const isVideoSlide = hasVideo && index === 0
  const imageIndex = hasVideo ? index - 1 : index

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) goTo(index + (delta < 0 ? 1 : -1))
    touchStartX.current = null
  }

  function toggleVideo() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} media showcase`}
        tabIndex={-1}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl bg-slate-900 border border-white/10 outline-none"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close showcase"
          className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
        >
          <X size={16} />
        </button>

        <div className="relative w-full bg-black/40" style={{ aspectRatio: '4 / 3' }}>
          {isVideoSlide ? (
            <>
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                poster={videoPoster}
                className="absolute inset-0 h-full w-full object-contain bg-black"
              >
                {previewVideoWebm && <source src={previewVideoWebm} type="video/webm" />}
                {previewVideoMp4 && <source src={previewVideoMp4} type="video/mp4" />}
              </video>
              <button
                type="button"
                onClick={toggleVideo}
                aria-label={isPlaying ? `Pause ${title} preview video` : `Play ${title} preview video`}
                className="absolute bottom-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm hover:bg-black/90 transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>
            </>
          ) : (
            <img
              src={galleryImages[imageIndex]}
              alt={mediaAlts[imageIndex] ?? `${title} screenshot ${imageIndex + 1}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain"
            />
          )}

          {slideCount > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous media"
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next media"
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              <div
                className="absolute bottom-4 left-4 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white"
                aria-live="polite"
              >
                {index + 1} / {slideCount}
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>

          {toolHighlight && (
            <div className="mb-4 rounded-xl bg-amber-400/10 border border-amber-400/20 px-4 py-3 text-sm text-amber-200">
              {toolHighlight}
            </div>
          )}

          {features && features.length > 0 && (
            <ul className="mb-5 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-slate-300">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          {caseStudy && (
            <div className="mb-5 space-y-4 rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">Case Study</h4>
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Methodology</h5>
                <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.methodology}</p>
              </div>
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Tools &amp; Technologies</h5>
                <div className="flex flex-wrap gap-1.5">
                  {caseStudy.toolsUsed.map((tool, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                  Technical Challenge: {caseStudy.technicalChallenge.title}
                </h5>
                <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.technicalChallenge.body}</p>
              </div>
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Privacy Design</h5>
                <p className="text-sm text-slate-300 leading-relaxed">{caseStudy.privacyDesign}</p>
              </div>
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Test Results</h5>
                <ul className="space-y-1">
                  {caseStudy.testResults.map((result, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors"
            >
              <ExternalLink size={15} /> View Live Demo
            </a>
            {etsyUrl && (
              <a
                href={etsyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/20 px-4 py-2.5 text-sm font-medium text-orange-300 transition-colors"
              >
                <ShoppingBag size={15} /> Buy on Etsy
              </a>
            )}
          </div>
        </div>

        {/* Thumbnail strip for direct navigation, lazy-loaded */}
        {galleryImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto px-6 pb-6" role="tablist" aria-label="Showcase thumbnails">
            {hasVideo && (
              <button
                type="button"
                role="tab"
                aria-selected={index === 0}
                aria-label="Show preview video"
                onClick={() => goTo(0)}
                className={`shrink-0 h-14 w-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === 0 ? 'border-amber-400' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                {videoPoster && <img src={videoPoster} alt="" loading="lazy" className="h-full w-full object-cover" />}
              </button>
            )}
            {galleryImages.map((src, i) => {
              const slideIdx = hasVideo ? i + 1 : i
              return (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={index === slideIdx}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => goTo(slideIdx)}
                  className={`shrink-0 h-14 w-14 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === slideIdx ? 'border-amber-400' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
