import type { ImageMetadata } from 'astro';

/**
 * Chargement automatique des médias des fermes.
 * -----------------------------------------------
 * Toutes les images ET vidéos déposées dans `src/content/farms/<id>/photos/`
 * et les images de `src/content/farms/<id>/schemas/` sont récupérées
 * automatiquement. Les images sont optimisées par Astro ; les vidéos sont
 * servies telles quelles (importées en tant qu'URL).
 *
 * Aucune déclaration manuelle : déposer un fichier suffit.
 */

// NB : les motifs de `import.meta.glob` doivent être des chaînes littérales.
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/farms/*/photos/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true },
);

const videoModules = import.meta.glob<string>(
  '/src/content/farms/*/photos/*.{mp4,webm,mov,m4v,ogv,MP4,WEBM,MOV,M4V,OGV}',
  { eager: true, query: '?url', import: 'default' },
);

const schemaModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/farms/*/schemas/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP,AVIF,GIF}',
  { eager: true },
);

export interface FarmImage {
  type: 'image';
  /** Métadonnées d'image (optimisée par Astro). */
  src: ImageMetadata;
  caption: string;
  filename: string;
}

export interface FarmVideo {
  type: 'video';
  /** URL du fichier vidéo (servi tel quel). */
  src: string;
  caption: string;
  filename: string;
}

export type FarmMedia = FarmImage | FarmVideo;

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

/** Extrait l'identifiant de ferme (nom du dossier) depuis un chemin de média. */
function farmIdFromPath(path: string): string {
  const match = path.match(/\/farms\/([^/]+)\//);
  return match ? match[1] : '';
}

function filenameOf(path: string): string {
  return path.split('/').pop() ?? path;
}

/** Images d'un dossier pour une ferme donnée. */
function collectImages(
  modules: Record<string, { default: ImageMetadata }>,
  farmId: string,
): FarmImage[] {
  return Object.entries(modules)
    .filter(([path]) => farmIdFromPath(path) === farmId)
    .map(([path, mod]) => ({
      type: 'image' as const,
      src: mod.default,
      caption: captionFromFilename(path),
      filename: filenameOf(path),
    }));
}

/** Vidéos d'un dossier pour une ferme donnée. */
function collectVideos(
  modules: Record<string, string>,
  farmId: string,
): FarmVideo[] {
  return Object.entries(modules)
    .filter(([path]) => farmIdFromPath(path) === farmId)
    .map(([path, url]) => ({
      type: 'video' as const,
      src: url,
      caption: captionFromFilename(path),
      filename: filenameOf(path),
    }));
}

/** Tri commun : ordre alphabétique (numérique) du nom de fichier. */
function byFilename(a: FarmMedia, b: FarmMedia): number {
  return a.filename.localeCompare(b.filename, 'fr', { numeric: true });
}

/**
 * Médias de la galerie photo d'une ferme (images + vidéos mélangées),
 * triés par nom de fichier.
 */
export function getPhotos(farmId: string): FarmMedia[] {
  return [
    ...collectImages(photoModules, farmId),
    ...collectVideos(videoModules, farmId),
  ].sort(byFilename);
}

/** Schémas d'une ferme (images uniquement), triés par nom de fichier. */
export function getSchemas(farmId: string): FarmImage[] {
  return collectImages(schemaModules, farmId).sort(byFilename);
}
