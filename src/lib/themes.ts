/**
 * Full-site theme tokens. Each theme changes accent + page surfaces so the
 * switch is obvious — inspired by familiar product UIs, not just a hue swap.
 */

export type ThemeId =
  | 'nextgen'
  | 'spotify'
  | 'discord'
  | 'linkedin'
  | 'youtube'
  | 'x'
  | 'github'
  | 'netflix'
  | 'linear'
  | 'stripe'
  | 'figma'
  | 'slack';

export interface ThemeTokens {
  /** Primary scale used by Tailwind `primary-*` utilities */
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary900: string;
  /** Page canvas */
  bg: string;
  /** Header / elevated chrome */
  bgElevated: string;
  /** Banded sections (video strip, muted panels) */
  bgMuted: string;
  /** RGB triple for glow/shadows, e.g. "29 185 84" */
  glowRgb: string;
  /** Gradient text / button stops */
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
}

export interface PortfolioTheme {
  id: ThemeId;
  name: string;
  /** Short platform label shown in the picker */
  inspiredBy: string;
  tokens: ThemeTokens;
}

export const THEMES: PortfolioTheme[] = [
  {
    id: 'nextgen',
    name: 'NextGen',
    inspiredBy: 'Brand coral',
    tokens: {
      primary300: '#E58A6A',
      primary400: '#DE826A',
      primary500: '#D47A6A',
      primary600: '#C26354',
      primary900: '#5C2C24',
      bg: '#0F172A',
      bgElevated: '#0F172A',
      bgMuted: '#0b0f19',
      glowRgb: '212 122 106',
      gradientFrom: '#E58A6A',
      gradientVia: '#DE826A',
      gradientTo: '#c084fc',
    },
  },
  {
    id: 'spotify',
    name: 'Spotify',
    inspiredBy: 'Spotify',
    tokens: {
      primary300: '#1ed760',
      primary400: '#1db954',
      primary500: '#1db954',
      primary600: '#169c46',
      primary900: '#0a3d1c',
      bg: '#121212',
      bgElevated: '#181818',
      bgMuted: '#0a0a0a',
      glowRgb: '29 185 84',
      gradientFrom: '#1ed760',
      gradientVia: '#1db954',
      gradientTo: '#b3ffd0',
    },
  },
  {
    id: 'discord',
    name: 'Discord',
    inspiredBy: 'Discord',
    tokens: {
      primary300: '#949cf7',
      primary400: '#7983f5',
      primary500: '#5865f2',
      primary600: '#4752c4',
      primary900: '#2b2f6b',
      bg: '#1e1f22',
      bgElevated: '#2b2d31',
      bgMuted: '#111214',
      glowRgb: '88 101 242',
      gradientFrom: '#949cf7',
      gradientVia: '#5865f2',
      gradientTo: '#eb459e',
    },
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    inspiredBy: 'LinkedIn',
    tokens: {
      primary300: '#70b5f9',
      primary400: '#378fe9',
      primary500: '#0a66c2',
      primary600: '#004182',
      primary900: '#052e5c',
      bg: '#0a1628',
      bgElevated: '#0f2137',
      bgMuted: '#07101c',
      glowRgb: '10 102 194',
      gradientFrom: '#70b5f9',
      gradientVia: '#0a66c2',
      gradientTo: '#57c5f7',
    },
  },
  {
    id: 'youtube',
    name: 'YouTube',
    inspiredBy: 'YouTube',
    tokens: {
      primary300: '#ff6b6b',
      primary400: '#ff4444',
      primary500: '#ff0000',
      primary600: '#cc0000',
      primary900: '#660000',
      bg: '#0f0f0f',
      bgElevated: '#212121',
      bgMuted: '#0a0a0a',
      glowRgb: '255 0 0',
      gradientFrom: '#ff4444',
      gradientVia: '#ff0000',
      gradientTo: '#ff8a80',
    },
  },
  {
    id: 'x',
    name: 'X',
    inspiredBy: 'X / Twitter',
    tokens: {
      primary300: '#8ecdf8',
      primary400: '#4dabf7',
      primary500: '#1d9bf0',
      primary600: '#1a8cd8',
      primary900: '#0c4a6e',
      bg: '#000000',
      bgElevated: '#16181c',
      bgMuted: '#0a0a0a',
      glowRgb: '29 155 240',
      gradientFrom: '#e7e9ea',
      gradientVia: '#1d9bf0',
      gradientTo: '#8ecdf8',
    },
  },
  {
    id: 'github',
    name: 'GitHub',
    inspiredBy: 'GitHub',
    tokens: {
      primary300: '#56d364',
      primary400: '#3fb950',
      primary500: '#238636',
      primary600: '#196c2e',
      primary900: '#0a2914',
      bg: '#0d1117',
      bgElevated: '#161b22',
      bgMuted: '#010409',
      glowRgb: '63 185 80',
      gradientFrom: '#56d364',
      gradientVia: '#238636',
      gradientTo: '#58a6ff',
    },
  },
  {
    id: 'netflix',
    name: 'Netflix',
    inspiredBy: 'Netflix',
    tokens: {
      primary300: '#f87171',
      primary400: '#ef4444',
      primary500: '#e50914',
      primary600: '#b20710',
      primary900: '#5c0408',
      bg: '#141414',
      bgElevated: '#1f1f1f',
      bgMuted: '#000000',
      glowRgb: '229 9 20',
      gradientFrom: '#f87171',
      gradientVia: '#e50914',
      gradientTo: '#fca5a5',
    },
  },
  {
    id: 'linear',
    name: 'Linear',
    inspiredBy: 'Linear',
    tokens: {
      primary300: '#a5a9f5',
      primary400: '#828fff',
      primary500: '#5e6ad2',
      primary600: '#4c56b8',
      primary900: '#262b5c',
      bg: '#0c0c0d',
      bgElevated: '#141416',
      bgMuted: '#08080a',
      glowRgb: '94 106 210',
      gradientFrom: '#828fff',
      gradientVia: '#5e6ad2',
      gradientTo: '#c4b5fd',
    },
  },
  {
    id: 'stripe',
    name: 'Stripe',
    inspiredBy: 'Stripe',
    tokens: {
      primary300: '#a5b4fc',
      primary400: '#818cf8',
      primary500: '#635bff',
      primary600: '#4f46e5',
      primary900: '#2e1065',
      bg: '#0a2540',
      bgElevated: '#0d2f4f',
      bgMuted: '#061829',
      glowRgb: '99 91 255',
      gradientFrom: '#7dd3fc',
      gradientVia: '#635bff',
      gradientTo: '#c084fc',
    },
  },
  {
    id: 'figma',
    name: 'Figma',
    inspiredBy: 'Figma',
    tokens: {
      primary300: '#c084fc',
      primary400: '#a855f7',
      primary500: '#a259ff',
      primary600: '#7c3aed',
      primary900: '#4c1d95',
      bg: '#1e1e1e',
      bgElevated: '#2c2c2c',
      bgMuted: '#141414',
      glowRgb: '162 89 255',
      gradientFrom: '#f24e1e',
      gradientVia: '#a259ff',
      gradientTo: '#1abcfe',
    },
  },
  {
    id: 'slack',
    name: 'Slack',
    inspiredBy: 'Slack',
    tokens: {
      primary300: '#e8b4ff',
      primary400: '#c678dd',
      primary500: '#4a154b',
      primary600: '#611f69',
      primary900: '#2c0b2e',
      bg: '#1a0b1c',
      bgElevated: '#2d1830',
      bgMuted: '#120814',
      glowRgb: '97 31 105',
      gradientFrom: '#36c5f0',
      gradientVia: '#e01e5a',
      gradientTo: '#ecb22e',
    },
  },
];

