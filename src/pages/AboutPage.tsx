import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowRight, Target, TrendingUp, Users, Terminal,
  Play, Volume2, VolumeX, Youtube,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '../components/MagneticButton';
import SEO from '../components/SEO';
import {
  PROFILE_IMAGE_ALT,
  PROFILE_IMAGE_PATH,
  PROFILE_IMAGE_URL,
  PROFILE_NAME,
  publicAsset,
  toAbsoluteUrl,
} from '../lib/site';

// ─── VideoCard ────────────────────────────────────────────────────────────────
function VideoCard({
  src, title, featured = false, tag,
}: {
  src: string;
  title: string;
  featured?: boolean;
  tag?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isHovered]);

  // Featured: full-width card, 16:9-ish landscape with play-on-hover
  if (featured) {
    return (
      <div
        className="relative w-full rounded-2xl overflow-hidden glass-card group cursor-pointer border border-white/10"
        style={{ aspectRatio: '9/16' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          if (videoRef.current) {
            if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
            else { videoRef.current.play(); setIsPlaying(true); }
          }
        }}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          preload="metadata"
          loop
          playsInline
          muted={isMuted}
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* Tag badge */}
        {tag && (
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 uppercase tracking-widest">
              {tag}
            </span>
          </div>
        )}

        {/* Play overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform duration-300">
              <Play className="text-white ml-1" fill="white" size={22} />
            </div>
          </div>
        )}

        {/* Title + mute */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <p className="text-white text-sm font-semibold leading-snug line-clamp-2 flex-1">{title}</p>
          <button
            onClick={e => { e.stopPropagation(); setIsMuted(m => !m); }}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={13} className="text-white" /> : <Volume2 size={13} className="text-white" />}
          </button>
        </div>
      </div>
    );
  }

  // Default: portrait scroll card
  return (
    <div
      className="relative flex-shrink-0 w-56 h-96 rounded-2xl overflow-hidden glass-card group cursor-pointer border border-white/10 snap-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (videoRef.current) {
          if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
          else { videoRef.current.play(); setIsPlaying(true); }
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

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

      {/* Title */}
      <div className="absolute bottom-4 left-4 right-12">
        <p className="text-white text-xs font-semibold line-clamp-2 leading-snug">{title}</p>
      </div>

      {/* Play overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30">
            <Play className="text-white ml-1" fill="white" size={18} />
          </div>
        </div>
      )}

      {/* Mute toggle */}
      <button
        onClick={e => { e.stopPropagation(); setIsMuted(m => !m); }}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors z-10"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted
          ? <VolumeX size={13} className="text-white" />
          : <Volume2 size={13} className="text-white" />}
      </button>
    </div>
  );
}


// ─── Feature cards data ───────────────────────────────────────────────────────
const featureCards = [
  {
    title: 'Business-focused',
    desc: 'I approach each project by first understanding the business, its customers and the result the website needs to produce.',
    icon: <Target className="text-primary-400 mb-4" size={24} />,
  },
  {
    title: 'Conversion-minded',
    desc: 'I use clear messaging, purposeful layouts and strong calls to action to guide visitors towards enquiries, bookings or purchases.',
    icon: <TrendingUp className="text-primary-400 mb-4" size={24} />,
  },
  {
    title: 'Customer-aware',
    desc: 'My background in sales and customer-facing roles helps me anticipate questions, objections and points of friction.',
    icon: <Users className="text-primary-400 mb-4" size={24} />,
  },
  {
    title: 'Technically capable',
    desc: 'I build responsive websites and web applications using modern development tools, APIs, databases and AI-assisted workflows.',
    icon: <Terminal className="text-primary-400 mb-4" size={24} />,
  },
];

const skills = [
  'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'Supabase',
  'API Integration', 'GitHub', 'Responsive Design', 'UI/UX',
  'Digital Marketing', 'CRM Systems', 'AI Automation', 'Data Analysis',
];

// ─── Videos ──────────────────────────────────────────────────────────────────
const base = import.meta.env.BASE_URL;

