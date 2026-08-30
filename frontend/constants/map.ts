/* ========================================
   Astrova — Map Configuration
   Leaflet + OpenStreetMap + GeoJSON
   ======================================== */

// ---- OSM Tile Configuration ----
// Standard OpenStreetMap raster tiles — no API key required
// Must follow OSM tile usage policy with visible attribution
export const OSM_TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
export const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>';

// ---- Map Defaults ----
export const INDIA_CENTER: [number, number] = [22.5, 78.9]; // lat, lng for Leaflet
export const INDIA_ZOOM = 5;
export const MIN_ZOOM = 3;
export const MAX_ZOOM = 18;
export const STATE_ZOOM = 7;
export const REGION_ZOOM = 10;
export const LOCAL_ZOOM = 13;
export const FOCUS_ZOOM = 14;

// ---- Marker Colors (Astrova brand palette) ----
export const MARKER_COLORS: Record<string, string> = {
  state: "#1E1B4B",
  region: "#6D28D9",
  district: "#C2703E",
  city: "#B8963E",
  village: "#2D5016",
  heritage: "#B45309",
  monument: "#B45309",
  natural_landmark: "#059669",
  waterfall: "#0891B2",
  river: "#2563EB",
  forest: "#166534",
  wildlife: "#DC2626",
  mountain: "#6B7280",
  beach: "#0EA5E9",
  backwater: "#0284C7",
  cultural_site: "#7C3AED",
  craft: "#D97706",
  food: "#EA580C",
  festival: "#DB2777",
  tradition: "#9333EA",
  architecture: "#B45309",
  community: "#059669",
  eco_tourism: "#059669",
  adventure: "#DC2626",
  gorge: "#475569",
};

// ---- Marker Sizes by Zoom Level ----
export const MARKER_SIZES = {
  state: { width: 32, height: 32, border: 4 },
  region: { width: 26, height: 26, border: 3 },
  district: { width: 22, height: 22, border: 3 },
  city: { width: 20, height: 20, border: 3 },
  heritage: { width: 18, height: 18, border: 2 },
};

// ---- GeoJSON Layer Styles ----
export const STATE_STYLE = {
  fillColor: "#C2703E",
  fillOpacity: 0.08,
  color: "#C2703E",
  weight: 1.5,
  opacity: 0.4,
};

export const STATE_HOVER_STYLE = {
  fillColor: "#C2703E",
  fillOpacity: 0.15,
  color: "#C2703E",
  weight: 2.5,
  opacity: 0.8,
};

export const STATE_SELECTED_STYLE = {
  fillColor: "#C2703E",
  fillOpacity: 0.2,
  color: "#C2703E",
  weight: 3,
  opacity: 1,
};

export const REGION_STYLE = {
  fillColor: "#6D28D9",
  fillOpacity: 0.1,
  color: "#6D28D9",
  weight: 2,
  opacity: 0.5,
};

export const REGION_HOVER_STYLE = {
  fillColor: "#6D28D9",
  fillOpacity: 0.2,
  color: "#6D28D9",
  weight: 2.5,
  opacity: 0.8,
};

export const REGION_SELECTED_STYLE = {
  fillColor: "#6D28D9",
  fillOpacity: 0.25,
  color: "#6D28D9",
  weight: 3,
  opacity: 1,
};

// ---- GeoJSON Source Info ----
export const GEOJSON_SOURCES = {
  states: {
    name: "India State Boundaries (simplified)",
    source: "OpenStreetMap / Natural Earth",
    license: "Open Database License (ODbL)",
    url: "https://www.naturalearthdata.com/",
    note: "Simplified boundaries for visualization. Not for precise boundary decisions.",
  },
  regions: {
    name: "Astrova Region Approximations",
    source: "Astrova project — approximate centroids with buffer areas",
    license: "Project internal",
    note: "Approximate geographic extents for cultural/natural regions.",
  },
};