export const DEFAULT_THEME_ID: ThemeId = 'nextgen';
export const THEME_STORAGE_KEY = 'portfolio-theme';

/** Map legacy single-hue theme names to the new platform IDs. */
const LEGACY_THEME_MAP: Record<string, ThemeId> = {
  Indigo: 'stripe',
  Rose: 'netflix',
  Emerald: 'spotify',
  Amber: 'youtube',
  NextGen: 'nextgen',
};

export function getTheme(id: string | null | undefined): PortfolioTheme {
  if (!id) return THEMES.find((t) => t.id === DEFAULT_THEME_ID)!;
  const mapped = LEGACY_THEME_MAP[id] ?? id;
  return THEMES.find((t) => t.id === mapped) ?? THEMES.find((t) => t.id === DEFAULT_THEME_ID)!;
}

export function applyThemeTokens(theme: PortfolioTheme): void {
  const root = document.documentElement;
  const { tokens } = theme;

  root.style.setProperty('--color-primary-300', tokens.primary300);
  root.style.setProperty('--color-primary-400', tokens.primary400);
  root.style.setProperty('--color-primary-500', tokens.primary500);
  root.style.setProperty('--color-primary-600', tokens.primary600);
  root.style.setProperty('--color-primary-900', tokens.primary900);

  root.style.setProperty('--color-bg', tokens.bg);
  root.style.setProperty('--color-bg-elevated', tokens.bgElevated);
  root.style.setProperty('--color-bg-muted', tokens.bgMuted);
  root.style.setProperty('--color-glow-rgb', tokens.glowRgb);
  root.style.setProperty('--color-gradient-from', tokens.gradientFrom);
  root.style.setProperty('--color-gradient-via', tokens.gradientVia);
  root.style.setProperty('--color-gradient-to', tokens.gradientTo);

  root.dataset.theme = theme.id;

  // Keep browser chrome / PWA bar in sync
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', tokens.bg);

  window.dispatchEvent(
    new CustomEvent('theme-change', {
      detail: {
        id: theme.id,
        accent: tokens.primary400,
        bg: tokens.bg,
      },
    }),
  );
}
