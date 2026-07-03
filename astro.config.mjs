// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Le site fonctionne entièrement côté client une fois généré.
  // `site` et `base` peuvent être adaptés selon l'hébergement (GitHub Pages, Netlify, Vercel).
  // Pour un sous-chemin GitHub Pages, décommenter et adapter :
  // site: 'https://mon-org.github.io',
  // base: '/mon-repo',
  build: {
    format: 'directory',
  },
});
