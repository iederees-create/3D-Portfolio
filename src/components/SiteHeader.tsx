import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Youtube } from 'lucide-react';
import ThemePicker from './ThemePicker';
import BrandLogo from './BrandLogo';

const BASE = import.meta.env.BASE_URL;

/**
 * Shared site navigation used on every route (homepage, blog index, and
 * individual articles) so visitors never land on a page with no way back
 * to the rest of the portfolio. Section links point at `${BASE}#section`
 * so they resolve correctly from any route, not just from `/`.
 */
export default function SiteHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-surface-elevated/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">
        {/* Logo - Left — same mark as favicon.svg */}
        <Link to="/" className="flex items-center gap-4 justify-start" aria-label="NextGenWebs home">
          <BrandLogo />
        </Link>

        {/* Nav - Center */}
        <div className="flex items-center justify-center gap-8">
          <Link to="/" className="hidden md:flex text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
            Home
          </Link>
          <a href={`${BASE}#work`} className="hidden md:flex text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
            Work
          </a>
          <a href={`${BASE}#about`} className="hidden md:flex text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
            About
          </a>
          <Link to="/blog/" className="hidden md:flex text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
            Blog
          </Link>
          <a href={`${BASE}#credentials`} className="hidden md:flex text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-colors">
            Credentials
          </a>
        </div>

        {/* Actions - Right */}
        <div className="flex items-center justify-end gap-5">
          <div className="hidden xl:flex items-center gap-3 mr-2 border-r border-white/10 pr-5">
            <a href="https://x.com/nextgenwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Twitter size={16} /></a>
            <a href="https://instagram.com/nextgenerationwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Instagram size={16} /></a>
            <a href="https://youtube.com/channel/uc3cd_ossaxmwdtvfvxgxwgw" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors"><Youtube size={16} /></a>
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
          <a
            href={`${BASE}#contact`}
            className="px-6 py-2.5 bg-white text-black text-xs font-bold tracking-wide rounded-full hover:bg-slate-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.header>
  );
}
