import { useEffect, useRef, useState } from 'react'

interface UseVideoAutoplayOptions {
  enabled: boolean
}

interface UseVideoAutoplayResult {
  containerRef: React.RefObject<HTMLDivElement>
  videoRef: React.RefObject<HTMLVideoElement>
  isPlaying: boolean
  prefersReducedMotion: boolean
  togglePlay: () => void
}

/**
 * Drives a muted/looping preview video: plays only while its container is
 * scrolled into view and the tab is visible, never autoplays when the user
 * prefers reduced motion, and exposes a manual play/pause toggle that
 * overrides the automatic behavior until the card leaves and re-enters view.
 */
export function useVideoAutoplay({ enabled }: UseVideoAutoplayOptions): UseVideoAutoplayResult {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!enabled || prefersReducedMotion || userPaused) return
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldPlay = entry.isIntersecting && document.visibilityState === 'visible'
        if (shouldPlay) {
          videoRef.current?.play().catch(() => {})
          setIsPlaying(true)
        } else {
          videoRef.current?.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [enabled, prefersReducedMotion, userPaused])

  useEffect(() => {
    if (!enabled) return

    function handleVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        videoRef.current?.pause()
        setIsPlaying(false)
        return
      }
      if (userPaused || prefersReducedMotion) return
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (inView) {
        videoRef.current?.play().catch(() => {})
        setIsPlaying(true)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [enabled, userPaused, prefersReducedMotion])

  function togglePlay() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
      setUserPaused(false)
    } else {
      video.pause()
      setIsPlaying(false)
      setUserPaused(true)
    }
  }

  return { containerRef, videoRef, isPlaying, prefersReducedMotion, togglePlay }
}
