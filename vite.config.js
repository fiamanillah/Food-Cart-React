import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensure this is correct for your project structure
  build: {
    outDir: 'dist', // Your build folder
    assetsDir: 'assets', // Where assets like images go
  },
})
