// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Le site est généré statiquement et fonctionne entièrement côté client.
  // Hébergé sur GitHub Pages à l'adresse https://boninale.github.io/website-cuba/
  // -> `base` doit correspondre au nom du dépôt (sous-chemin).
  // Astro préfixe automatiquement les ressources (CSS, images) avec `base` ;
  // les liens internes écrits à la main passent par le helper `withBase()`.
  site: 'https://boninale.github.io',
  base: '/website-cuba',
  build: {
    format: 'directory',
  },
});
