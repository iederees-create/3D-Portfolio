import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
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

              <div className="flex flex-col sm:flex-row gap-4">
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
            </motion.div>
          </div>

          {/* Right Column (Stats) */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full lg:pl-8 lg:py-16 py-8">
            <div className="flex-1 flex flex-col justify-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Our Mission</div>
                  <div className="text-xl font-medium text-slate-200 leading-snug">Convert traffic into revenue through strategic, beautiful design.</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Tech Stack</div>
                  <div className="text-xl font-medium text-slate-200 leading-snug">React / TypeScript / Tailwind</div>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl flex flex-col justify-end">
                <div className="text-5xl font-bold text-white mb-2">{PROJECT_COUNT}+</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Projects Launched</div>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl flex flex-col justify-end">
                <div className="text-5xl font-bold text-white mb-2">100%</div>
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wide">Custom Built</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Skills Ticker ── */}
      <SkillsTicker />
    </>
  );
}
