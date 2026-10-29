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
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 6 MiB limit to accommodate 3D libraries
        // The standalone dashboards under /dashboards/ are real static HTML files: keep them out of the
        // precache and make sure the SPA navigation fallback never swaps them for index.html.
        globIgnores: ['dashboards/**', 'craftbill/**'],
        // CraftBill has a generated static entry page. Fetch it from the network
        // rather than serving a cached SPA shell that might predate the project.
        navigateFallbackDenylist: [/\/dashboards\//, /\/work\/craftbill-angular-saas\/?/, /\/craftbill\//]
      }
    })
  ],
  base: '/3D-Portfolio/', // Add this line verbatim
});
