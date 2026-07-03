# Fermes agroécologiques de Cuba

Site web statique et interactif présentant les fermes visitées dans le cadre
d'un projet documentaire sur l'agroécologie à Cuba.

Construit avec [Astro](https://astro.build) : rendu 100 % statique côté client,
séparation stricte contenu / code, et **génération automatique** des pages,
marqueurs, menus et galeries à partir du contenu déposé.

## Démarrage

```bash
npm install     # installe les dépendances
npm run dev     # serveur de développement (http://localhost:4321)
npm run build   # génère le site statique dans dist/
npm run preview # prévisualise le build de production
```

Le dossier `dist/` produit est directement déployable sur **GitHub Pages**,
**Netlify** ou **Vercel** (aucun serveur requis).

## Ajouter une ferme (aucune modification de code)

1. Créer un dossier dans `src/content/farms/<identifiant>/`.
2. Y déposer un fichier `farm.md` (voir le gabarit ci-dessous).
3. Déposer les photographies dans `photos/`.
4. Déposer les schémas dans `schemas/`.

Au prochain démarrage / build, la ferme obtient automatiquement :

- sa page `/fermes/<identifiant>/` ;
- son marqueur sur la carte (placé d'après ses coordonnées GPS) ;
- son entrée dans le menu déroulant « Fiches techniques » ;
- ses galeries photos et schémas ;
- sa place dans le parcours (chemin sur la carte + navigation précédente/suivante).

### Gabarit `farm.md`

```markdown
---
id: finca-delicia          # identifiant unique (= nom du dossier)
name: Finca Delicia        # nom affiché
location: La Havane, Cuba  # localité (optionnel)
lat: 22.8189               # latitude GPS
lon: -81.0136              # longitude GPS
summary: Ferme importante de papaye   # résumé (survol carte, en-tête)
order: 1                   # position dans le parcours (optionnel)
---

# Finca Delicia

## Contexte
…

## Innovations
…
```

Les sections Markdown (Contexte, Innovations, …) sont restituées automatiquement
et mises en forme de façon identique entre les fermes. Le premier titre `# Nom`
est masqué à l'affichage car le nom figure déjà dans l'en-tête de la fiche.

## Images et légendes

- Toutes les images de `photos/` alimentent la **galerie photographique**
  (miniatures, défilement lent, plein écran, navigation clavier + tactile).
- Toutes les images de `schemas/` alimentent la galerie **« Schémas et
  illustrations »** (affichage plus grand, agrandissement au clic, sans
  défilement automatique).
- Tri : ordre alphabétique du nom de fichier.
- Les **légendes sont générées depuis le nom de fichier** :
  `culture-associee.jpg` → « Culture associee ».

L'architecture permet d'ajouter ultérieurement des métadonnées (légende,
crédits, texte alternatif) sans changer le fonctionnement principal.

## Logos partenaires

Déposer un logo (`.svg`, `.png`, …) dans `src/content/partners/` l'intègre
automatiquement au bandeau (bas-gauche / haut-droite) et au pied de page.
Préfixer par `01-`, `02-`… pour contrôler l'ordre. Les fichiers présents sont
des **exemples** à remplacer.

## Structure du projet

```text
src/
├── components/        # Header, Footer, CubaMap, Gallery, SchemaGallery, Lightbox, Icon
├── layouts/           # BaseLayout (structure HTML commune)
├── pages/             # index (accueil + carte), fermes/[id], projet, podcast
├── lib/               # chargement contenu (farms, images, partners), projection carte, config
├── styles/            # global.css (charte graphique)
└── content/
    ├── farms/         # une ferme = un dossier (farm.md + photos/ + schemas/)
    └── partners/      # logos partenaires
```

## Personnalisation

- **Charte graphique** : variables CSS en tête de `src/styles/global.css`
  (verts naturels, beiges, rouge terre, typographie Inter, icônes Lucide).
- **Titre / accroche du projet** : `src/lib/site.ts`.
- **Silhouette de Cuba** : `src/lib/cuba.ts` (contour + projection partagée qui
  garantit l'alignement automatique des marqueurs GPS sur la carte).
- **Déploiement sous-chemin** (ex. GitHub Pages `/repo`) : renseigner `site` et
  `base` dans `astro.config.mjs`.

## Accessibilité

Structure HTML sémantique, navigation clavier complète (menu, lightbox : ←/→/Échap),
textes alternatifs, focus visible, contrastes respectés, et prise en charge de
`prefers-reduced-motion` (désactivation des animations).
