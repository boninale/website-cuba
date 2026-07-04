/**
 * Préfixe un chemin interne avec le `base` du site (voir astro.config.mjs).
 * Nécessaire pour un hébergement en sous-chemin (ex. GitHub Pages
 * /website-cuba/). En racine, `BASE_URL` vaut « / » et le chemin est inchangé.
 *
 * withBase('/')          -> '/website-cuba/'
 * withBase('/projet/')   -> '/website-cuba/projet/'
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL; // ex. '/website-cuba/' ou '/'
  const b = base.endsWith('/') ? base.slice(0, -1) : base;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}` || '/';
}
