import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Content lives in src/content/*.json and the HTML for each section in src/templates/sections.js.
// This plugin fills the <!-- @section name --> markers in index.html at build time, so the
// published page is plain HTML and every fact is edited in one JSON file.

const root = import.meta.dirname;
const readJson = (name) => JSON.parse(readFileSync(resolve(root, 'src/content', `${name}.json`), 'utf8'));

function contentPlugin() {
  return {
    name: 'site-content',
    async transformIndexHtml(html) {
      // Cache-busting query so template edits show up in `npm run dev` without a restart.
      const sections = await import(`${pathToFileURL(resolve(root, 'src/templates/sections.js'))}?t=${Date.now()}`);
      const site = readJson('site');
      const data = {
        hero: sections.hero(site),
        about: sections.about(site),
        accomplishments: sections.accomplishments(readJson('results')),
        chapters: sections.chapters(readJson('chapters')),
        videos: sections.videos(readJson('videos')),
        contact: sections.contact(site),
      };
      return html
        .replace(/<!-- @section (\w+) -->/g, (_, name) => {
          if (!(name in data)) throw new Error(`index.html asks for unknown section "${name}"`);
          return data[name];
        })
        .replaceAll('<!-- @title -->', site.title)
        .replaceAll('<!-- @description -->', site.description);
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('/src/content/') || file.includes('/src/templates/')) {
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [contentPlugin()],
  build: { outDir: 'dist', assetsInlineLimit: 0 },
});