// Featured spotlight reels (grok-produced, higher production value)
const featuredReels = [
  { src: `${base}videos/grok1.mp4`, title: 'What makes a website actually convert?', tag: 'Conversion' },
  { src: `${base}videos/grok2.mp4`, title: 'The web strategy most businesses miss.', tag: 'Strategy' },
  { src: `${base}videos/grok3.mp4`, title: 'Why I build websites differently.', tag: 'Process' },
];

// Full reel bank — IG short-form clips
const videos = [
  { src: `${base}videos/vid1.mp4`,  title: 'Stop using generic website templates.' },
  { src: `${base}videos/vid2.mp4`,  title: 'Why your website is loading slowly.' },
  { src: `${base}videos/vid3.mp4`,  title: 'The secret to turning visitors into customers.' },
  { src: `${base}videos/vid5.mp4`,  title: 'How to build trust immediately.' },
  { src: `${base}videos/vid6.mp4`,  title: 'Stop ignoring Local SEO!' },
  { src: `${base}videos/vid7.mp4`,  title: 'Why I use React for small business websites.' },
  { src: `${base}videos/vid8.mp4`,  title: 'The "Trojan Horse" Sales Funnel' },
  { src: `${base}videos/vid9.mp4`,  title: 'Case Study: Fluent Path Tutoring' },
  { src: `${base}videos/vid10.mp4`, title: 'Mobile-First is no longer optional.' },
  { src: `${base}videos/vid11.mp4`, title: 'How much does a custom website ACTUALLY cost?' },
  { src: `${base}videos/vid12.mp4`, title: 'The 3-second rule of web design.' },
  { src: `${base}videos/vid13.mp4`, title: 'Do you really need a website?' },
  { src: `${base}videos/vid14.mp4`, title: 'Why I love building for service businesses.' },
];

