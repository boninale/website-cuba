/**
 * Géométrie de Cuba + projection partagée.
 * -----------------------------------------
 * Contour détaillé (île principale + Isla de la Juventud), principales villes
 * et routes (Carretera Central / Autopista Nacional, représentée de façon
 * stylisée). Le tout est dessiné dans l'esprit d'une illustration vectorielle :
 * couleurs naturelles, contours nets, bonne lisibilité, sans encadré.
 *
 * Point clé : le contour, les villes, les routes ET les marqueurs des fermes
 * sont projetés par la MÊME fonction (`buildProjection`). Tout reste donc
 * aligné automatiquement, quelles que soient les coordonnées GPS.
 */

/** Contours de Cuba : une liste de [lon, lat] par masse terrestre. */
export const CUBA_SHAPES: [number, number][][] = [
  [
    [-81.8375, 23.163], [-81.5754, 23.1165], [-81.2624, 23.1568], [-81.2716, 23.1286], [-81.1446, 23.0549], [-80.6501, 23.1031],
    [-80.5505, 23.0166], [-80.3649, 22.9434], [-80.0752, 22.9423], [-79.9599, 22.8769], [-79.8203, 22.887], [-79.8507, 22.8272],
    [-79.6767, 22.7431], [-79.5492, 22.5778], [-79.2757, 22.4076], [-78.6865, 22.3668], [-78.1431, 22.1094], [-77.865, 21.9006],
    [-77.6368, 21.7974], [-77.4971, 21.7883], [-77.5832, 21.8893], [-77.4973, 21.8716], [-77.2995, 21.7123], [-77.1441, 21.6436],
    [-77.1813, 21.5977], [-77.3662, 21.6126], [-77.2529, 21.4835], [-77.2079, 21.4789], [-77.0986, 21.589], [-76.8363, 21.3995],
    [-76.8674, 21.3304], [-76.7261, 21.3589], [-76.6474, 21.2845], [-76.2592, 21.2274], [-76.0736, 21.1334], [-75.7229, 21.111],
    [-75.5958, 20.9947], [-75.6629, 20.8981], [-75.5973, 20.8376], [-75.7402, 20.812], [-75.7604, 20.7755], [-75.7246, 20.7146],
    [-75.2133, 20.7139], [-74.8826, 20.6506], [-74.7321, 20.5732], [-74.5131, 20.3846], [-74.1675, 20.2922], [-74.1537, 20.1686],
    [-74.2528, 20.0797], [-74.6348, 20.0582], [-75.1164, 19.9014], [-75.1516, 20.0083], [-75.2905, 19.8931], [-75.552, 19.8911],
    [-75.7651, 19.9604], [-76.1584, 19.9897], [-77.7151, 19.8555], [-77.5538, 20.0821], [-77.1038, 20.4075], [-77.1079, 20.4917],
    [-77.2296, 20.6438], [-77.9973, 20.7154], [-78.1164, 20.7619], [-78.4908, 21.0537], [-78.5766, 21.4138], [-78.7277, 21.5927],
    [-78.8229, 21.6189], [-79.1892, 21.5528], [-79.3574, 21.5852], [-80.2313, 21.8722], [-80.4854, 22.1234], [-80.4991, 22.0635],
    [-81.0356, 22.0736], [-81.1167, 22.1342], [-81.1855, 22.268], [-81.2224, 22.1429], [-81.2844, 22.1094], [-81.3553, 22.1041],
    [-81.4411, 22.1838], [-81.8494, 22.2137], [-82.0777, 22.3877], [-81.7104, 22.4967], [-81.7027, 22.5919], [-81.8388, 22.6725],
    [-82.738, 22.6893], [-83.3796, 22.223], [-83.9007, 22.1701], [-84.031, 21.9431], [-84.2407, 21.8983], [-84.5026, 21.7762],
    [-84.5014, 21.9303], [-84.6269, 21.9204], [-84.8382, 21.8279], [-84.8872, 21.857], [-84.8772, 21.8941], [-84.3264, 22.0743],
    [-84.383, 22.2556], [-84.3613, 22.3789], [-84.0449, 22.666], [-83.2578, 22.9676], [-82.6658, 23.0436], [-82.3505, 23.154],
    [-82.1014, 23.1904],
  ],
  [
    [-82.5618, 21.5717], [-82.8532, 21.4439], [-82.9596, 21.4413], [-83.0673, 21.4694], [-83.1838, 21.5935], [-83.1802, 21.623],
    [-83.0549, 21.5494], [-82.9736, 21.5923], [-83.0825, 21.7914], [-82.9912, 21.9427], [-82.7146, 21.8903],
  ],
];

export interface City {
  name: string;
  lon: number;
  lat: number;
  /** Capitale : rendu légèrement plus marqué. */
  capital?: boolean;
  /** Place l'étiquette sous le point plutôt qu'au-dessus (évite les chevauchements). */
  labelBelow?: boolean;
}

