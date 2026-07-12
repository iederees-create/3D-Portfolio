import { Pause, Play } from 'lucide-react'
import { useVideoAutoplay } from '../hooks/useVideoAutoplay'

interface ProjectMediaProps {
  title: string
  coverImage?: string
  previewVideoMp4?: string
  previewVideoWebm?: string
  videoPoster?: string
  mediaAlt?: string
}

/**
 * Optional responsive media area for a project card: a lazy-loaded cover
 * image, with an optional muted/looping preview video layered on top once
 * the card scrolls into view. Renders nothing (no reserved space) when a
 * project has no coverImage, keeping media-less cards pixel-identical to
 * before this feature existed.
 */
export function ProjectMedia({
  title,
  coverImage,
  previewVideoMp4,
  previewVideoWebm,
  videoPoster,
  mediaAlt,
}: ProjectMediaProps) {
  const hasVideo = Boolean(previewVideoMp4 || previewVideoWebm)
  const { containerRef, videoRef, isPlaying, prefersReducedMotion, togglePlay } = useVideoAutoplay({
    enabled: hasVideo,
  })

  if (!coverImage) return null

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-t-2xl bg-black/20"
      style={{ aspectRatio: '16 / 9' }}
    >
      <img
        src={coverImage}
        alt={mediaAlt ?? `${title} preview`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {hasVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={videoPoster}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          {previewVideoWebm && <source src={previewVideoWebm} type="video/webm" />}
          {previewVideoMp4 && <source src={previewVideoMp4} type="video/mp4" />}
        </video>
      )}
      {hasVideo && !prefersReducedMotion && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? `Pause ${title} preview video` : `Play ${title} preview video`}
          className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      )}
    </div>
  )
}
