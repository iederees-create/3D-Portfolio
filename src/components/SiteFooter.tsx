import { Sparkles, Twitter, Instagram, Youtube, ShoppingBag } from 'lucide-react';

/** Shared footer used on every route, extracted verbatim from the original App.tsx footer. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-primary-400" />
          <span className="font-bold text-sm text-white uppercase tracking-widest">NextGenWebs</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://x.com/nextgenwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <Twitter size={16} /> X.com
          </a>
          <a href="https://instagram.com/nextgenerationwebdevs" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <Instagram size={16} /> Instagram
          </a>
          <a href="https://youtube.com/channel/uc3cd_ossaxmwdtvfvxgxwgw" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <Youtube size={16} /> YouTube
          </a>
          <a href="https://nextgenwebs.etsy.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
            <ShoppingBag size={16} /> Etsy Shop
          </a>
        </div>

        <p className="text-xs text-slate-600">© 2026 NextGenWebs · Premium Web Design</p>
      </div>
    </footer>
  );
}
