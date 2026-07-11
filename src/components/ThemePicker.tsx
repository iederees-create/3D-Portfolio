import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { name: 'Indigo', colors: { 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 900: '#312e81' } },
  { name: 'Rose', colors: { 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 900: '#881337' } },
  { name: 'Emerald', colors: { 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 900: '#064e3b' } },
  { name: 'Amber', colors: { 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 900: '#78350f' } },
];

export default function ThemePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Indigo');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
      applyTheme(saved);
      setActiveTheme(saved);
    }
  }, []);

  const applyTheme = (themeName: string) => {
    const theme = themes.find(t => t.name === themeName);
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
    localStorage.setItem('portfolio-theme', themeName);
    setActiveTheme(themeName);
    
    // Dispatch event so 3D background or other non-CSS elements can update
    window.dispatchEvent(new CustomEvent('theme-change', { detail: theme.colors['400'] }));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-lg bg-primary-500/20 border border-primary-500/30 flex items-center justify-center transition-colors hover:bg-primary-500/30"
        title="Change Theme"
      >
        <Palette size={15} className="text-primary-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 p-2 bg-[#080b14] border border-white/10 rounded-xl shadow-xl flex gap-2"
          >
            {themes.map(t => (
              <button
                key={t.name}
                onClick={() => applyTheme(t.name)}
                className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${activeTheme === t.name ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: t.colors[500] }}
                title={t.name}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
