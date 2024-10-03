import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Taskify/',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["./react-icons/bi"]
    }
  },
})
