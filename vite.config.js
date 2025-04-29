import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/embedding': 'http://10.16.190.99:8000',
      '/llm_response': 'http://10.16.190.99:8000',
    },
  },
})
