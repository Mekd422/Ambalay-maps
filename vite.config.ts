import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mdx({ remarkPlugins: [remarkGfm] })],
  server: {
    headers: {
      // 'Content-Security-Policy':
      //   "default-src 'self'; connect-src 'self' https://ambalay-ai-chatbot-app.vercel.app https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
        
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    }
    // proxy: {
    //   "/api": {
    //     target: "https://www.ambalaymaps.com",
    //     changeOrigin: true,
    //     secure: true,
    //   },
    // },
  }
})
