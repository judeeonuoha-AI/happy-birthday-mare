import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the built assets resolve correctly when the site is
  // served from a GitHub Pages project subpath (e.g. /repo-name/).
  base: './',
})
