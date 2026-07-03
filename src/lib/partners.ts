import type { ImageMetadata } from 'astro';

/**
 * Chargement automatique des logos partenaires.
 * Déposer une image dans `src/content/partners/` l'intègre au bandeau et au
 * pied de page. Tri par nom de fichier (préfixer par 01-, 02-… pour l'ordre).
 *
 * Lien cliquable : associer un slug de fichier à une URL dans `PARTNER_LINKS`
 * ci-dessous (le slug est le nom de fichier sans extension ni préfixe `01-`).
 */

// Les images matricielles (png/jpg…) sont optimisées par Astro.
const rasterModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/partners/*.{png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP,AVIF}',
  { eager: true },
);
// Les SVG sont servis tels quels (import en tant qu'URL).
const svgModules = import.meta.glob<string>(
  '/src/content/partners/*.{svg,SVG}',
  { eager: true, query: '?url', import: 'default' },
);

/** Slug de fichier -> URL du site partenaire. */
const PARTNER_LINKS: Record<string, string> = {
  agrotic: 'https://www.agrotic.org/mission/',
  agrosys: 'https://agrosys.fr/',
  'institut-agro': 'https://www.institut-agro.fr/fr',
  agronautes: 'https://www.lesagronautes.org/index.php/qui-sommes-nous/',
};

export interface Partner {
  /** Source de l'image (ImageMetadata pour png/jpg, chaîne URL pour svg). */
  img: ImageMetadata | string;
  /** Lien externe optionnel. */
  href?: string;
  name: string;
}

/** Slug depuis un chemin : retire le dossier, l'extension et le préfixe d'ordre. */
function slugFromPath(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.[^.]+$/, '').replace(/^\d+[-_]?/, '');
}

function labelFromSlug(slug: string): string {
  const words = slug.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export function getPartners(): Partner[] {
  const entries: [string, ImageMetadata | string][] = [
    ...Object.entries(rasterModules).map(
      ([p, m]) => [p, m.default] as [string, ImageMetadata],
    ),
    ...Object.entries(svgModules).map(([p, url]) => [p, url] as [string, string]),
  ];

  return entries
    .sort(([a], [b]) => a.localeCompare(b, 'fr', { numeric: true }))
    .map(([path, img]) => {
      const slug = slugFromPath(path);
      return { img, href: PARTNER_LINKS[slug], name: labelFromSlug(slug) };
    });
}
