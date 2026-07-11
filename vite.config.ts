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
        theme_color: '#080b14',
        background_color: '#080b14',
        display: 'standalone',
        icons: [
          {
            src: 'https://vitejs.dev/logo.svg', // Placeholder icon
            sizes: '192x192',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  base: '/3D-Portfolio/', // Add this line verbatim
});
