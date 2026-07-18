import { useEffect, useId, useState } from 'react';
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ShoppingBag, Sparkles, Twitter, Instagram, X, Youtube } from 'lucide-react';

import NextGenWebsAssistant from './NextGenWebsAssistant';
import ThemePicker from './components/ThemePicker';
import KonamiCode from './components/KonamiCode';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import BrandLogo from './components/BrandLogo';

// Pages
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import BlogIndexPage from './pages/BlogIndexPage';
import ArticlePage from './pages/ArticlePage';
import ContactPage from './pages/ContactPage';
import CredentialsPage from './pages/CredentialsPage';
import ProjectPage from './pages/ProjectPage';
import LeadResearchProjectPage from './pages/projects/LeadResearchProjectPage';

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
// Desktop nav shows at lg (1024px+). Below that we switch to a hamburger menu
// so links never just vanish without a mobile fallback.
const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/work',         label: 'Work' },
  { to: '/about',        label: 'About' },
  { to: '/blog',         label: 'Blog' },
  { to: '/credentials',  label: 'Credentials' },
];

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Close the mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Escape key + lock body scroll while open
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0F172A]/95 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">

        {/* Logo — same mark as favicon.svg */}
        <Link to="/" className="flex items-center gap-3 min-w-0 shrink-0" aria-label="NextGenWebs home">
          <BrandLogo />
        </Link>

        {/* Desktop nav — only when there is real room (lg+) */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1" aria-label="Primary">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold tracking-wide transition-colors whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop / tablet actions */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          <div className="hidden xl:flex items-center gap-3 mr-1 border-r border-white/10 pr-4">
            <a href="https://x.com/nextgenwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="X / Twitter"><Twitter size={16} /></a>
            <a href="https://instagram.com/nextgenerationwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="https://youtube.com/channel/uc3cd_ossaxmwdtvfvxgxwgw" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="YouTube"><Youtube size={16} /></a>
            <a href="https://www.facebook.com/profile.php?id=61590665101851" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook personal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590630038201" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#1877F2] transition-colors" aria-label="NextGenWebs Facebook page" title="NextGenWebs page">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/iederees-francis-936717392/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>

          <ThemePicker />

          <a
            href="https://nextgenwebs.etsy.com"
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex text-xs font-semibold tracking-wide text-slate-300 hover:text-white transition-colors whitespace-nowrap"
          >
            Templates
          </a>

          <Link
            to="/contact"
            className="hidden sm:inline-flex px-4 lg:px-6 py-2 lg:py-2.5 bg-white text-black text-xs font-bold tracking-wide rounded-full hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            Contact
          </Link>

          {/* Hamburger — mobile + mid desktop when nav links are hidden */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} strokeWidth={2.25} /> : <Menu size={20} strokeWidth={2.25} />}
          </button>
        </div>
      </div>

      {/* Mobile / compact drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              className="lg:hidden fixed inset-0 top-16 sm:top-20 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              id={menuId}
              aria-label="Mobile primary"
              className="lg:hidden absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-[#0F172A] shadow-2xl shadow-black/40"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
                {navLinks.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-semibold tracking-wide transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}

                <a
                  href="https://nextgenwebs.etsy.com"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold tracking-wide text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  Templates
                </a>

                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-xs font-bold tracking-wide text-black hover:bg-slate-200 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
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
          <a href="https://www.facebook.com/profile.php?id=61590665101851" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            Facebook
          </a>
          <a href="https://www.facebook.com/profile.php?id=61590630038201" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
            NextGenWebs Page
          </a>
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
        <Route path="/projects/qualified-lead-research" element={<PageWrapper><LeadResearchProjectPage /></PageWrapper>} />
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

      {/* Floating NextGenWebs AI assistant — visible on all pages */}
      <NextGenWebsAssistant />
    </div>
  );
}
