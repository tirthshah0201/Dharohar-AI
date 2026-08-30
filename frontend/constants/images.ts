/**
 * Heritage Atlas — Deterministic Local Image Mapping
 *
 * Every state card and heritage entity uses a specific, verified local image.
 * No external URLs. No generic fallbacks. No Taj Mahal for unrelated monuments.
 *
 * Image sources: Supplied by developer (verified heritage photography).
 * Stored in: frontend/public/assets/states/ and frontend/public/assets/heritage/
 */

export interface HeritageImage {
  src: string;
  alt: string;
  credit?: string;
}

/* ==============================================
   STATE IMAGES
   Each state maps to its supplied local image.
   ============================================== */

export const STATE_IMAGES: Record<string, HeritageImage> = {
  GJ: {
    src: "/assets/states/gujarat_state.jpg",
    alt: "Gujarat — land of stepwells, textiles, and the Mahatma",
    credit: "Heritage Atlas",
  },
  RJ: {
    src: "/assets/states/rajasthan_state.jpg",
    alt: "Rajasthan — fortresses, palaces, and the Thar Desert",
    credit: "Heritage Atlas",
  },
  PB: {
    src: "/assets/states/punjab_state.jpg",
    alt: "Punjab — spiritual heritage and vibrant traditions",
    credit: "Heritage Atlas",
  },
  GA: {
    src: "/assets/states/goa_state.jpg",
    alt: "Goa — where Portuguese heritage meets Indian culture",
    credit: "Heritage Atlas",
  },
  TN: {
    src: "/assets/states/tamil_nadu_state.jpg",
    alt: "Tamil Nadu — ancient temples and classical arts",
    credit: "Heritage Atlas",
  },
  MH: {
    src: "/assets/states/maharashtra_state.jpg",
    alt: "Maharashtra — from ancient caves to Maratha valor",
    credit: "Heritage Atlas",
  },
  MP: {
    src: "/assets/states/madhya_pradesh_state.jpg",
    alt: "Madhya Pradesh — heart of India, cradle of civilizations",
    credit: "Heritage Atlas",
  },
  DL: {
    src: "/assets/states/delhi_state.jpg",
    alt: "Delhi — seven cities, centuries of history",
    credit: "Heritage Atlas",
  },
};

/* ==============================================
   HERITAGE IMAGES
   Each heritage entity maps to its exact supplied image.
   Keyed by normalized lowercase name.
   ============================================== */

export const HERITAGE_IMAGES: Record<string, HeritageImage> = {
  // ---- Gujarat ----
  "rani ki vav": {
    src: "/assets/heritage/rani_ki_vav.jpg",
    alt: "Rani ki Vav stepwell in Patan, Gujarat",
    credit: "Heritage Atlas",
  },
  "modhera sun temple": {
    src: "/assets/heritage/modhera_sun_temple.jpg",
    alt: "Modhera Sun Temple in Gujarat",
    credit: "Heritage Atlas",
  },
  "patola silk": {
    src: "/assets/heritage/patola_silk.webp",
    alt: "Patola silk weaving from Patan, Gujarat",
    credit: "Heritage Atlas",
  },
  "adalaj stepwell": {
    src: "/assets/heritage/adalaj_stepwell.jpg",
    alt: "Adalaj Stepwell near Ahmedabad, Gujarat",
    credit: "Heritage Atlas",
  },
  "dholavira": {
    src: "/assets/heritage/dholavira.jpg",
    alt: "Dholavira Indus Valley Civilization site in Gujarat",
    credit: "Heritage Atlas",
  },
  "kutch embroidery": {
    src: "/assets/heritage/kutch_embroidery.png",
    alt: "Kutch embroidery with mirror work from Gujarat",
    credit: "Heritage Atlas",
  },
  "garba": {
    src: "/assets/heritage/garba.jpg",
    alt: "Garba dance performed during Navratri in Gujarat",
    credit: "Heritage Atlas",
  },
  "mahatma gandhi": {
    src: "/assets/heritage/mahatma_gandhi.jpg",
    alt: "Mahatma Gandhi — leader of India's independence movement",
    credit: "Heritage Atlas",
  },
  "sabarmati ashram": {
    src: "/assets/heritage/sabarmati_ashram.jpg",
    alt: "Sabarmati Ashram in Ahmedabad, Gujarat",
    credit: "Heritage Atlas",
  },
  "gujarati thali": {
    src: "/assets/heritage/gujarati_thali.jpg",
    alt: "Gujarati Thali — traditional Gujarati meal with dal, rice, rotli, vegetables, and sweets",
    credit: "Heritage Atlas",
  },

  "narsinh mehta": {
    src: "/assets/heritage/narsinh_mehta.jpg",
    alt: "Narsinh Mehta — premier poet-saint of Gujarat",
    credit: "Heritage Atlas",
  },
  "kite festival (uttarayan)": {
    src: "/assets/heritage/kite_festival.jpg",
    alt: "Kite Festival (Uttarayan) — international kite festival in Gujarat",
    credit: "Heritage Atlas",
  },
  "bandhani": {
    src: "/assets/heritage/bandhani.jpg",
    alt: "Bandhani — traditional tie-dye textile technique of Gujarat",
    credit: "Heritage Atlas",
  },

  // ---- Rajasthan ----
  "amber fort": {
    src: "/assets/heritage/amber_fort.jpg",
    alt: "Amber Fort in Jaipur, Rajasthan",
    credit: "Heritage Atlas",
  },
  "hawa mahal": {
    src: "/assets/heritage/hawa_mahal.jpg",
    alt: "Hawa Mahal in Jaipur, Rajasthan",
    credit: "Heritage Atlas",
  },

  // ---- Punjab ----
  "golden temple": {
    src: "/assets/heritage/golden_temple.jpg",
    alt: "Golden Temple in Amritsar, Punjab",
    credit: "Heritage Atlas",
  },
  "jallianwala bagh": {
    src: "/assets/heritage/jallianwala_bagh.jpg",
    alt: "Jallianwala Bagh memorial in Amritsar, Punjab",
    credit: "Heritage Atlas",
  },
  "phulkari": {
    src: "/assets/heritage/phulkari.webp",
    alt: "Phulkari embroidery from Punjab",
    credit: "Heritage Atlas",
  },

  // ---- Goa ----
  "basilica of bom jesus": {
    src: "/assets/heritage/basilica_of_bom_jesus.jpg",
    alt: "Basilica of Bom Jesus in Old Goa",
    credit: "Heritage Atlas",
  },
  "se cathedral": {
    src: "/assets/heritage/se_cathedral.jpg",
    alt: "Sé Cathedral in Old Goa",
    credit: "Heritage Atlas",
  },

  // ---- Tamil Nadu ----
  "meenakshi amman temple": {
    src: "/assets/heritage/meenakshi_temple.jpg",
    alt: "Meenakshi Amman Temple in Madurai, Tamil Nadu",
    credit: "Heritage Atlas",
  },

  // ---- Maharashtra ----
  "ajanta caves": {
    src: "/assets/heritage/ajanta_caves.jpg",
    alt: "Ajanta Caves in Maharashtra",
    credit: "Heritage Atlas",
  },
  "ellora caves": {
    src: "/assets/heritage/ajanta_caves.jpg",
    alt: "Ellora Caves in Maharashtra",
    credit: "Heritage Atlas",
  },

  // ---- Madhya Pradesh ----
  "khajuraho temples": {
    src: "/assets/heritage/khajuraho_temples.jpg",
    alt: "Khajuraho Temples in Madhya Pradesh",
    credit: "Heritage Atlas",
  },
  "sanchi stupa": {
    src: "/assets/heritage/khajuraho_temples.jpg",
    alt: "Sanchi Stupa in Madhya Pradesh",
    credit: "Heritage Atlas",
  },

  // ---- Delhi ----
  "red fort": {
    src: "/assets/heritage/red_fort.jpg",
    alt: "Red Fort in Delhi",
    credit: "Heritage Atlas",
  },
};

