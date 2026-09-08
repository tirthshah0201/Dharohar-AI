export interface StateData {
  code: string;
  name: string;
  region: string;
  capital: string;
  tagline: string;
  highlights: string[];
  heritageCount: number;
  color: string;
  center: [number, number]; // [latitude, longitude] — Leaflet format
  zoom: number;
}

export const INDIAN_STATES: StateData[] = [
  {
    code: "GJ",
    name: "Gujarat",
    region: "West India",
    capital: "Gandhinagar",
    tagline: "Land of stepwells, textiles, and the Mahatma",
    highlights: ["Rani ki Vav", "Modhera Sun Temple", "Kutch Embroidery", "Sabarmati Ashram", "Patola Silk"],
    heritageCount: 8,
    color: "#C2703E",
    center: [22.3, 72.6],
    zoom: 7,
  },
  {
    code: "RJ",
    name: "Rajasthan",
    region: "Northwest India",
    capital: "Jaipur",
    tagline: "Fortresses, palaces, and the Thar Desert",
    highlights: ["Amber Fort", "Hawa Mahal", "Blue Pottery", "Mehrangarh Fort", "Pushkar Camel Fair"],
    heritageCount: 4,
    color: "#B8963E",
    center: [27.0, 74.2],
    zoom: 7,
  },
  {
    code: "PB",
    name: "Punjab",
    region: "North India",
    capital: "Chandigarh",
    tagline: "Spiritual heritage and vibrant traditions",
    highlights: ["Golden Temple", "Jallianwala Bagh", "Phulkari Embroidery", "Bhangra Dance", "Wagah Border"],
    heritageCount: 4,
    color: "#2D5016",
    center: [31.1, 75.3],
    zoom: 7,
  },
  {
    code: "GA",
    name: "Goa",
    region: "West India",
    capital: "Panaji",
    tagline: "Where Portuguese heritage meets Indian culture",
    highlights: ["Basilica of Bom Jesus", "Se Cathedral", "Goa Carnival", "Fontainhas Latin Quarter", "Reis Magos Fort"],
    heritageCount: 3,
    color: "#1E1B4B",
    center: [15.4, 74.0],
    zoom: 9,
  },
  {
    code: "TN",
    name: "Tamil Nadu",
    region: "South India",
    capital: "Chennai",
    tagline: "Ancient temples and classical arts",
    highlights: ["Meenakshi Temple", "Bharatanatyam", "Chola Bronzes", "Mahabalipuram", "Thanjavur Brihadeeswara"],
    heritageCount: 3,
    color: "#8B2252",
    center: [11.1, 79.0],
    zoom: 7,
  },
  {
    code: "MH",
    name: "Maharashtra",
    region: "West India",
    capital: "Mumbai",
    tagline: "From ancient caves to Maratha valor",
    highlights: ["Ajanta & Ellora Caves", "Warli Tribal Art", "Shivaji Maharaj", "Gateway of India", "Elephanta Caves"],
    heritageCount: 3,
    color: "#B45309",
    center: [19.5, 76.5],
    zoom: 7,
  },
  {
    code: "MP",
    name: "Madhya Pradesh",
    region: "Central India",
    capital: "Bhopal",
    tagline: "Heart of India, cradle of civilizations",
    highlights: ["Khajuraho Temples", "Sanchi Stupa", "Gond Tribal Art", "Bhimbetka Rock Shelters", "Orchha Heritage"],
    heritageCount: 3,
    color: "#0E7490",
    center: [23.3, 78.5],
    zoom: 7,
  },
  {
    code: "DL",
    name: "Delhi",
    region: "North India",
    capital: "New Delhi",
    tagline: "Seven cities, centuries of history",
    highlights: ["Red Fort", "Qutub Minar", "Humayun's Tomb", "Chandni Chowk", "India Gate"],
    heritageCount: 3,
    color: "#7C3AED",
    center: [28.6, 77.2],
    zoom: 10,
  },
  // ---- NEW STATES (Regional Expansion) ----
  {
    code: "KL",
    name: "Kerala",
    region: "South India",
    capital: "Thiruvananthapuram",
    tagline: "Backwaters, Theyyam, and the Malabar coast",
    highlights: ["Theyyam", "North Malabar", "Backwaters", "Wayanad", "Kalaripayattu"],
    heritageCount: 6,
    color: "#047857",
    center: [10.8, 76.0],
    zoom: 7,
  },
  {
    code: "JK",
    name: "Jammu & Kashmir",
    region: "North India",
    capital: "Srinagar",
    tagline: "Himalayan valleys, Dard-Shina culture, and pristine landscapes",
    highlights: ["Gurez Valley", "Dal Lake", "Mughal Gardens", "Habba Khatoon Peak", "Kishanganga River"],
    heritageCount: 5,
    color: "#2563EB",
    center: [34.0, 75.0],
    zoom: 7,
  },
  {
    code: "AS",
    name: "Assam",
    region: "Northeast India",
    capital: "Dispur",
    tagline: "Tea gardens, Brahmaputra, and Majuli river island",
    highlights: ["Majuli", "Sattriya Dance", "Kaziranga", "Mask Making", "Bihu Festival"],
    heritageCount: 5,
    color: "#059669",
    center: [26.2, 92.5],
    zoom: 7,
  },
  {
    code: "OD",
    name: "Odisha",
    region: "East India",
    capital: "Bhubaneswar",
    tagline: "Kalinga temples, tribal heritage, and the Mahanadi gorge",
    highlights: ["Satkosia Gorge", "Konark Sun Temple", "Puri Jagannath", "Tribal Culture", "Pattachitra"],
    heritageCount: 5,
    color: "#D97706",
    center: [20.5, 84.0],
    zoom: 7,
  },
];

/** Map from state code to INDIAN_STATES entry */
export const STATE_MAP = Object.fromEntries(
  INDIAN_STATES.map((s) => [s.code, s])
) as Record<string, StateData>;

/** India default view */
export const INDIA_CENTER: [number, number] = [22.6, 78.9]; // [lat, lng]
export const INDIA_ZOOM = 5;

export const REGIONS = [
  { name: "North India", states: ["PB", "DL", "JK"] },
  { name: "Northwest India", states: ["RJ"] },
  { name: "West India", states: ["GJ", "GA", "MH"] },
  { name: "Central India", states: ["MP"] },
  { name: "South India", states: ["TN", "KL"] },
  { name: "Northeast India", states: ["AS"] },
  { name: "East India", states: ["OD"] },
];
