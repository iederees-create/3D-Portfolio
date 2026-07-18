import { useEffect, useRef, useState } from 'react';
import { Check, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  THEMES,
  THEME_STORAGE_KEY,
  applyThemeTokens,
  getTheme,
  type ThemeId,
} from '../lib/themes';

export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<ThemeId>('nextgen');
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = getTheme(saved);
    applyThemeTokens(theme);
    setActiveId(theme.id);
    if (saved !== theme.id) {
      localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    }
  }, []);

  // Close on outside click / Escape
  useEffect(() => {
    if (!isOpen) return;

    const onPointer = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const selectTheme = (id: ThemeId) => {
    const theme = getTheme(id);
    applyThemeTokens(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    setActiveId(theme.id);
  };

  const active = getTheme(activeId);

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-primary-500/30 bg-primary-500/15 px-2.5 transition-colors hover:bg-primary-500/25"
        title="Change theme"
        aria-label="Change theme"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Palette size={14} className="text-primary-400" />
        <span className="hidden sm:inline text-[11px] font-semibold tracking-wide text-primary-300">
          {active.name}
        </span>
        <span
          className="h-2.5 w-2.5 rounded-full ring-1 ring-white/30"
          style={{ backgroundColor: active.tokens.primary500 }}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 z-[60] mt-2 w-[min(20rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-bg-elevated)] shadow-2xl shadow-black/50"
            role="listbox"
            aria-label="Site themes"
          >
            <div className="border-b border-white/10 px-3 py-2.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Colour themes
              </p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Full look — not just a tint
              </p>
            </div>

            <div className="grid max-h-[min(24rem,70vh)] grid-cols-2 gap-1.5 overflow-y-auto p-2">
              {THEMES.map((theme) => {
                const selected = activeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => selectTheme(theme.id)}
                    className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition-all ${
                      selected
                        ? 'border-primary-400/60 ring-1 ring-primary-400/40'
                        : 'border-white/10 hover:border-white/25'
                    }`}
                  >
                    {/* Mini preview of bg + accent */}
                    <div
                      className="relative h-12 w-full"
                      style={{ backgroundColor: theme.tokens.bg }}
                    >
                      <div
                        className="absolute inset-x-2 bottom-2 top-2 rounded-md opacity-90"
                        style={{ backgroundColor: theme.tokens.bgElevated }}
                      />
                      <div
                        className="absolute bottom-3 left-3 h-2 w-8 rounded-full"
                        style={{ backgroundColor: theme.tokens.primary500 }}
                      />
                      <div
                        className="absolute bottom-3 right-3 h-5 w-5 rounded-full shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${theme.tokens.gradientFrom}, ${theme.tokens.primary500})`,
                        }}
                      />
                      {selected && (
                        <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-black">
                          <Check size={10} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <div className="bg-black/25 px-2 py-1.5">
                      <p className="text-[11px] font-semibold text-white leading-none">
                        {theme.name}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400 leading-none">
                        {theme.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
