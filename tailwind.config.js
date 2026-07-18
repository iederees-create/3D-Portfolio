/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'serif'],
        mono: ['Geist Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        primary: {
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          900: 'var(--color-primary-900)',
        },
        surface: {
          DEFAULT: 'var(--color-bg)',
          elevated: 'var(--color-bg-elevated)',
          muted: 'var(--color-bg-muted)',
        },
      }
    },
  },
  plugins: [],
}
