/**
 * Astrova — Map Data Service
 * Loads locations and heritage entities from the Astrova backend API
 */

import { api } from "@/services/api";

export interface MapLocation {
  id: string;
  name: string;
  slug?: string;
  type: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  parent_id: string | null;
  state: string;
}

export interface MapHeritage {
  id: string;
  name: string;
  slug?: string;
  category: string;
  description: string;
  location_id: string | null;
  period_id: string | null;
}

export interface MapFeature {
  id: string;
  name: string;
  slug?: string;
  state: string;
  region?: string;
  type: string;
  latitude: number;
  longitude: number;
  description?: string;
  source: "database" | "famous";
  category?: string;
  period_id?: string | null;
}

export interface MapDataResult {
  locations: MapLocation[];
  heritage: MapHeritage[];
  mappableLocations: MapFeature[];
  heritageFeatures: MapFeature[];
}

/**
 * Validate a coordinate value.
 * Returns null if invalid.
 */
export function validateCoord(value: number | null | undefined): number | null {
  if (value === null || value === undefined || isNaN(value)) return null;
  return value;
}

/**
 * Check if lat/lng are within valid bounds.
 */
export function isValidLatLng(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Load map data from the Astrova API.
 */
export async function loadMapData(): Promise<MapDataResult> {
  const [locRes, herRes] = await Promise.all([
    api.get<{ data: MapLocation[]; total: number }>("/locations"),
    api.get<{ data: MapHeritage[]; total: number }>("/heritage"),
  ]);

  const locations = locRes.data ?? [];
  const heritage = herRes.data ?? [];

  // Build mappable locations with validated coordinates
  const mappableLocations: MapFeature[] = [];
  for (const loc of locations) {
    const lat = validateCoord(loc.latitude ? +loc.latitude : null);
    const lng = validateCoord(loc.longitude ? +loc.longitude : null);
    if (!lat || !lng) continue;
    if (!isValidLatLng(lat, lng)) {
      console.warn(`[Map] Invalid coordinates for "${loc.name}": lat=${lat}, lng=${lng}`);
      continue;
    }
    mappableLocations.push({
      id: loc.id,
      name: loc.name,
      slug: loc.slug,
      state: loc.state,
      type: loc.type,
      latitude: lat,
      longitude: lng,
      description: loc.description,
      source: "database",
    });
  }

  // Build heritage features with coordinates from their locations
  const heritageFeatures: MapFeature[] = [];
  const locationMap = new Map(locations.map((l) => [l.id, l]));

  for (const h of heritage) {
    const loc = h.location_id ? locationMap.get(h.location_id) : null;
    if (!loc) continue;
    const lat = validateCoord(loc.latitude ? +loc.latitude : null);
    const lng = validateCoord(loc.longitude ? +loc.longitude : null);
    if (!lat || !lng || !isValidLatLng(lat, lng)) continue;
    heritageFeatures.push({
      id: h.id,
      name: h.name,
      slug: h.slug,
      state: loc.state,
      type: h.category,
      latitude: lat,
      longitude: lng,
      description: h.description,
      source: "database",
      category: h.category,
      period_id: h.period_id,
    });
  }

  return {
    locations,
    heritage,
    mappableLocations,
    heritageFeatures,
  };
}
