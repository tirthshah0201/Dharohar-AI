/**
 * Astrova — Map Utilities
 * Helper functions for Leaflet map rendering
 */

import L from "leaflet";
import { MARKER_COLORS } from "@/constants/map";
import type { MapFeature } from "./map-data";

/**
 * Get marker color based on feature type/category.
 */
export function getMarkerColor(type: string): string {
  return MARKER_COLORS[type] || MARKER_COLORS.heritage;
}

/**
 * Create a custom Leaflet icon for a map feature.
 */
export function createFeatureIcon(
  feature: MapFeature,
  size: number = 24
): L.DivIcon {
  const color = getMarkerColor(feature.type);
  const isHeritage = feature.source === "famous" || feature.category;

  return L.divIcon({
    className: "astrova-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    html: isHeritage
      ? `<div style="
          width:${size}px; height:${size}px;
          border-radius:3px;
          background:${color};
          border:2px solid white;
          box-shadow:0 2px 6px rgba(0,0,0,.25);
          cursor:pointer;
          transform:rotate(45deg);
          transition:transform .15s;
        "></div>`
      : `<div style="
          width:${size}px; height:${size}px;
          border-radius:50%;
          background:${color};
          border:3px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,.25);
          cursor:pointer;
          transition:transform .15s;
        "></div>`,
  });
}

/**
 * Create a compact tooltip content for a map feature.
 */
export function createTooltipContent(feature: MapFeature): string {
  return `<div style="
    font-family:system-ui,sans-serif;
    padding:4px 8px;
    font-size:12px;
    line-height:1.4;
    white-space:nowrap;
  ">
    <div style="font-weight:600;color:#1C1915;">${feature.name}</div>
    <div style="color:#78716C;font-size:11px;">
      ${feature.state}${feature.type ? ` · ${feature.type}` : ""}
    </div>
  </div>`;
}

/**
 * Get the zoom level appropriate for a feature type.
 */
export function getZoomForFeature(type: string): number {
  switch (type) {
    case "state":
      return 7;
    case "region":
      return 10;
    case "district":
      return 10;
    case "city":
      return 12;
    case "village":
      return 13;
    default:
      return 11;
  }
}

/**
 * Get the bounding box center for a GeoJSON geometry.
 * Returns [lat, lng] for Leaflet.
 */
export function getGeometryCenter(
  coordinates: number[][][]
): [number, number] {
  let sumLat = 0;
  let sumLng = 0;
  let count = 0;

  for (const ring of coordinates) {
    for (const coord of ring) {
      sumLng += coord[0];
      sumLat += coord[1];
      count++;
    }
  }

  return [sumLat / count, sumLng / count];
}
