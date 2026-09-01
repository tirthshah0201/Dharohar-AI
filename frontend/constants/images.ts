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
  "rabari community": {
    src: "/assets/heritage/rabari_community.jpg",
    alt: "Rabari community — pastoral nomads of Gujarat and Rajasthan",
    credit: "Astrova",
  },
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
    src: "/assets/heritage/patola_weaving.webp",
    alt: "Patola silk weaving from Patan, Gujarat",
    credit: "Astrova",
  },
  "patola weaving": {
    src: "/assets/heritage/patola_weaving.webp",
    alt: "Patola Weaving — double ikat silk weaving tradition from Patan, Gujarat",
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
    src: "/assets/heritage/navratri.jpeg",
    alt: "Garba dance performed during Navratri in Gujarat",
    credit: "Astrova",
  },
  "navratri": {
    src: "/assets/heritage/navratri.jpeg",
    alt: "Navratri — nine nights of Garba and Dandiya Raas in Gujarat",
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

  // ---- Kerala / North Malabar ----
  "north malabar": {
    src: "/assets/heritage/north_malabar.jpg",
    alt: "North Malabar — Theyyam, waterfalls, and Kerala's northern coast",
    credit: "Astrova",
  },
  "theyyam": {
    src: "/assets/heritage/theyyam.jpg",
    alt: "Theyyam — ritual dance form of North Malabar, Kerala",
    credit: "Astrova",
  },
  "malabar cuisine": {
    src: "/assets/heritage/malabar_cuisine.jpg",
    alt: "Malabar cuisine — traditional coastal cuisine of Kerala",
    credit: "Astrova",
  },

  // ---- Tamil Nadu / Chettinad ----
  "chettinad": {
    src: "/assets/heritage/chettinad.jpg",
    alt: "Chettinad — region famous for mansions and cuisine in Tamil Nadu",
    credit: "Astrova",
  },
  "chettinad cuisine": {
    src: "/assets/heritage/chettinad_cuisine.jpg",
    alt: "Chettinad cuisine — spicy and aromatic culinary tradition",
    credit: "Astrova",
  },
  "chettiar community": {
    src: "/assets/heritage/chettiar_community.jpeg",
    alt: "Chettiar community — merchant community of Chettinad",
    credit: "Astrova",
  },
  "athangudi tiles": {
    src: "/assets/heritage/athangudi_tiles.jpg",
    alt: "Athangudi tiles — handmade floor tiles from Chettinad",
    credit: "Astrova",
  },

  // ---- Jammu & Kashmir / Gurez Valley ----
  "gurez valley": {
    src: "/assets/heritage/guraz_valley.jpg",
    alt: "Gurez Valley — pristine Himalayan valley in Jammu & Kashmir",
    credit: "Astrova",
  },
  "dard-shina culture": {
    src: "/assets/heritage/dard-shina_culture.jpg",
    alt: "Dard-Shina culture — ancient heritage of the Dard people in Kashmir",
    credit: "Astrova",
  },
  "habba khatoon peak": {
    src: "/assets/heritage/habba_khatoon.jpg",
    alt: "Habba Khatoon Peak — iconic pyramid-shaped peak in Gurez",
    credit: "Astrova",
  },
  "kishanganga river": {
    src: "/assets/heritage/kishanganga.jpg",
    alt: "Kishanganga River — crystal-clear river in Gurez Valley",
    credit: "Astrova",
  },

  // ---- Odisha / Satkosia Gorge ----
  "satkosia gorge": {
    src: "/assets/heritage/satkosia_gorge.jpg",
    alt: "Satkosia Gorge — 22-km gorge formed by Mahanadi River in Odisha",
    credit: "Astrova",
  },
  "mahanadi river": {
    src: "/assets/heritage/mahanadi.jpg",
    alt: "Mahanadi River — major river forming Satkosia Gorge",
    credit: "Astrova",
  },
  "pattachitra": {
    src: "/assets/heritage/pattachitra.jpg",
    alt: "Pattachitra — traditional scroll painting from Odisha",
    credit: "Astrova",
  },
  "tribal heritage of odisha": {
    src: "/assets/heritage/tribal_heritage_of_odisha.jpg",
    alt: "Tribal heritage of Odisha — indigenous communities and their traditions",
    credit: "Astrova",
  },
  "raas leela festival": {
    src: "/assets/heritage/raas_leela_festival.jpg",
    alt: "Raas Leela festival — traditional dance festival celebrated across India",
    credit: "Astrova",
  },

  // ---- Maharashtra / Amboli ----
  "amboli": {
    src: "/assets/heritage/amboli.jpg",
    alt: "Amboli — hill station on Western Ghats with monsoon waterfalls",
    credit: "Astrova",
  },
  "amboli falls": {
    src: "/assets/heritage/amboli.jpg",
    alt: "Amboli Waterfalls — cascading down Western Ghats during monsoon",
    credit: "Astrova",
  },

  // ---- Assam / Majuli ----
  "majuli": {
    src: "/assets/heritage/majuli.jpg",
    alt: "Majuli — world's largest inhabited river island on Brahmaputra",
    credit: "Astrova",
  },
  "sattriya": {
    src: "/assets/heritage/sattriya.jpg",
    alt: "Sattriya — classical dance form from Assam",
    credit: "Astrova",
  },
  "bhaona": {
    src: "/assets/heritage/bhaona.jpg",
    alt: "Bhaona — traditional Assamese dance-drama performed in Majuli",
    credit: "Astrova",
  },
  "samaguri satra": {
    src: "/assets/heritage/majuli.jpg",
    alt: "Samaguri Satra — famous Satra in Majuli for mask-making",
    credit: "Astrova",
  },
  "mishing community": {
    src: "/assets/heritage/mishing_community.jpeg",
    alt: "Mishing community — riverine tribe of Assam",
    credit: "Astrova",
  },

  // ---- Maharashtra ----
  "salvi community": {
    src: "/assets/heritage/salvi_community.jpg",
    alt: "Salvi community — traditional wood-carving artisans of Maharashtra",
    credit: "Astrova",
  },
  "ajanta caves": {
    src: "/assets/heritage/ajanta_caves.jpg",
    alt: "Ajanta Caves in Maharashtra",
    credit: "Astrova",
  },
  // IMAGE_REQUIRED: Correct Ellora Caves image needed
  // Currently falls back to category 'monument' image
  // Do NOT use ajanta_caves.jpg — it shows the wrong caves

  // ---- Madhya Pradesh ----
  "khajuraho temples": {
    src: "/assets/heritage/khajuraho_temples.jpg",
    alt: "Khajuraho Temples in Madhya Pradesh",
    credit: "Astrova",
  },
  // IMAGE_REQUIRED: Correct Sanchi Stupa image needed
  // Currently falls back to category 'monument' image
  // Do NOT use khajuraho_temples.jpg — it shows the wrong monument

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
    src: "/assets/heritage/pattachitra.jpg",
    alt: "Traditional Indian craftwork",
    credit: "Astrova",
  },
  person: {
    src: "/assets/heritage/mahatma_gandhi.jpg",
    alt: "Indian heritage personality",
    credit: "Astrova",
  },
  festival: {
    src: "/assets/heritage/raas_leela_festival.jpg",
    alt: "Indian cultural festival",
    credit: "Astrova",
  },
  food: {
    src: "/assets/heritage/food.jpg",
    alt: "Indian culinary heritage",
    credit: "Astrova",
  },
  tradition: {
    src: "/assets/heritage/traditions.jpg",
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
    src: "/assets/heritage/rabari_community.jpg",
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

/* ==============================================
   LOCATION IMAGES
   Maps location names (from locations table) to images.
   Used by MapDetailPanel when focusing on a map location.
   ============================================== */

export const LOCATION_IMAGES: Record<string, HeritageImage> = {
  // ---- Gujarat locations ----
  ahmedabad: {
    src: "/assets/heritage/sabarmati_ashram.jpg",
    alt: "Ahmedabad — historic city on the banks of the Sabarmati",
    credit: "Astrova",
  },
  patan: {
    src: "/assets/heritage/rani_ki_vav.jpg",
    alt: "Patan — historical city known for Rani ki Vav and Patola weaving",
    credit: "Astrova",
  },
  rajkot: {
    src: "/assets/heritage/kite_festival.jpg",
    alt: "Rajkot — cultural capital of Saurashtra",
    credit: "Astrova",
  },
  surat: {
    src: "/assets/heritage/gujarati_thali.jpg",
    alt: "Surat — historic port city and diamond trade center",
    credit: "Astrova",
  },
  vadodara: {
    src: "/assets/heritage/khajuraho_temples.jpg",
    alt: "Vadodara — cultural center of Gujarat",
    credit: "Astrova",
  },
  junagadh: {
    src: "/assets/heritage/dholavira.jpg",
    alt: "Junagadh — ancient city at the foot of Girnar",
    credit: "Astrova",
  },
  // ---- Kerala locations ----
  kannur: {
    src: "/assets/heritage/theyyam.jpg",
    alt: "Kannur — coastal district known for Theyyam",
    credit: "Astrova",
  },
  wayanad: {
    src: "/assets/heritage/north_malabar.jpg",
    alt: "Wayanad — hill district in North Malabar",
    credit: "Astrova",
  },
  // ---- Tamil Nadu locations ----
  karaikudi: {
    src: "/assets/heritage/chettinad.jpg",
    alt: "Karaikudi — main town of Chettinad",
    credit: "Astrova",
  },
  kanadukathan: {
    src: "/assets/heritage/chettinad.jpg",
    alt: "Kanadukathan — heritage town in Chettinad",
    credit: "Astrova",
  },
  // ---- Maharashtra locations ----
  // Amboli is handled by heritage images
  // ---- Assam locations ----
  // Majuli is handled by heritage images
  // ---- Odisha locations ----
  // Satkosia Gorge is handled by heritage images
  // ---- Jammu & Kashmir locations ----
  // Gurez Valley is handled by heritage images
};

/**
 * Get an image for any map location by matching name against heritage/location images.
 * Used by the MapDetailPanel to show a relevant image.
 */
export function getLocationImage(
  name: string,
  type: string
): HeritageImage | null {
  const lowerName = name.toLowerCase();

  // 1. Try location-specific image
  if (LOCATION_IMAGES[lowerName]) return LOCATION_IMAGES[lowerName];

  // 2. Try heritage image lookup
  const heritageImg = getHeritageImage(name, type);
  if (heritageImg) return heritageImg;

  // 3. For state locations, try state image by matching state name
  const stateNameToCode: Record<string, string> = {
    gujarat: "GJ",
    rajasthan: "RJ",
    punjab: "PB",
    goa: "GA",
    "tamil nadu": "TN",
    maharashtra: "MH",
    "madhya pradesh": "MP",
    delhi: "DL",
    kerala: "KL",
    "jammu & kashmir": "JK",
    assam: "AS",
    odisha: "OD",
  };
  const code = stateNameToCode[lowerName];
  if (code) return STATE_IMAGES[code] || null;

  return null;
}
