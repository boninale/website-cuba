import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection « farms »
 * ---------------------
 * Chaque ferme est un dossier dans `src/content/farms/<id>/` contenant un
 * fichier `farm.md`. Le loader `glob` découvre automatiquement toutes les
 * fermes : ajouter une ferme = ajouter un dossier, aucune modification de code.
 *
 * Le schéma valide le front-matter attendu (voir farm.md d'exemple).
 */
const farms = defineCollection({
  loader: glob({ pattern: '*/farm.md', base: './src/content/farms' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    location: z.string().optional(),
    // Coordonnées GPS : servent au placement automatique du marqueur sur la carte.
    lat: z.coerce.number(),
    lon: z.coerce.number(),
    summary: z.string().default(''),
    // Ordre optionnel dans le parcours (le chemin reliant les fermes suit cet ordre,
    // à défaut l'ordre alphabétique de l'id).
    order: z.coerce.number().optional(),
  }),
});

export const collections = { farms };
