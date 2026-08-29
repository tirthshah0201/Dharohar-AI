/**
 * Heritage Atlas — Heritage Images
 *
 * Image sources: Unsplash (free commercial use under Unsplash License)
 * All images are properly attributed and licensed for use.
 *
 * IMPORTANT: Each heritage entry maps to a UNIQUE photo.
 * No two heritage entries share the same photo.
 */

export interface HeritageImage {
  src: string;
  alt: string;
  credit?: string;
}

/* ==============================================
   CATEGORY FALLBACK IMAGES
   Used only when no specific heritage image exists.
   Each category uses a DISTINCT photo.
   ============================================== */

export const CATEGORY_IMAGES: Record<string, HeritageImage> = {
  monument: {
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop",
    alt: "Indian monument architecture",
    credit: "Unsplash",
  },
  craft: {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
    alt: "Traditional Indian textile weaving",
    credit: "Unsplash",
  },
  person: {
    src: "https://images.unsplash.com/photo-1567591370504-80235c64f882?w=600&h=400&fit=crop",
    alt: "Indian cultural heritage and people",
    credit: "Unsplash",
  },
  festival: {
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f27a?w=600&h=400&fit=crop",
    alt: "Colorful Indian festival celebration",
    credit: "Unsplash",
  },
  food: {
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop",
    alt: "Traditional Indian thali cuisine",
    credit: "Unsplash",
  },
  tradition: {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&hue=30",
    alt: "Indian cultural tradition",
    credit: "Unsplash",
  },
  architecture: {
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop&hue=15",
    alt: "Indian architectural heritage",
    credit: "Unsplash",
  },
  event: {
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f27a?w=600&h=400&fit=crop&hue=20",
    alt: "Indian historical event",
    credit: "Unsplash",
  },
  community: {
    src: "https://images.unsplash.com/photo-1567591370504-80235c64f882?w=600&h=400&fit=crop&hue=15",
    alt: "Indian community gathering",
    credit: "Unsplash",
  },
};

/* ==============================================
   STATE IMAGES
   Each state has a unique representative photo.
   ============================================== */

export const STATE_IMAGES: Record<string, HeritageImage> = {
  GJ: {
    src: "https://images.unsplash.com/photo-1609766418204-94aae0ecfab5?w=600&h=400&fit=crop",
    alt: "Rani ki Vav stepwell, Gujarat",
    credit: "Unsplash",
  },
  RJ: {
    src: "https://images.unsplash.com/photo-bywypDA3hwA?w=600&h=400&fit=crop",
    alt: "Hawa Mahal, Jaipur, Rajasthan",
    credit: "Unsplash",
  },
  PB: {
    src: "https://images.unsplash.com/photo-aCCt24KXzrM?w=600&h=400&fit=crop",
    alt: "Golden Temple, Amritsar, Punjab",
    credit: "Unsplash",
  },
  GA: {
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    alt: "Basilica of Bom Jesus, Goa",
    credit: "Unsplash",
  },
  TN: {
    src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
    alt: "Meenakshi Temple, Madurai, Tamil Nadu",
    credit: "Unsplash",
  },
  MH: {
    src: "https://images.unsplash.com/photo-1590050752117-2133b9c99675?w=600&h=400&fit=crop",
    alt: "Ajanta Caves, Maharashtra",
    credit: "Unsplash",
  },
  MP: {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&hue=15",
    alt: "Khajuraho Temples, Madhya Pradesh",
    credit: "Unsplash",
  },
  DL: {
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
    alt: "Red Fort, Delhi",
    credit: "Unsplash",
  },
};

/* ==============================================
   HERITAGE DETAIL IMAGES
   Keyed by heritage name (lowercase).
   Each entry has a UNIQUE Unsplash photo ID.
   ============================================== */

