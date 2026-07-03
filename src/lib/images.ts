import type { ImageMetadata } from 'astro';

/**
 * Chargement automatique des images des fermes.
 * -----------------------------------------------
 * Toutes les images déposées dans `src/content/farms/<id>/photos/` et
 * `src/content/farms/<id>/schemas/` sont récupérées automatiquement via
 * `import.meta.glob`. Elles sont optimisées par Astro (formats/tailles).
 *
 * Aucune déclaration manuelle n'est nécessaire : déposer un fichier suffit.
 */

// NB : les motifs de `import.meta.glob` doivent être des chaînes littérales.
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/farms/*/photos/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true },
);

const schemaModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/farms/*/schemas/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true },
);

export interface FarmImage {
  src: ImageMetadata;
  /** Légende générée automatiquement à partir du nom de fichier. */
  caption: string;
  /** Nom de fichier brut (utile pour de futures métadonnées). */
  filename: string;
}

/**
 * Transforme un nom de fichier en légende lisible.
 * `culture-associee.jpg` -> `Culture associee`
 */
export function captionFromFilename(path: string): string {
  const filename = path.split('/').pop() ?? path;
  const base = filename.replace(/\.[^.]+$/, ''); // retire l'extension
  const words = base.replace(/[-_]+/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Extrait l'identifiant de ferme (nom du dossier) depuis un chemin d'image. */
function farmIdFromPath(path: string): string {
  const match = path.match(/\/farms\/([^/]+)\//);
  return match ? match[1] : '';
}

/** Construit et trie (ordre alphabétique) la liste d'images d'un dossier. */
function collect(
  modules: Record<string, { default: ImageMetadata }>,
  farmId: string,
): FarmImage[] {
  return Object.entries(modules)
    .filter(([path]) => farmIdFromPath(path) === farmId)
    .sort(([a], [b]) => a.localeCompare(b, 'fr', { numeric: true }))
    .map(([path, mod]) => ({
      src: mod.default,
      caption: captionFromFilename(path),
      filename: path.split('/').pop() ?? path,
    }));
}

/** Photos d'une ferme, triées par ordre alphabétique. */
export function getPhotos(farmId: string): FarmImage[] {
  return collect(photoModules, farmId);
}

/** Schémas d'une ferme, triés par ordre alphabétique. */
export function getSchemas(farmId: string): FarmImage[] {
  return collect(schemaModules, farmId);
}