// ─── AboutPage ───────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: videoRef, inView: videoInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const portraitSrc = publicAsset(PROFILE_IMAGE_PATH);

  return (
    <div className="pt-20">
      <SEO
        title="About Iederees Francis | NextGenWebs Cape Town"
        description="Meet Iederees Francis — Cape Town web developer behind NextGenWebs. Sales-rooted, conversion-minded websites, templates and business tools."
        path="about/"
        ogImage={PROFILE_IMAGE_URL}
        ogImageAlt={PROFILE_IMAGE_ALT}
      >
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: PROFILE_NAME,
            url: toAbsoluteUrl('about/'),
            image: PROFILE_IMAGE_URL,
            jobTitle: 'Web Developer & Founder',
            worksFor: { '@type': 'Organization', name: 'NextGenWebs' },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Cape Town',
              addressCountry: 'ZA',
            },
            sameAs: [
              'https://www.linkedin.com/in/iederees-francis-936717392/',
              'https://github.com/iederees-create',
              'https://x.com/nextgenwebdevs',
              'https://instagram.com/nextgenerationwebdevs',
            ],
          })}
        </script>
      </SEO>

      {/* ── Bio + Feature Cards ── */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto">
        {/* Background glow accents */}
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10"
        >
          {/* Left Content Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="inline-block px-3 py-1 mb-6 text-[10px] font-mono tracking-widest text-primary-400 uppercase border border-primary-500/20 rounded-full bg-primary-500/5">
              About Me
            </div>

            {/* Mobile portrait — above the headline on small screens */}
            <div className="mb-8 flex justify-center lg:hidden">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary-400/40 via-cyan-400/20 to-transparent blur-md" />
                <img
                  src={portraitSrc}
                  alt={PROFILE_IMAGE_ALT}
                  width={160}
                  height={160}
                  className="relative h-40 w-40 rounded-full object-cover border-2 border-white/15 shadow-2xl shadow-primary-500/20"
                  decoding="async"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-8 leading-[1.1]">
              I build digital experiences that connect technology, business and people.
            </h1>

            <div className="space-y-6 text-slate-300 text-lg leading-relaxed mb-12">
              <p>
                I'm <strong className="text-white font-semibold">Iederees Francis</strong>, a Cape Town-based web developer with experience across sales, student recruitment, customer experience, digital marketing and business operations.
              </p>
              <p>
                My path into development started with people rather than code. I spent years helping customers understand complex services, make informed decisions and move confidently from interest to action. That experience shaped the way I build websites today.
              </p>
              <p>
                I do not only focus on how a website looks or how the code works. I also think about the person using it, the questions they may have, the trust the business needs to build and the steps that turn a visitor into a genuine lead or customer.
              </p>
              <p>
                I combine modern web development, thoughtful design, customer insight and commercial thinking to build digital experiences that are attractive, practical and focused on real business results.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {featureCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300"
                >
                  {card.icon}
                  <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 flex flex-col gap-8">

            {/* Portrait — desktop/tablet sidebar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex flex-col items-center text-center"
            >
              <div className="relative mb-5">
                <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-primary-400/35 via-cyan-400/15 to-transparent blur-lg" />
                <img
                  src={portraitSrc}
                  alt={PROFILE_IMAGE_ALT}
                  width={320}
                  height={320}
                  className="relative h-72 w-72 xl:h-80 xl:w-80 rounded-[2rem] object-cover border border-white/15 shadow-2xl shadow-primary-500/20"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <p className="text-lg font-semibold text-white">{PROFILE_NAME}</p>
              <p className="text-sm text-slate-400 mt-1">Founder · NextGenWebs · Cape Town</p>
            </motion.div>

            {/* Quote Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-primary-500/20 to-cyan-500/10 border border-white/10 backdrop-blur-xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-2xl md:text-3xl font-medium text-white leading-tight mb-2">
                "A beautiful website gets attention.
              </div>
              <div className="text-2xl md:text-3xl font-medium text-primary-300 leading-tight italic">
                A clear customer journey turns that attention into action."
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5"
            >
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Technical Arsenal</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/5 border border-white/10 rounded-lg hover:border-primary-500/50 hover:text-primary-300 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Philosophy + CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-auto"
            >
              <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                Technology should make a business feel more human, not more complicated.
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                My goal is to create digital products that customers can understand, business owners can be proud of and organisations can continue improving as they grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton>
                  <Link
                    to="/work"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm tracking-wide rounded-full hover:bg-slate-200 transition-colors shadow-lg"
                  >
                    View My Projects
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-bold text-sm tracking-wide rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    Let's Work Together <ArrowRight size={16} />
                  </Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── In My Own Words — Video Section ── */}
      <section className="py-20 bg-surface-muted border-y border-white/5 overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, y: 20 }}
            animate={videoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Section label */}
            <div className="inline-block px-3 py-1 mb-5 text-[10px] font-mono tracking-widest text-primary-400 uppercase border border-primary-500/20 rounded-full bg-primary-500/5">
              In My Own Words
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  How I think about the web
                </h2>
                <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                  I talk publicly about web development, conversion design and business strategy.
                  These short clips give you a feel for how I approach problems, what I focus on, and why I build the way I do.
                </p>
              </div>
              <a
                href="https://youtube.com/channel/uc3cd_ossaxmwdtvfvxgxwgw"
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all text-xs font-semibold"
              >
                <Youtube size={14} /> Subscribe on YouTube
              </a>
            </div>

            <p className="text-xs text-slate-600 mt-4">Hover or tap to play · Sound off by default</p>
          </motion.div>
        </div>

        {/* ── Featured spotlight reels (3-col grid) ── */}
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {featuredReels.map((vid, i) => (
              <motion.div
                key={vid.src}
                initial={{ opacity: 0, y: 24 }}
                animate={videoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <VideoCard src={vid.src} title={vid.title} featured tag={vid.tag} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Short-form reel scroll ── */}
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-mono">More clips ↓ scroll to explore</p>
        </div>
        <div className="relative w-full">
          <div
            className="flex gap-5 overflow-x-auto px-6 pb-6 pt-2 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="w-[calc((100vw-80rem)/2)] flex-shrink-0 hidden xl:block" />

            {videos.map((vid, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={videoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.5) }}
              >
                <VideoCard src={vid.src} title={vid.title} />
              </motion.div>
            ))}

            <div className="w-6 flex-shrink-0 xl:w-[calc((100vw-80rem)/2)]" />
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-surface-muted to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-surface-muted to-transparent" />
        </div>
      </section>
    </div>
  );
}
