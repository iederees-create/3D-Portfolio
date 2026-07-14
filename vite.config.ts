import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NextGenWebs Portfolio',
        short_name: 'NextGenWebs',
        description: 'Premium Web Design Portfolio',
        start_url: '/3D-Portfolio/',
        theme_color: '#050505',
        background_color: '#0F172A',
        display: 'standalone',
        icons: [
          {
            src: '/3D-Portfolio/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/3D-Portfolio/', // Add this line verbatim
  build: {
    // Route-level lazy imports + vendor splits keep the entry under the
    // default 500 kB warning when possible. Three.js is not currently
    // imported by live routes (HeroBackground is unused).
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('three') || id.includes('@react-three')) {
            return 'three-vendor';
          }
          if (id.includes('framer-motion')) {
            return 'motion-vendor';
          }
          if (id.includes('lucide-react')) {
            return 'icons-vendor';
          }
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('react-router') ||
            id.includes('react-helmet-async') ||
            id.includes('scheduler')
          ) {
            return 'react-vendor';
          }
        },
      },
    },
  },
});
