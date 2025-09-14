import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
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
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/favicon-32x32.png',
          sizes: '192x192',
          type: 'image/png'
        }, 
      ]},
    })
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0];
          }
        },
      },
    },
  },


  server: {
    proxy: {
      '/auth': {
        target: "https://api.findcation.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      }
    },
    allowedHosts: [`fees-proc-arkansas-keno.trycloudflare.com`],
  },

})
