/**
 * Géométrie de Cuba + projection partagée.
 * -----------------------------------------
 * Le contour ci-dessous est une silhouette simplifiée de l'île principale de
 * Cuba (couples [longitude, latitude]). Il correspond à l'esthétique demandée :
 * illustration vectorielle, peu de détails, contours épais.
 *
 * Point clé : le contour ET les marqueurs des fermes sont projetés par la MÊME
 * fonction (`buildProjection`). Un marqueur placé aux coordonnées GPS d'une
 * ferme tombe donc toujours au bon endroit sur la silhouette dessinée, quelle
 * que soit la simplification du contour.
 */

/** Contour de Cuba : liste de [lon, lat]. */
export const CUBA_OUTLINE: [number, number][] = [
  [-82.268151, 23.188611], [-81.404457, 23.117271], [-80.618769, 23.10598],
  [-79.679524, 22.765303], [-79.281486, 22.399202], [-78.347434, 22.512166],
  [-77.993296, 22.277194], [-77.146422, 21.657851], [-76.523825, 21.20682],
  [-76.19462, 21.220565], [-75.598222, 21.016624], [-75.67106, 20.735091],
  [-74.933896, 20.693905], [-74.178025, 20.284628], [-74.296648, 20.050379],
  [-74.961595, 19.923435], [-75.63468, 19.873774], [-76.323656, 19.952891],
  [-77.755481, 19.855481], [-77.085108, 20.413354], [-77.492655, 20.673105],
  [-78.137292, 20.739949], [-78.482827, 21.028613], [-78.719867, 21.598114],
  [-79.285, 21.559175], [-80.217475, 21.827324], [-80.517535, 22.037079],
  [-81.820943, 22.192057], [-82.169992, 22.387109], [-81.795002, 22.636965],
  [-82.775898, 22.68815], [-83.494459, 22.168518], [-83.9088, 22.154565],
  [-84.052151, 21.910575], [-84.54703, 21.801228], [-84.974911, 21.896028],
  [-84.447062, 22.20495], [-84.230357, 22.565755], [-83.77824, 22.788118],
  [-83.267548, 22.983042], [-82.510436, 23.078747], [-82.268151, 23.188611],
];

export interface ProjectionResult {
  /** Projette un couple GPS (lon, lat) vers des coordonnées SVG (x, y). */
  project: (lon: number, lat: number) => { x: number; y: number };
  /** Chaîne `d` du <path> du contour, prête à l'emploi. */
  outlinePath: string;
  width: number;
  height: number;
}

export interface ProjectionOptions {
  /** Largeur de la zone de dessin (unités du viewBox). */
  width?: number;
  /** Marge intérieure autour de la silhouette. */
  padding?: number;
}

/**
 * Construit une projection équirectangulaire (avec correction du méridien par
 * cos(latitude moyenne)) qui ajuste la silhouette de Cuba dans une zone donnée.
 * La hauteur du viewBox est déduite du ratio réel de l'île.
 */
export function buildProjection(options: ProjectionOptions = {}): ProjectionResult {
  const width = options.width ?? 1000;
  const padding = options.padding ?? 48;

  const lats = CUBA_OUTLINE.map(([, lat]) => lat);
  const meanLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const cosLat = Math.cos((meanLat * Math.PI) / 180);

  // Coordonnées « brutes » : x proportionnel à lon*cos(lat), y inversé (nord en haut).
  const raw = CUBA_OUTLINE.map(([lon, lat]) => ({ x: lon * cosLat, y: -lat }));
  const minX = Math.min(...raw.map((p) => p.x));
  const maxX = Math.max(...raw.map((p) => p.x));
  const minY = Math.min(...raw.map((p) => p.y));
  const maxY = Math.max(...raw.map((p) => p.y));

  const rawW = maxX - minX;
  const rawH = maxY - minY;

  const innerW = width - padding * 2;
  const scale = innerW / rawW;
  const height = rawH * scale + padding * 2;

  const project = (lon: number, lat: number) => ({
    x: padding + (lon * cosLat - minX) * scale,
    y: padding + (-lat - minY) * scale,
  });

  const outlinePath =
    CUBA_OUTLINE.map(([lon, lat], i) => {
      const { x, y } = project(lon, lat);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(' ') + ' Z';

  return { project, outlinePath, width, height };
}
