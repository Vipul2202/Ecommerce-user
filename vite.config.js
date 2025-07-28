import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Match backend port
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // /api/user/register → /user/register
      },
    },
  },
})
