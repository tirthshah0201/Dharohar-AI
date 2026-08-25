/* ========================================
   Dharohar AI — Application Constants
   ======================================== */

export const APP_NAME = "Dharohar AI";
export const APP_DESCRIPTION =
  "An intelligent cultural and historical knowledge platform for discovering Gujarat's heritage.";

// ---- Geographic ----
export const PRIMARY_STATE = "Gujarat";

export const GUJARAT_DISTRICTS = [
  "Ahmedabad",
  "Amreli",
  "Anand",
  "Aravalli",
  "Banaskantha",
  "Bharuch",
  "Bhavnagar",
  "Botad",
  "Chhota Udepur",
  "Dahod",
  "Dang",
  "Devbhoomi Dwarka",
  "Gandhinagar",
  "Gir Somnath",
  "Jamnagar",
  "Junagadh",
  "Kutch",
  "Kheda",
  "Mahisagar",
  "Mehsana",
  "Morbi",
  "Narmada",
  "Navsari",
  "Panchmahal",
  "Patan",
  "Porbandar",
  "Rajkot",
  "Sabarkantha",
  "Surat",
  "Surendranagar",
  "Tapi",
  "Vadodara",
  "Valsad",
] as const;

// ---- Heritage ----
export const HERITAGE_CATEGORIES = [
  { id: "monument", label: "Monuments", description: "Architectural landmarks and structures" },
  { id: "person", label: "People", description: "Historical figures and communities" },
  { id: "craft", label: "Crafts", description: "Traditional arts and crafts" },
  { id: "tradition", label: "Traditions", description: "Cultural practices and traditions" },
  { id: "festival", label: "Festivals", description: "Cultural celebrations and events" },
  { id: "architecture", label: "Architecture", description: "Architectural styles and periods" },
  { id: "event", label: "Events", description: "Significant historical events" },
  { id: "food", label: "Food", description: "Culinary heritage and traditions" },
  { id: "community", label: "Communities", description: "Cultural communities and groups" },
] as const;

// ---- Timeline ----
export const HISTORICAL_ERAS = [
  { id: "ancient", label: "Ancient", period: "Before 700 CE" },
  { id: "medieval", label: "Medieval", period: "700 – 1300 CE" },
  { id: "sultanate", label: "Sultanate", period: "1300 – 1573 CE" },
  { id: "colonial", label: "Colonial", period: "1573 – 1947 CE" },
  { id: "modern", label: "Modern", period: "1947 – Present" },
] as const;

// ---- API ----
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const AI_SERVICE_URL =
  process.env.NEXT_PUBLIC_AI_SERVICE_URL || "http://localhost:8000";

/**
 * Development-only API key for frontend→backend connectivity.
 * ⚠️ This is NOT a secret — it is a temporary dev-only key.
 * It will be removed when real authentication is implemented.
 */
export const DEMO_API_KEY =
  process.env.NEXT_PUBLIC_DEMO_API_KEY || "";
