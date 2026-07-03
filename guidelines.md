# Cahier des charges — Site web interactif des fermes agroécologiques de Cuba

## 1. Objectif du projet

Développer un site web statique, moderne, interactif et facilement maintenable présentant les fermes visitées dans le cadre d'un projet sur l'agroécologie à Cuba.

Le site doit servir de support pédagogique et de vitrine du projet tout en permettant une navigation intuitive entre les différentes fermes.

Le développement devra privilégier :

* une architecture simple ;
* un code facilement maintenable ;
* une séparation stricte entre le contenu et le code ;
* une génération automatique des pages ;
* une diffusion simple via un hébergement statique.

---

# 2. Stack technique

Le code a pour but d'être simple en s'appuyant au maximum sur des frameworks existants, et utiliser une stack légère et moderne.
Le site doit fonctionner entièrement côté client.

Commandes attendues :

```bash
npm install
npm run dev
npm run build
```

Le projet devra être directement déployable sur GitHub Pages, Netlify ou Vercel.

---

# 3. Philosophie générale

Le contenu est totalement indépendant du code.

L'ajout d'une nouvelle ferme doit uniquement nécessiter :

1. créer un nouveau dossier dans `content/farms/` ;
2. déposer un fichier `farm.md` ;
3. déposer les photographies ;
4. déposer les schémas.

Aucune modification du code ne doit être nécessaire.

---

# 4. Architecture générale

## Page d'accueil

La page d'accueil constitue le point d'entrée principal.

Elle comporte :

* Un bandeau principal comprenant : le titre du projet, les logos de partenaires, le menu de navigation;
* Un menu de navigation détaillé par la suite.
* La carte interactive occupant tout le reste de la page

---

## Carte interactive

La carte d'accueil doit être une carte interactive de Cuba, cohérente avec la charte graphique du projet. Si possible, avoir la forme seule du pays flottant dans la page d'acceuil, sans encadré autour, et stylisée.

Style recherché :

* illustration vectorielle ;
* couleurs naturelles ;
* contours épais ;
* design ludique ;
* peu de détails ;
* excellente lisibilité.

Chaque ferme est représentée par un marqueur interactif.

Au clic :

* ouverture de la fiche correspondante.

Au survol :

* affichage du nom de la ferme ;
* résumé issu du fichier Markdown.

La localisation des marqueurs est calculée automatiquement à partir des coordonnées GPS.
La carte affichera également un chemin reliant les fermes dans leur ordre.

---

## Navigation

Le site doit contenir dans le bandeau principal un menu de navigation contenant :

* Un onglet "Fiche Techniques" déroulant pour accéder aux différentes fermes ;
* Un bouton de retour vers l'acceuil "Acceuil".
* Un onglet "Notre projet" (a peupler par la suite)
* Un onglet "Podcas"t" (a peupler par la suite également)
* une navigation "Ferme précédente / suivante" sur chaque fiche ;


---

# 5. Fiches des fermes

Toutes les fermes utilisent exactement le même gabarit.

Chaque fiche comporte :

## En-tête

* nom de la ferme ;
* résumé ;
* bouton retour.

## Contenu

Le contenu est directement généré depuis le Markdown, qui aura une structure stable entre les fermes

Le site doit restituer automatiquement les sections qui seront les même entre les différentes fermes
---

## Galerie photographique

Toutes les images du dossier `photos/` sont automatiquement intégrées dans une galerie responsive.

Fonctionnalités :

* miniatures ;
* plein écran ;
* navigation clavier ;
* navigation tactile ;
* légendes générées automatiquement depuis les noms de fichiers.
* Défilement lent automatique 

---

## Schémas explicatifs

Toutes les images du dossier `schemas/` sont automatiquement affichées dans une galerie indépendante intitulée :

> Schémas et illustrations

Avec un affichage plus grand et sans défilement automatique mais un agrandissement possible.

---
## Navigation

En bas de page :

* ferme précédente ;
* retour à la carte ;
* ferme suivante.

---

# 6. Charte graphique

Palette :

* verts naturels ;
* beiges clairs;
* couleur rouge terre comme couleur d'accent ;
* couleurs peu saturées.

Typographie :

* Inter (préférée) ou équivalent.

Icônes :

* Lucide.

Animations :

* très discrètes ;
* transitions douces ;
* effets de survol légers.

---

# 7. Responsive

Le site doit être entièrement responsive :

* ordinateur ;
* tablette ;
* smartphone.

La carte reste pleinement utilisable sur mobile.

---

# 8. Accessibilité

Respecter les bonnes pratiques :

* contraste suffisant ;
* textes alternatifs ;
* navigation clavier ;
* structure HTML sémantique.

---

# 9. Structure du projet

```text
project/

├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   ├── assets/
│   └── content/
├── package.json
└── README.md
```

---

# 10. Structure des contenus

```text
content/

├── farms/
│
│   ├── finca-delicia/
│   │   ├── farm.md
│   │   ├── photos/
│   │   └── schemas/
│   │
│   ├── autre-ferme/
│   │   ├── farm.md
│   │   ├── photos/
│   │   └── schemas/
│   │
│   └── ...
│
├── partners/
│   ├── logo1.svg
│   ├── logo2.png
│   └── ...
│
└── homepage/
    ├── cuba.svg
    └── intro.md
```

---

# 11. Gestion automatique des contenus

Au démarrage du site :

Pour chaque dossier présent dans `content/farms/` :

* lecture du fichier `farm.md` ;
* création automatique de la page ;
* création automatique du marqueur ;
* ajout automatique au menu ;
* intégration automatique des photographies ;
* intégration automatique des schémas.

Aucune configuration supplémentaire.

---

# 12. Gestion des images

## Photos

Toutes les images présentes dans :

```text
photos/
```

sont automatiquement intégrées à la galerie.

Tri :

* ordre alphabétique.

---

## Schémas

Toutes les images présentes dans :

```text
schemas/
```

sont automatiquement intégrées à la galerie des schémas.

---

## Légendes

Pour cette première version, les légendes sont générées automatiquement à partir du nom du fichier.

Exemple :

```text
culture-associee.jpg
```

devient :

> Culture associee

L'architecture devra toutefois permettre ultérieurement l'ajout de métadonnées (légende, crédits, texte alternatif) sans modifier le fonctionnement principal.

---

# 13. Prototype attendu

La première version du projet doit comprendre :

* une page d'accueil entièrement fonctionnelle ;
* une carte interactive de Cuba ;
* les emplacements des logos partenaires (en bas à gauche et en haut à droite dans le bandeau de menu);
* Un bandeau principal comprenant : le titre du projet, les logos de partenaires, le menu de navigation;
* un menu de navigation comprenant : L'acceuil, un onglet fiche techniques déroulant pour accéder aux différentes fermes, un onglet notre projet (a peupler par la suite) et un onglet podcast (a peupler par la suite également) ;
* une page pour une première ferme d'exemple dont les données seront dans le dossier au début du projet
* une architecture complète permettant l'ajout automatique des futures fermes.

Le code devra être clair, modulaire, abondamment structuré et éviter toute complexité inutile.
