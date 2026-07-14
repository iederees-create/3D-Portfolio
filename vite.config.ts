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
});