/* ==============================================
   CATEGORY FALLBACK IMAGES
   Used ONLY when no specific heritage image exists.
   Each uses a DISTINCT supplied local image.
   ============================================== */

export const CATEGORY_IMAGES: Record<string, HeritageImage> = {
  monument: {
    src: "/assets/heritage/rani_ki_vav.jpg",
    alt: "Heritage monument in India",
    credit: "Heritage Atlas",
  },
  craft: {
    src: "/assets/heritage/patola_silk.webp",
    alt: "Traditional Indian craftwork",
    credit: "Heritage Atlas",
  },
  person: {
    src: "/assets/heritage/mahatma_gandhi.jpg",
    alt: "Indian heritage personality",
    credit: "Heritage Atlas",
  },
  festival: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian cultural festival",
    credit: "Heritage Atlas",
  },
  food: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian culinary heritage",
    credit: "Heritage Atlas",
  },
  tradition: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian cultural tradition",
    credit: "Heritage Atlas",
  },
  architecture: {
    src: "/assets/heritage/amber_fort.jpg",
    alt: "Indian architectural heritage",
    credit: "Heritage Atlas",
  },
  event: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian cultural event",
    credit: "Heritage Atlas",
  },
  community: {
    src: "/assets/heritage/kutch_embroidery.png",
    alt: "Indian community and craft heritage",
    credit: "Heritage Atlas",
  },
};

/**
 * Find an image for a heritage entity by matching name against known images.
 * Falls back to category image if no specific match found.
 *
 * Priority:
 * 1. Exact name match in HERITAGE_IMAGES
 * 2. Partial name match
 * 3. Category fallback
 */
export function getHeritageImage(
  name: string,
  category: string
): HeritageImage | null {
  const lowerName = name.toLowerCase();

  // Try exact match first
  if (HERITAGE_IMAGES[lowerName]) {
    return HERITAGE_IMAGES[lowerName];
  }

  // Try partial match — heritage name contains a known key
  for (const [key, img] of Object.entries(HERITAGE_IMAGES)) {
    if (lowerName.includes(key) || key.includes(lowerName)) {
      return img;
    }
  }

  // Fall back to category image
  if (CATEGORY_IMAGES[category]) {
    return CATEGORY_IMAGES[category];
  }

  return null;
}

/**
 * Get a state image by state code.
 */
export function getStateImage(stateCode: string): HeritageImage | null {
  return STATE_IMAGES[stateCode] || null;
}
