import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/embedding': {
        target: 'http://10.16.190.99:8000',
        changeOrigin: true
      },
      '/llm_response': {
        target: 'http://10.16.190.99:8000',
        changeOrigin: true
      },
      '/chat_response': {
        target: 'http://10.16.190.99:8000',
        changeOrigin: true
      }
    },
  },
})
