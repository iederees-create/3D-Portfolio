import { useEffect, useId, useState } from 'react';
import { Routes, Route, NavLink, Link, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Twitter, Instagram, X, Youtube } from 'lucide-react';

import NextGenWebsAssistant from './NextGenWebsAssistant';
import ThemePicker from './components/ThemePicker';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import BrandLogo from './components/BrandLogo';
import WebGLTransitionOverlay from './components/WebGLTransitionOverlay';
import CustomCursor from './components/CustomCursor';
import MemberSignup from './components/MemberSignup';
import MiniGame from './components/MiniGame';
import { useMember } from './contexts/MemberContext';
import { useAnalytics } from './hooks/useAnalytics';

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
import QAOperationsReviewPage from './pages/services/QAOperationsReviewPage';

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
  { to: '/credentials',  label: 'Credentials' },
  { to: '/contact',      label: 'Contact' },
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
      className="fixed top-0 left-0 right-0 z-50 w-full bg-surface-elevated/95 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">

        {/* Logo — same mark as favicon.svg */}
        <Link to="/" className="flex items-center gap-3 min-w-0 shrink-0" aria-label="Iederees Francis — home">
          <BrandLogo showWordmark={false} />
          <span className="font-bold text-sm tracking-wide text-white whitespace-nowrap">Iederees Francis</span>
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
          <ThemePicker />

          <Link
            to="/contact"
            className="hidden sm:inline-flex px-4 lg:px-6 py-2 lg:py-2.5 bg-white text-black text-xs font-bold tracking-wide rounded-full hover:bg-slate-200 transition-colors whitespace-nowrap"
          >
            Get a free quote
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
              className="lg:hidden absolute left-0 right-0 top-full z-50 border-t border-white/10 bg-surface-elevated shadow-2xl shadow-black/40"
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

                <Link
                  to="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-white px-4 py-3 text-xs font-bold tracking-wide text-black hover:bg-slate-200 transition-colors"
                >
                  Get a free quote
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
  const linkClass = 'text-slate-400 hover:text-white transition-colors text-sm';
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-bold text-sm text-white tracking-wide">Iederees Francis</p>
          <p className="text-xs text-slate-500 mt-1">Freelance web developer · Cape Town &amp; remote</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href="mailto:iedereesfrancis@gmail.com" className={linkClass}>Email</a>
          <a href="https://www.linkedin.com/in/iederees-francis-936717392/" target="_blank" rel="noreferrer" className={linkClass}>LinkedIn</a>
          <Link to="/about" className={linkClass}>About</Link>
          <Link to="/blog" className={linkClass}>Blog</Link>
          <a href="https://nextgenwebs.etsy.com" target="_blank" rel="noreferrer" className={linkClass}>Templates (Etsy)</a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://x.com/nextgenwebdevs" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors" aria-label="X / Twitter"><Twitter size={16} /></a>
          <a href="https://instagram.com/nextgenerationwebdevs" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
          <a href="https://youtube.com/channel/uc3cd_ossaxmwdtvfvxgxwgw" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors" aria-label="YouTube"><Youtube size={16} /></a>
          <p className="text-xs text-slate-600">© 2026 Iederees Francis · NextGenWebs</p>
        </div>
      </div>
    </footer>
  );
}

import AdminDashboard from './pages/AdminDashboard';

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
        <Route path="/services/qa-operations-review" element={<PageWrapper><QAOperationsReviewPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/blog" element={<PageWrapper><BlogIndexPage /></PageWrapper>} />
        <Route path="/blog/:slug" element={<PageWrapper><ArticlePage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/credentials" element={<PageWrapper><CredentialsPage /></PageWrapper>} />
        <Route path="/admin-dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        <Route path="/admin-dashbourd" element={<Navigate to="/admin-dashboard" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
// Note: the Router itself (BrowserRouter with the GitHub Pages basename) is
// provided by main.tsx, along with HelmetProvider for per-route SEO/meta
// tags — App only owns the chrome (nav/footer) and route table.
export default function App() {
  const { isVIPModalOpen, openVIPModal, closeVIPModal, loginMember, isAssessmentRunning, stopAssessment } = useMember();
  useAnalytics();

  useEffect(() => {
    const handleOpenModal = () => openVIPModal();
    window.addEventListener('open-vip-modal', handleOpenModal);
    return () => window.removeEventListener('open-vip-modal', handleOpenModal);
  }, [openVIPModal]);

  return (
    <div className="relative w-full min-h-screen bg-surface text-slate-100 overflow-x-hidden transition-colors duration-300">
      <CustomCursor />
      {isAssessmentRunning && <MiniGame onClose={stopAssessment} />}
      <TerminalEasterEgg />
      <WebGLTransitionOverlay />

      <Navbar />

      <main>
        <AnimatedRoutes />
      </main>

      <Footer />

      {/* Floating NextGenWebs AI assistant — visible on all pages */}
      <NextGenWebsAssistant />

      <MemberSignup 
        isOpen={isVIPModalOpen} 
        onClose={closeVIPModal} 
        onSuccess={loginMember} 
      />
    </div>
  );
}
