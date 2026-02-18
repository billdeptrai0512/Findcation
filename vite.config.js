import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: process.env.ANALYZE === 'true',
      filename: 'stats.html'
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Findcation',
        short_name: 'Findcation',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: '/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
        ]
      },
    })
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group React libraries
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Group animation libraries
            if (id.includes('framer-motion') || id.includes('motion')) {
              return 'animation-vendor';
            }
            // Group HTTP libraries
            if (id.includes('axios')) {
              return 'http-vendor';
            }
            // Group map libraries
            if (id.includes('leaflet') || id.includes('maplibre') || id.includes('@maptiler')) {
              return 'map-vendor';
            }
            // Everything else
            return 'vendor';
          }
        },
      },
    },
  },


  server: {
    allowedHosts: ['revision-largest-jill-hood.trycloudflare.com'],
    proxy: {
      '/auth': {
        target: "https://api.findcation.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      }
    },
  },

})