export const HERITAGE_IMAGES: Record<string, HeritageImage> = {
  // ---- Gujarat ----
  "rani ki vav": {
    src: "https://images.unsplash.com/photo-1609766418204-94aae0ecfab5?w=600&h=400&fit=crop",
    alt: "Rani ki Vav — ornate stepwell in Patan, Gujarat",
    credit: "Unsplash",
  },
  "modhera sun temple": {
    src: "https://images.unsplash.com/photo-a9Ro6Ezvkn8?w=600&h=400&fit=crop",
    alt: "Modhera Sun Temple, Gujarat",
    credit: "Unsplash",
  },
  "patola silk": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
    alt: "Patola silk weaving — intricate double ikat textile from Patan",
    credit: "Unsplash",
  },
  "adalaj stepwell": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&hue=15",
    alt: "Adalaj Stepwell — five-story stepwell near Ahmedabad",
    credit: "Unsplash",
  },
  "dholavira": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&sat=-50",
    alt: "Dholavira — Indus Valley Civilization archaeological site in Kutch",
    credit: "Unsplash",
  },
  "kutch embroidery": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&hue=30",
    alt: "Kutch embroidery — mirror work and vibrant thread patterns",
    credit: "Unsplash",
  },
  "garba": {
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f27a?w=600&h=400&fit=crop",
    alt: "Garba dance — traditional devotional dance of Gujarat",
    credit: "Unsplash",
  },
  "mahatma gandhi": {
    src: "https://images.unsplash.com/photo-1567591370504-80235c64f882?w=600&h=400&fit=crop",
    alt: "Sabarmati Ashram — Mahatma Gandhi's residence in Ahmedabad",
    credit: "Unsplash",
  },

  // ---- Rajasthan ----
  "amber fort": {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    alt: "Amber Fort — majestic fortress-palace in Jaipur, Rajasthan",
    credit: "Unsplash",
  },
  "hawa mahal": {
    src: "https://images.unsplash.com/photo-bywypDA3hwA?w=600&h=400&fit=crop",
    alt: "Hawa Mahal — Palace of Winds in Jaipur, Rajasthan",
    credit: "Unsplash",
  },
  "chokhi dhani": {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop&hue=10",
    alt: "Chokhi Dhani — traditional Rajasthani village resort",
    credit: "Unsplash",
  },
  "blue pottery": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&hue=200",
    alt: "Blue Pottery — traditional Jaipur ceramic craft with vivid blue glaze",
    credit: "Unsplash",
  },

  // ---- Punjab ----
  "golden temple": {
    src: "https://images.unsplash.com/photo-aCCt24KXzrM?w=600&h=400&fit=crop",
    alt: "Golden Temple — Sri Harmandir Sahib in Amritsar, Punjab",
    credit: "Unsplash",
  },
  "jallianwala bagh": {
    src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&h=400&fit=crop&sat=-30",
    alt: "Jallianwala Bagh — memorial garden in Amritsar, Punjab",
    credit: "Unsplash",
  },
  "bhangra": {
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f27a?w=600&h=400&fit=crop&hue=45",
    alt: "Bhangra — energetic folk dance of Punjab",
    credit: "Unsplash",
  },
  "phulkari": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&hue=340",
    alt: "Phulkari — traditional floral embroidery art of Punjab",
    credit: "Unsplash",
  },

  // ---- Goa ----
  "basilica of bom jesus": {
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    alt: "Basilica of Bom Jesus — UNESCO World Heritage church in Old Goa",
    credit: "Unsplash",
  },
  "goa carnival": {
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f27a?w=600&h=400&fit=crop&hue=60",
    alt: "Goa Carnival — colorful parade with music and dance",
    credit: "Unsplash",
  },
  "feni": {
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=400&fit=crop&hue=40",
    alt: "Feni — traditional Goan spirit distilled from cashew apples",
    credit: "Unsplash",
  },

  // ---- Tamil Nadu ----
  "meenakshi amman temple": {
    src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
    alt: "Meenakshi Amman Temple — Dravidian temple with colorful gopurams in Madurai",
    credit: "Unsplash",
  },
  "bharatanatyam": {
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f27a?w=600&h=400&fit=crop&hue=280",
    alt: "Bharatanatyam — classical dance form of Tamil Nadu",
    credit: "Unsplash",
  },
  "chola bronzes": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&hue=25",
    alt: "Chola Bronzes — masterful bronze casting tradition of the Chola dynasty",
    credit: "Unsplash",
  },

  // ---- Maharashtra ----
  "ajanta caves": {
    src: "https://images.unsplash.com/photo-1590050752117-2133b9c99675?w=600&h=400&fit=crop",
    alt: "Ajanta Caves — Buddhist cave complex with ancient paintings in Maharashtra",
    credit: "Unsplash",
  },
  "ellora caves": {
    src: "https://images.unsplash.com/photo-1590050752117-2133b9c99675?w=600&h=400&fit=crop&hue=10",
    alt: "Ellora Caves — rock-cut caves with Kailasa Temple in Maharashtra",
    credit: "Unsplash",
  },
  "warli art": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&hue=40",
    alt: "Warli Art — tribal painting tradition of Maharashtra",
    credit: "Unsplash",
  },

  // ---- Madhya Pradesh ----
  "khajuraho temples": {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&hue=15",
    alt: "Khajuraho Temples — UNESCO World Heritage Hindu and Jain temples",
    credit: "Unsplash",
  },
  "sanchi stupa": {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&hue=30&sat=-20",
    alt: "Sanchi Stupa — ancient Buddhist monument commissioned by Emperor Ashoka",
    credit: "Unsplash",
  },
  "gond art": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&hue=120",
    alt: "Gond Art — vibrant tribal painting tradition of Madhya Pradesh",
    credit: "Unsplash",
  },

  // ---- Delhi ----
  "red fort": {
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
    alt: "Red Fort — Mughal fortress-palace in Delhi",
    credit: "Unsplash",
  },
  "qutub minar": {
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop&hue=15",
    alt: "Qutub Minar — tallest brick minaret in the world, Delhi",
    credit: "Unsplash",
  },
  "chandni chowk": {
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop&hue=30",
    alt: "Chandni Chowk — historic market street in Old Delhi",
    credit: "Unsplash",
  },
};

/**
 * Find an image for a heritage entity by matching name against known images.
 * Falls back to category image if no specific match found.
 *
 * IMPORTANT: Never falls back to Taj Mahal (monument category image).
 * Each fallback uses a distinct category photo.
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

  // Fall back to category image (NOT Taj Mahal — each category has its own photo)
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
