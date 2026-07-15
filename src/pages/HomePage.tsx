import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Play } from 'lucide-react';
import { useRef, useState } from 'react';
import MagneticButton from '../components/MagneticButton';

// ─── Skills ticker data ───────────────────────────────────
const skills = [
  'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Next.js', 'Framer Motion',
  'Node.js', 'Supabase', 'Figma', 'UI/UX Design', 'SEO', 'GitHub Pages',
  'Responsive Design', 'Web Performance',
];

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

// ─── Hero reel video panel ────────────────────────────────
const base = import.meta.env.BASE_URL;

function HeroReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[320px] mx-auto lg:mx-0 lg:ml-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 cursor-pointer group"
      style={{ aspectRatio: '9/16' }}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={`${base}videos/grok2.mp4`}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted
        preload="metadata"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Play button */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="text-white ml-1" fill="white" size={24} />
          </div>
        </div>
      )}

      {/* Bottom label */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs text-white font-medium">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Web Dev Insights
        </div>
      </div>
    </motion.div>
  );
}

const PROJECT_COUNT = 14;

// Dynamic time-based greeting
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  if (hour < 22) return 'Good evening';
  return 'Working late?';
}

export default function HomePage() {
  const greeting = getGreeting();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative w-full pt-20 min-h-[90vh] flex flex-col">
        <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-6">

          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col justify-center py-12 lg:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-block px-4 py-1.5 mb-8 text-[11px] font-medium tracking-wide text-slate-300 uppercase bg-white/5 rounded-full">
                {greeting} — Welcome
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-white">
                Premium<br />
                <span className="text-slate-500">Web Development.</span>
              </h1>

              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-lg mb-12">
                We build fast, high-performance websites designed to help your business grow. Custom code, clean design, and real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <MagneticButton>
                  <Link
                    to="/work"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm tracking-wide rounded-full hover:bg-slate-200 transition-colors shadow-lg"
                  >
                    View Projects <ArrowRight size={16} />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/5 text-slate-300 font-bold text-sm tracking-wide rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    About Me
                  </Link>
                </MagneticButton>
              </div>

              {/* Inline stats */}
              <div className="grid grid-cols-2 gap-4 max-w-xs">
                <div className="p-5 bg-white/5 rounded-2xl">
                  <div className="text-4xl font-bold text-white mb-1">{PROJECT_COUNT}+</div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Projects Launched</div>
                </div>
                <div className="p-5 bg-white/5 rounded-2xl">
                  <div className="text-4xl font-bold text-white mb-1">100%</div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Custom Built</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column — Hero video reel */}
          <div className="lg:col-span-5 flex items-center justify-center py-8 lg:py-16">
            <HeroReel />
          </div>

        </div>
      </section>

      {/* ── Skills Ticker ── */}
      <SkillsTicker />
    </>
  );
}
