import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Cho phép Vite serve file từ node_modules gốc (bootstrap-icons fonts)
      allow: [
        path.resolve(__dirname, '..'),
      ],
    },
  },
})
