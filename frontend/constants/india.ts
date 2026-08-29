export interface StateData {
  code: string;
  name: string;
  region: string;
  capital: string;
  tagline: string;
  highlights: string[];
  heritageCount: number;
  color: string;
  center: [number, number]; // [longitude, latitude]
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
    center: [72.6, 22.3],
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
    center: [74.2, 27.0],
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
    center: [75.3, 31.1],
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
    center: [74.0, 15.4],
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
    center: [79.0, 11.1],
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
    center: [76.5, 19.5],
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
    center: [78.5, 23.3],
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
    center: [77.2, 28.6],
    zoom: 10,
  },
];

/** Map from state code to INDIAN_STATES entry */
export const STATE_MAP = Object.fromEntries(
  INDIAN_STATES.map((s) => [s.code, s])
) as Record<string, StateData>;

/** India default view */
export const INDIA_CENTER: [number, number] = [78.9, 22.6];
export const INDIA_ZOOM = 5;

export const REGIONS = [
  { name: "North India", states: ["PB", "DL"] },
  { name: "Northwest India", states: ["RJ"] },
  { name: "West India", states: ["GJ", "GA", "MH"] },
  { name: "Central India", states: ["MP"] },
  { name: "South India", states: ["TN"] },
];
