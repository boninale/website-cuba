import { getCollection, type CollectionEntry } from 'astro:content';

export type FarmEntry = CollectionEntry<'farms'>;

/**
 * Récupère toutes les fermes, triées selon l'ordre du parcours.
 * Ordre : champ `order` du front-matter si présent, sinon ordre alphabétique
 * de l'identifiant. Ce tri définit aussi le chemin tracé sur la carte et la
 * navigation « précédente / suivante ».
 */
export async function getFarms(): Promise<FarmEntry[]> {
  const farms = await getCollection('farms');
  return farms.sort((a, b) => {
    const oa = a.data.order ?? Number.POSITIVE_INFINITY;
    const ob = b.data.order ?? Number.POSITIVE_INFINITY;
    if (oa !== ob) return oa - ob;
    return a.data.id.localeCompare(b.data.id, 'fr');
  });
}

/** Identifiant stable utilisé pour les URLs (`/fermes/<slug>`). */
export function farmSlug(farm: FarmEntry): string {
  return farm.data.id;
}

/** URL de la fiche d'une ferme. */
export function farmUrl(farm: FarmEntry): string {
  return `/fermes/${farmSlug(farm)}/`;
}

/** Renvoie les fermes précédente et suivante dans le parcours. */
export function getNeighbours(farms: FarmEntry[], currentId: string) {
  const index = farms.findIndex((f) => f.data.id === currentId);
  return {
    prev: index > 0 ? farms[index - 1] : null,
    next: index >= 0 && index < farms.length - 1 ? farms[index + 1] : null,
  };
}
