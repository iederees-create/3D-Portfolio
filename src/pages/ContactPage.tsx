import { motion } from 'framer-motion';
import { ShoppingBag, Mail, Sparkles } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

export default function ContactPage() {
  return (
    <section className="relative cta-glow min-h-screen flex items-center py-16 sm:py-24 px-4 sm:px-6 pt-32">
      <div className="max-w-3xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-medium text-pink-300 mb-6">
            <Sparkles size={11} />
            Ready to grow your business online?
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium italic leading-tight mb-5">
            Let's build your{' '}
            <span className="gradient-text-warm">online presence</span>
          </h1>

          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Get a custom, professional website built for your business — fast, mobile-ready, and designed to convert visitors into customers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-16">
            <MagneticButton>
              <a
                href="https://nextgenwebs.etsy.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-bold text-base transition-all hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1"
              >
                <ShoppingBag size={18} />
                Shop Templates on Etsy
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="mailto:hello@nextgenwebs.co.za"
                className="flex items-center justify-center gap-3 px-6 sm:px-8 py-4 rounded-full liquid-glass text-slate-300 hover:text-white font-semibold text-base transition-all hover:-translate-y-1"
              >
                <Mail size={18} />
                Get a Custom Quote
              </a>
            </MagneticButton>
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-8">
            {[
              { label: 'Response time', value: 'Within 24 hours', icon: '⚡' },
              { label: 'Location', value: 'Cape Town, SA', icon: '📍' },
              { label: 'Available for', value: 'Remote worldwide', icon: '🌍' },
            ].map(item => (
              <div key={item.label} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-white">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
