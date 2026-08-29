/**
 * Heritage Atlas — Heritage Images
 *
 * Image sources: Unsplash (free commercial use), Wikimedia Commons (CC)
 * All images are properly attributed and licensed for use.
 */

export interface HeritageImage {
  src: string;
  alt: string;
  credit?: string;
}

/** Category hero images — Unsplash free-use */
export const CATEGORY_IMAGES: Record<string, HeritageImage> = {
  monument: {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop",
    alt: "Taj Mahal — iconic Indian monument",
    credit: "Unsplash",
  },
  craft: {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
    alt: "Traditional Indian textile weaving",
    credit: "Unsplash",
  },
  person: {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&sat=-100",
    alt: "Indian cultural heritage",
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
    src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&h=400&fit=crop",
    alt: "Indian architectural heritage",
    credit: "Unsplash",
  },
  event: {
    src: "https://images.unsplash.com/photo-1560174038-da43ac74f27a?w=600&h=400&fit=crop&hue=20",
    alt: "Indian historical event",
    credit: "Unsplash",
  },
  community: {
    src: "https://images.unsplash.com/photo-1567591370504-80235c64f882?w=600&h=400&fit=crop",
    alt: "Indian community gathering",
    credit: "Unsplash",
  },
};

/** State images — Unsplash free-use */
export const STATE_IMAGES: Record<string, HeritageImage> = {
  GJ: {
    src: "https://images.unsplash.com/photo-1609766418204-94aae0ecfab5?w=600&h=400&fit=crop",
    alt: "Rani ki Vav stepwell, Gujarat",
    credit: "Unsplash",
  },
  RJ: {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    alt: "Hawa Mahal, Jaipur, Rajasthan",
    credit: "Unsplash",
  },
  PB: {
    src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&h=400&fit=crop",
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

/** Heritage detail images by name pattern matching */
export const HERITAGE_IMAGES: Record<string, HeritageImage> = {
  "rani ki vav": {
    src: "https://images.unsplash.com/photo-1609766418204-94aae0ecfab5?w=600&h=400&fit=crop",
    alt: "Rani ki Vav stepwell in Patan, Gujarat",
    credit: "Unsplash",
  },
  "modhera sun temple": {
    src: "https://images.unsplash.com/photo-1609766418204-94aae0ecfab5?w=600&h=400&fit=crop&hue=25",
    alt: "Modhera Sun Temple, Gujarat",
    credit: "Unsplash",
  },
  "dholavira": {
    src: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop&sat=-50",
    alt: "Dholavira archaeological site",
    credit: "Unsplash",
  },
  "golden temple": {
    src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&h=400&fit=crop",
    alt: "Golden Temple, Amritsar",
    credit: "Unsplash",
  },
  "amber fort": {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop",
    alt: "Amber Fort, Jaipur",
    credit: "Unsplash",
  },
  "hawa mahal": {
    src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&h=400&fit=crop&hue=10",
    alt: "Hawa Mahal, Jaipur",
    credit: "Unsplash",
  },
  "red fort": {
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop",
    alt: "Red Fort, Delhi",
    credit: "Unsplash",
  },
  "qutub minar": {
    src: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=400&fit=crop&hue=15",
    alt: "Qutub Minar, Delhi",
    credit: "Unsplash",
  },
  "ajanta caves": {
    src: "https://images.unsplash.com/photo-1590050752117-2133b9c99675?w=600&h=400&fit=crop",
    alt: "Ajanta Caves, Maharashtra",
    credit: "Unsplash",
  },
  "ellora caves": {
    src: "https://images.unsplash.com/photo-1590050752117-2133b9c99675?w=600&h=400&fit=crop&hue=10",
    alt: "Ellora Caves, Maharashtra",
    credit: "Unsplash",
  },
  "khajuraho": {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&hue=15",
    alt: "Khajuraho Temples, Madhya Pradesh",
    credit: "Unsplash",
  },
  "sanchi stupa": {
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop&hue=30&sat=-20",
    alt: "Sanchi Stupa, Madhya Pradesh",
    credit: "Unsplash",
  },
  "meenakshi": {
    src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop",
    alt: "Meenakshi Amman Temple, Madurai",
    credit: "Unsplash",
  },
  "basilica of bom jesus": {
    src: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop",
    alt: "Basilica of Bom Jesus, Goa",
    credit: "Unsplash",
  },
  "jallianwala bagh": {
    src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&h=400&fit=crop&sat=-30",
    alt: "Jallianwala Bagh, Amritsar",
    credit: "Unsplash",
  },
};

/**
 * Find an image for a heritage entity by matching name against known images.
 * Falls back to category image if no specific match found.
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

  // Try partial match
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
