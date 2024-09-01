import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 515,
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.indexOf("node_modules/react/") !== -1) {
            return;
          } else if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'script-defer',

    manifest: {
      name: 'Cloud Cookbook',
      short_name: 'Cloud Cook',
      description: 'Cloud Cookbook is your personal digital kitchen assistant. Organize your favorite cookbooks and recipes in one convenient place. Easily search, save, and share your culinary creations.',
      theme_color: '#FFD700',

      icons: [{
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      }, {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      }, {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      }, {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }],
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  server: {
    port: 3020,
    open: true,
  },
})