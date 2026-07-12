import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Play, Volume2, VolumeX, Pause } from 'lucide-react'

// --- VideoCard Component ---
function VideoCard({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Autoplay on hover
  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(e => console.error('Play error:', e))
      setIsPlaying(true)
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [isHovered])

  return (
    <div 
      className="relative flex-shrink-0 w-64 h-[28rem] rounded-2xl overflow-hidden glass-card group cursor-pointer border border-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        // Toggle play/pause manually on click (mobile support)
        if (videoRef.current) {
          if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
          } else {
            videoRef.current.play()
            setIsPlaying(true)
          }
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        preload="none"
        loop
        playsInline
        muted={isMuted}
      />
      
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

      {/* Title */}
      <div className="absolute bottom-4 left-4 right-12">
        <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
          {title}
        </h3>
      </div>

      {/* Play/Pause Overlay Icon (Center) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
            <Play className="text-white ml-1" fill="white" size={20} />
          </div>
        </div>
      )}

      {/* Mute Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsMuted(!isMuted)
        }}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors z-10"
      >
        {isMuted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
      </button>
    </div>
  )
}

// --- ReelShowcase Component ---
export default function ReelShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const scrollRef = useRef<HTMLDivElement>(null)

  const base = import.meta.env.BASE_URL

  const videos = [
    { src: `${base}videos/vid1.mp4`, title: 'Stop using generic website templates.' },
    { src: `${base}videos/vid2.mp4`, title: 'Why your website is loading slowly.' },
    { src: `${base}videos/vid3.mp4`, title: 'The secret to turning visitors into customers.' },
    { src: `${base}videos/vid5.mp4`, title: 'How to build trust immediately.' },
    { src: `${base}videos/vid6.mp4`, title: 'Stop ignoring Local SEO!' },
    { src: `${base}videos/vid7.mp4`, title: 'Why I use React for small business websites.' },
    { src: `${base}videos/vid8.mp4`, title: 'The "Trojan Horse" Sales Funnel' },
    { src: `${base}videos/vid9.mp4`, title: 'Case Study: Fluent Path Tutoring' },
    { src: `${base}videos/vid10.mp4`, title: 'Mobile-First is no longer optional.' },
    { src: `${base}videos/vid11.mp4`, title: 'How much does a custom website ACTUALLY cost?' },
    { src: `${base}videos/vid12.mp4`, title: 'The 3-second rule of web design.' },
    { src: `${base}videos/vid13.mp4`, title: 'Do you really need a website?' },
    { src: `${base}videos/vid14.mp4`, title: 'Why I love building for service businesses.' }
  ]

  return (
    <section className="py-20 bg-[#0b0f19] border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between gap-4"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Digital Showcase
            </h2>
            <p className="text-slate-400 text-sm">Hover or tap to play. Sound off by default.</p>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative w-full">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Spacer for proper alignment */}
          <div className="w-[calc((100vw-80rem)/2)] flex-shrink-0 hidden xl:block" />
          
          {videos.map((vid, i) => (
            <div key={i} className="snap-center xl:snap-align-none">
              <VideoCard src={vid.src} title={vid.title} />
            </div>
          ))}
          
          {/* End spacer */}
          <div className="w-6 flex-shrink-0 xl:w-[calc((100vw-80rem)/2)]" />
        </div>
      </div>
    </section>
  )
}
