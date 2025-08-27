import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': {
        target: "http://localhost:3333",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      }
    },
    allowedHosts: [`engineers-chapel-disclaimer-pension.trycloudflare.com`],
    
  },

})
