import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173, // use Render's PORT if available
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'vigyapana.onrender.com',
      'digital-agency-3.onrender.com'
    ]
  }
})
