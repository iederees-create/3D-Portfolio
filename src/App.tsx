import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Twitter, Instagram, Youtube } from 'lucide-react';

import QuoteChat from './QuoteChat';
import ThemePicker from './components/ThemePicker';
import KonamiCode from './components/KonamiCode';
import TerminalEasterEgg from './components/TerminalEasterEgg';

// Pages
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import BlogIndexPage from './pages/BlogIndexPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import CredentialsPage from './pages/CredentialsPage';

// ─── Animated page wrapper ────────────────────────────────────────────────────
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/work',         label: 'Work' },
  { to: '/about',        label: 'About' },
  { to: '/blog',         label: 'Blog' },
  { to: '/credentials',  label: 'Credentials' },
];

function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0F172A]/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">

        {/* Logo */}
        <div className="flex items-center gap-4 justify-start">
          <Link to="/" className="flex items-center gap-3 group" aria-label="NextGenWebs home">
            <div
              className="relative w-8 h-8 bg-[#050505] text-[#f4f1ea] flex items-center justify-center font-bold font-mono text-sm rounded-md overflow-hidden border border-white/10"
              aria-hidden="true"
            >
              <span className="relative z-10 tracking-tighter">NX</span>
              <span className="pointer-events-none absolute inset-0 z-20">
                <span className="absolute left-[-10%] top-[70%] h-[3px] w-[120%] -rotate-[28deg] bg-[#e11d2e]" />
                <span className="absolute right-0.5 bottom-0.5 h-1.5 w-1.5 bg-[#c8f542]" />
              </span>
            </div>
            <span className="font-bold text-sm tracking-widest uppercase hidden sm:block group-hover:text-white transition-colors">
              NextGenWebs
            </span>
          </Link>
        </div>

        {/* Nav links */}
        <nav className="flex items-center justify-center gap-6">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `hidden md:flex text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end gap-5">
          <div className="hidden xl:flex items-center gap-3 mr-2 border-r border-white/10 pr-5">
            <a href="https://x.com/nextgenwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter size={16} /></a>
            <a href="https://instagram.com/nextgenerationwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Instagram size={16} /></a>
            <a href="https://youtube.com/channel/uc3cd_ossaxmwdtvfvxgxwgw" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Youtube size={16} /></a>
            <a href="https://www.linkedin.com/in/iederees-francis-936717392/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <ThemePicker />
          <a
            href="https://nextgenwebs.etsy.com"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:flex text-xs font-semibold tracking-wide text-slate-300 hover:text-white transition-colors"
          >
            Templates
          </a>
          <Link
            to="/contact"
            className="px-6 py-2.5 bg-white text-black text-xs font-bold tracking-wide rounded-full hover:bg-slate-200 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-primary-400" />
          <span className="font-bold text-sm text-white uppercase tracking-widest">NextGenWebs</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a href="https://x.com/nextgenwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"><Twitter size={16} /> X.com</a>
          <a href="https://instagram.com/nextgenerationwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"><Instagram size={16} /> Instagram</a>
          <a href="https://youtube.com/channel/uc3cd_ossaxmwdtvfvxgxwgw" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"><Youtube size={16} /> YouTube</a>
          <a href="https://www.linkedin.com/in/iederees-francis-936717392/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://nextgenwebs.etsy.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"><ShoppingBag size={16} /> Etsy Shop</a>
        </div>

        <p className="text-xs text-slate-600">© 2026 NextGenWebs · Premium Web Design</p>
      </div>
    </footer>
  );
}

// ─── Animated Routes wrapper ──────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/work" element={<PageWrapper><WorkPage /></PageWrapper>} />
        <Route path="/work/:slug" element={<PageWrapper><ProjectPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><BlogIndexPage /></PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper><ArticlePage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/credentials" element={<PageWrapper><CredentialsPage /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
// Note: the Router itself (BrowserRouter with the GitHub Pages basename) is
// provided by main.tsx, along with HelmetProvider for per-route SEO/meta
// tags — App only owns the chrome (nav/footer) and route table.
export default function App() {
  return (
    <div className="relative w-full min-h-screen bg-[#0F172A] text-slate-100 overflow-x-hidden">
      <KonamiCode />
      <TerminalEasterEgg />

      <Navbar />

      <main>
        <AnimatedRoutes />
      </main>

      <Footer />

      {/* Floating Quote Chat — visible on all pages */}
      <QuoteChat />
    </div>
  );
}
