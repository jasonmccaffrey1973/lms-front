import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
  host: '127.0.0.1',
  port: 5173,
  strictPort: true,
  allowedHosts: ['lms.test'],

  proxy: {
    '/graphql': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
      ws: true,
    },
  },
},
  
  test: {
    environment: 'node',
    globals: true,
  },
})