/** Principales villes de Cuba (capitales de province + capitale nationale). */
export const CUBA_CITIES: City[] = [
  { name: 'La Havane', lon: -82.3666, lat: 23.1136, capital: true },
  { name: 'Pinar del Río', lon: -83.6981, lat: 22.4175, labelBelow: true },
  { name: 'Matanzas', lon: -81.5775, lat: 23.0411 },
  { name: 'Cienfuegos', lon: -80.4363, lat: 22.1461, labelBelow: true },
  { name: 'Santa Clara', lon: -79.964, lat: 22.4069 },
  { name: 'Sancti Spíritus', lon: -79.4425, lat: 21.9297, labelBelow: true },
  { name: 'Ciego de Ávila', lon: -78.7614, lat: 21.8404 },
  { name: 'Camagüey', lon: -77.9169, lat: 21.3808, labelBelow: true },
  { name: 'Las Tunas', lon: -76.951, lat: 20.9617 },
  { name: 'Holguín', lon: -76.2631, lat: 20.8872 },
  { name: 'Bayamo', lon: -76.6431, lat: 20.3797, labelBelow: true },
  { name: 'Santiago de Cuba', lon: -75.8219, lat: 20.0247, labelBelow: true },
  { name: 'Guantánamo', lon: -75.2092, lat: 20.1444 },
];

export interface Road {
  /** Épine principale (Carretera Central) ou bretelle secondaire. */
  kind: 'main' | 'spur';
  points: [number, number][];
}

/**
 * Réseau routier stylisé : l'axe principal traverse l'île d'ouest en est en
 * suivant les grandes villes, complété de quelques bretelles.
 */
export const CUBA_ROADS: Road[] = [
  {
    kind: 'main',
    points: [
      [-83.6981, 22.4175], // Pinar del Río
      [-82.3666, 23.1136], // La Havane
      [-81.5775, 23.0411], // Matanzas
      [-79.964, 22.4069], // Santa Clara
      [-79.4425, 21.9297], // Sancti Spíritus
      [-78.7614, 21.8404], // Ciego de Ávila
      [-77.9169, 21.3808], // Camagüey
      [-76.951, 20.9617], // Las Tunas
      [-76.6431, 20.3797], // Bayamo
      [-75.8219, 20.0247], // Santiago de Cuba
    ],
  },
  { kind: 'spur', points: [[-79.964, 22.4069], [-80.4363, 22.1461]] }, // Santa Clara – Cienfuegos
  { kind: 'spur', points: [[-76.951, 20.9617], [-76.2631, 20.8872]] }, // Las Tunas – Holguín
  { kind: 'spur', points: [[-75.8219, 20.0247], [-75.2092, 20.1444]] }, // Santiago – Guantánamo
];

export interface Point {
  x: number;
  y: number;
}

export interface ProjectionResult {
  /** Projette un couple GPS (lon, lat) vers des coordonnées SVG (x, y). */
  project: (lon: number, lat: number) => Point;
  /** Chaîne `d` du <path> des contours (toutes les masses terrestres). */
  outlinePath: string;
  width: number;
  height: number;
}

export interface ProjectionOptions {
  width?: number;
  padding?: number;
}

/**
 * Projection équirectangulaire (avec correction du méridien par la latitude
 * moyenne) ajustant la silhouette de Cuba dans une zone donnée. La hauteur du
 * viewBox est déduite du ratio réel de l'île.
 */
export function buildProjection(options: ProjectionOptions = {}): ProjectionResult {
  const width = options.width ?? 1000;
  const padding = options.padding ?? 44;

  const all = CUBA_SHAPES.flat();
  const lats = all.map(([, lat]) => lat);
  const meanLat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const cosLat = Math.cos((meanLat * Math.PI) / 180);

  const raw = all.map(([lon, lat]) => ({ x: lon * cosLat, y: -lat }));
  const minX = Math.min(...raw.map((p) => p.x));
  const maxX = Math.max(...raw.map((p) => p.x));
  const minY = Math.min(...raw.map((p) => p.y));
  const maxY = Math.max(...raw.map((p) => p.y));

  const innerW = width - padding * 2;
  const scale = innerW / (maxX - minX);
  const height = (maxY - minY) * scale + padding * 2;

  const project = (lon: number, lat: number): Point => ({
    x: padding + (lon * cosLat - minX) * scale,
    y: padding + (-lat - minY) * scale,
  });

  const outlinePath = CUBA_SHAPES.map((ring) =>
    ring
      .map(([lon, lat], i) => {
        const { x, y } = project(lon, lat);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(' ') + ' Z',
  ).join(' ');

  return { project, outlinePath, width, height };
}

/**
 * Chemin lissé (spline de Catmull-Rom convertie en courbes de Bézier) passant
 * par une suite de points projetés. Donne aux routes un tracé souple.
 */
export function smoothPath(pts: Point[]): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) return `M${pts[0].x},${pts[0].y}`;
  if (pts.length === 2) {
    return `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)} L${pts[1].x.toFixed(
      1,
    )},${pts[1].y.toFixed(1)}`;
  }
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(
      1,
    )} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}
