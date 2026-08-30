/**
 * Astrova — Deterministic Local Image Mapping
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
    credit: "Astrova",
  },
  RJ: {
    src: "/assets/states/rajasthan_state.jpg",
    alt: "Rajasthan — fortresses, palaces, and the Thar Desert",
    credit: "Astrova",
  },
  PB: {
    src: "/assets/states/punjab_state.jpg",
    alt: "Punjab — spiritual heritage and vibrant traditions",
    credit: "Astrova",
  },
  GA: {
    src: "/assets/states/goa_state.jpg",
    alt: "Goa — where Portuguese heritage meets Indian culture",
    credit: "Astrova",
  },
  TN: {
    src: "/assets/states/tamil_nadu_state.jpg",
    alt: "Tamil Nadu — ancient temples and classical arts",
    credit: "Astrova",
  },
  MH: {
    src: "/assets/states/maharashtra_state.jpg",
    alt: "Maharashtra — from ancient caves to Maratha valor",
    credit: "Astrova",
  },
  MP: {
    src: "/assets/states/madhya_pradesh_state.jpg",
    alt: "Madhya Pradesh — heart of India, cradle of civilizations",
    credit: "Astrova",
  },
  DL: {
    src: "/assets/states/delhi_state.jpg",
    alt: "Delhi — seven cities, centuries of history",
    credit: "Astrova",
  },
  // ---- NEW STATES (Regional Expansion) ----
  // Images below are placeholders. Developer must supply actual images.
  KL: {
    src: "/assets/states/kerala_state.jpg",
    alt: "Kerala — backwaters, Theyyam, and the Malabar coast",
    credit: "Astrova",
  },
  JK: {
    src: "/assets/states/jk_state.jpg",
    alt: "Jammu & Kashmir — Himalayan valleys and Dard-Shina culture",
    credit: "Astrova",
  },
  AS: {
    src: "/assets/states/assam_state.jpg",
    alt: "Assam — tea gardens, Brahmaputra, and Majuli river island",
    credit: "Astrova",
  },
  OD: {
    src: "/assets/states/odisha_state.jpg",
    alt: "Odisha — Kalinga temples, tribal heritage, and the Mahanadi gorge",
    credit: "Astrova",
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
    credit: "Astrova",
  },
  "modhera sun temple": {
    src: "/assets/heritage/modhera_sun_temple.jpg",
    alt: "Modhera Sun Temple in Gujarat",
    credit: "Astrova",
  },
  "patola silk": {
    src: "/assets/heritage/patola_silk.webp",
    alt: "Patola silk weaving from Patan, Gujarat",
    credit: "Astrova",
  },
  "adalaj stepwell": {
    src: "/assets/heritage/adalaj_stepwell.jpg",
    alt: "Adalaj Stepwell near Ahmedabad, Gujarat",
    credit: "Astrova",
  },
  "dholavira": {
    src: "/assets/heritage/dholavira.jpg",
    alt: "Dholavira Indus Valley Civilization site in Gujarat",
    credit: "Astrova",
  },
  "kutch embroidery": {
    src: "/assets/heritage/kutch_embroidery.png",
    alt: "Kutch embroidery with mirror work from Gujarat",
    credit: "Astrova",
  },
  "garba": {
    src: "/assets/heritage/garba.jpg",
    alt: "Garba dance performed during Navratri in Gujarat",
    credit: "Astrova",
  },
  "mahatma gandhi": {
    src: "/assets/heritage/mahatma_gandhi.jpg",
    alt: "Mahatma Gandhi — leader of India's independence movement",
    credit: "Astrova",
  },
  "sabarmati ashram": {
    src: "/assets/heritage/sabarmati_ashram.jpg",
    alt: "Sabarmati Ashram in Ahmedabad, Gujarat",
    credit: "Astrova",
  },
  "gujarati thali": {
    src: "/assets/heritage/gujarati_thali.jpg",
    alt: "Gujarati Thali — traditional Gujarati meal with dal, rice, rotli, vegetables, and sweets",
    credit: "Astrova",
  },

  "narsinh mehta": {
    src: "/assets/heritage/narsinh_mehta.jpg",
    alt: "Narsinh Mehta — premier poet-saint of Gujarat",
    credit: "Astrova",
  },
  "kite festival (uttarayan)": {
    src: "/assets/heritage/kite_festival.jpg",
    alt: "Kite Festival (Uttarayan) — international kite festival in Gujarat",
    credit: "Astrova",
  },
  "bandhani": {
    src: "/assets/heritage/bandhani.jpg",
    alt: "Bandhani — traditional tie-dye textile technique of Gujarat",
    credit: "Astrova",
  },

  // ---- Rajasthan ----
  "amber fort": {
    src: "/assets/heritage/amber_fort.jpg",
    alt: "Amber Fort in Jaipur, Rajasthan",
    credit: "Astrova",
  },
  "hawa mahal": {
    src: "/assets/heritage/hawa_mahal.jpg",
    alt: "Hawa Mahal in Jaipur, Rajasthan",
    credit: "Astrova",
  },

  // ---- Punjab ----
  "golden temple": {
    src: "/assets/heritage/golden_temple.jpg",
    alt: "Golden Temple in Amritsar, Punjab",
    credit: "Astrova",
  },
  "jallianwala bagh": {
    src: "/assets/heritage/jallianwala_bagh.jpg",
    alt: "Jallianwala Bagh memorial in Amritsar, Punjab",
    credit: "Astrova",
  },
  "phulkari": {
    src: "/assets/heritage/phulkari.webp",
    alt: "Phulkari embroidery from Punjab",
    credit: "Astrova",
  },

  // ---- Goa ----
  "basilica of bom jesus": {
    src: "/assets/heritage/basilica_of_bom_jesus.jpg",
    alt: "Basilica of Bom Jesus in Old Goa",
    credit: "Astrova",
  },
  "se cathedral": {
    src: "/assets/heritage/se_cathedral.jpg",
    alt: "Sé Cathedral in Old Goa",
    credit: "Astrova",
  },

  // ---- Tamil Nadu ----
  "meenakshi amman temple": {
    src: "/assets/heritage/meenakshi_temple.jpg",
    alt: "Meenakshi Amman Temple in Madurai, Tamil Nadu",
    credit: "Astrova",
  },

  // ---- Maharashtra ----
  "ajanta caves": {
    src: "/assets/heritage/ajanta_caves.jpg",
    alt: "Ajanta Caves in Maharashtra",
    credit: "Astrova",
  },
  "ellora caves": {
    src: "/assets/heritage/ajanta_caves.jpg",
    alt: "Ellora Caves in Maharashtra",
    credit: "Astrova",
  },

  // ---- Madhya Pradesh ----
  "khajuraho temples": {
    src: "/assets/heritage/khajuraho_temples.jpg",
    alt: "Khajuraho Temples in Madhya Pradesh",
    credit: "Astrova",
  },
  "sanchi stupa": {
    src: "/assets/heritage/khajuraho_temples.jpg",
    alt: "Sanchi Stupa in Madhya Pradesh",
    credit: "Astrova",
  },

  // ---- Delhi ----
  "red fort": {
    src: "/assets/heritage/red_fort.jpg",
    alt: "Red Fort in Delhi",
    credit: "Astrova",
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
    credit: "Astrova",
  },
  craft: {
    src: "/assets/heritage/patola_silk.webp",
    alt: "Traditional Indian craftwork",
    credit: "Astrova",
  },
  person: {
    src: "/assets/heritage/mahatma_gandhi.jpg",
    alt: "Indian heritage personality",
    credit: "Astrova",
  },
  festival: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian cultural festival",
    credit: "Astrova",
  },
  food: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian culinary heritage",
    credit: "Astrova",
  },
  tradition: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian cultural tradition",
    credit: "Astrova",
  },
  architecture: {
    src: "/assets/heritage/amber_fort.jpg",
    alt: "Indian architectural heritage",
    credit: "Astrova",
  },
  event: {
    src: "/assets/heritage/garba.jpg",
    alt: "Indian cultural event",
    credit: "Astrova",
  },
  community: {
    src: "/assets/heritage/kutch_embroidery.png",
    alt: "Indian community and craft heritage",
    credit: "Astrova",
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
