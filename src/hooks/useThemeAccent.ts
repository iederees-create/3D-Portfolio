import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, getTheme } from '../lib/themes';

/** Current theme accent colour, kept in sync with the ThemePicker's `theme-change` event. */
export function useThemeAccent(): string {
  const [accent, setAccent] = useState(() => getTheme(null).tokens.primary400);

  useEffect(() => {
    setAccent(getTheme(localStorage.getItem(THEME_STORAGE_KEY)).tokens.primary400);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const next = typeof detail === 'string' ? detail : detail?.accent;
      if (next) setAccent(next);
    };
    window.addEventListener('theme-change', onChange);
    return () => window.removeEventListener('theme-change', onChange);
  }, []);

  return accent;
}
