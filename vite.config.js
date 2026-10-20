import { defineConfig } from 'vite';

// GitHub Pages serves this repo from /l-hopkins-site/
export default defineConfig({
  base: '/l-hopkins-site/',
  build: {
    chunkSizeWarningLimit: 600, // three.js, loaded lazily for the pit
    rollupOptions: {
      input: { main: 'index.html', credits: 'credits.html' },
    },
  },
});
