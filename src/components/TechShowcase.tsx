import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { techGroups } from '../data/techStack';

/** Tabbed technology showcase. Non-numeric: shows what is used, not invented skill levels. */
export default function TechShowcase({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(techGroups[0].id);
  const reduced = useReducedMotion();
  const group = techGroups.find((g) => g.id === active) ?? techGroups[0];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-7">
      <div role="tablist" aria-label="Technology categories" className="flex flex-wrap gap-2">
        {techGroups.map((g) => {
          const selected = g.id === active;
          return (
            <button
              key={g.id}
              role="tab"
              id={`tech-tab-${g.id}`}
              aria-selected={selected}
              aria-controls={`tech-panel-${g.id}`}
              onClick={() => setActive(g.id)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                selected ? 'text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              {selected && (
                <motion.span
                  layoutId={compact ? 'tech-pill-compact' : 'tech-pill'}
                  className="absolute inset-0 rounded-full bg-white"
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{g.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={group.id}
          role="tabpanel"
          id={`tech-panel-${group.id}`}
          aria-labelledby={`tech-tab-${group.id}`}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          <p className="max-w-xl text-sm text-slate-400">{group.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {group.items.map((item, i) => (
              <motion.li
                key={item}
                initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                whileHover={reduced ? undefined : { y: -3 }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-primary-400/50 hover:bg-primary-500/10 hover:text-white"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
