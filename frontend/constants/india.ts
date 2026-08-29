export interface StateData {
  code: string;
  name: string;
  region: string;
  capital: string;
  tagline: string;
  highlights: string[];
  heritageCount: number;
  color: string;
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
  },
];

export const REGIONS = [
  { name: "North India", states: ["PB", "DL"] },
  { name: "Northwest India", states: ["RJ"] },
  { name: "West India", states: ["GJ", "GA", "MH"] },
  { name: "Central India", states: ["MP"] },
  { name: "South India", states: ["TN"] },
];
