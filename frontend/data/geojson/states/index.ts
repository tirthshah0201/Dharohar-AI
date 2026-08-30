/**
 * Astrova — State Boundaries GeoJSON
 *
 * Simplified polygon boundaries for 12 supported Indian states.
 * Used for map visualization — not for precise boundary decisions.
 *
 * Source: Derived from OpenStreetMap / Natural Earth data
 * License: ODbL (Open Database License)
 * Note: Approximate simplified polygons for visualization purposes.
 */

export interface GeoJsonFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    code: string;
    type: "state";
    region: string;
    capital: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export interface GeoJsonFeatureCollection {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
}

/**
 * Simplified state boundary coordinates (approximate polygons).
 * [longitude, latitude] order per GeoJSON spec.
 */
export const INDIA_STATES_GEOJSON: GeoJsonFeatureCollection = {
  type: "FeatureCollection",
  features: [
    // ---- Gujarat ----
    {
      type: "Feature",
      properties: { id: "gujarat", name: "Gujarat", code: "GJ", type: "state", region: "West India", capital: "Gandhinagar" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [68.2, 23.4], [68.8, 23.8], [69.5, 23.5], [70.2, 23.1], [70.8, 22.3],
          [71.2, 21.5], [72.0, 21.1], [72.8, 21.0], [73.2, 21.8], [73.5, 22.5],
          [72.8, 23.0], [72.0, 23.6], [71.5, 24.0], [71.0, 24.3], [70.5, 24.5],
          [70.0, 24.8], [69.5, 24.4], [69.0, 24.0], [68.5, 23.8], [68.2, 23.4],
        ]],
      },
    },
    // ---- Rajasthan ----
    {
      type: "Feature",
      properties: { id: "rajasthan", name: "Rajasthan", code: "RJ", type: "state", region: "Northwest India", capital: "Jaipur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [69.5, 24.4], [70.0, 24.8], [70.5, 25.5], [71.0, 26.0], [71.5, 27.0],
          [72.0, 28.0], [73.0, 28.5], [74.0, 29.0], [75.0, 29.5], [75.5, 28.5],
          [76.0, 27.5], [76.5, 26.5], [76.0, 25.5], [75.0, 24.5], [74.0, 24.0],
          [73.0, 23.5], [72.0, 23.6], [71.5, 24.0], [71.0, 24.3], [70.5, 24.5],
          [70.0, 24.8], [69.5, 24.4],
        ]],
      },
    },
    // ---- Punjab ----
    {
      type: "Feature",
      properties: { id: "punjab", name: "Punjab", code: "PB", type: "state", region: "North India", capital: "Chandigarh" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.0, 29.0], [74.5, 29.5], [75.0, 30.0], [75.5, 30.5], [76.0, 30.8],
          [76.5, 30.5], [76.8, 30.0], [76.5, 29.5], [76.0, 29.0], [75.5, 28.5],
          [75.0, 28.5], [74.5, 28.8], [74.0, 29.0],
        ]],
      },
    },
    // ---- Goa ----
    {
      type: "Feature",
      properties: { id: "goa", name: "Goa", code: "GA", type: "state", region: "West India", capital: "Panaji" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [73.5, 15.5], [73.8, 15.8], [74.0, 15.8], [74.2, 15.5],
          [74.0, 15.1], [73.8, 15.0], [73.5, 15.2], [73.5, 15.5],
        ]],
      },
    },
    // ---- Tamil Nadu ----
    {
      type: "Feature",
      properties: { id: "tamil_nadu", name: "Tamil Nadu", code: "TN", type: "state", region: "South India", capital: "Chennai" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.0, 13.0], [76.5, 12.5], [77.0, 11.5], [77.5, 10.5], [78.0, 9.5],
          [78.5, 8.5], [79.0, 9.0], [79.5, 10.0], [80.0, 11.0], [80.5, 12.0],
          [80.2, 13.0], [80.0, 13.5], [79.5, 14.0], [79.0, 14.5], [78.5, 15.0],
          [78.0, 15.5], [77.5, 15.0], [77.0, 14.5], [76.5, 14.0], [76.0, 13.5],
          [76.0, 13.0],
        ]],
      },
    },
    // ---- Maharashtra ----
    {
      type: "Feature",
      properties: { id: "maharashtra", name: "Maharashtra", code: "MH", type: "state", region: "West India", capital: "Mumbai" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [72.8, 21.0], [73.2, 21.8], [73.5, 22.5], [74.0, 24.0], [75.0, 24.5],
          [76.0, 25.0], [77.0, 24.5], [78.0, 23.5], [79.0, 22.5], [80.0, 22.0],
          [80.5, 21.0], [80.0, 20.0], [79.5, 19.0], [79.0, 18.0], [78.5, 17.0],
          [78.0, 16.5], [77.5, 16.0], [77.0, 16.5], [76.5, 16.8], [76.0, 16.5],
          [75.5, 16.0], [75.0, 15.5], [74.5, 15.5], [74.0, 15.8], [73.8, 16.5],
          [73.5, 17.5], [73.2, 18.5], [73.0, 19.5], [72.8, 20.5], [72.8, 21.0],
        ]],
      },
    },
    // ---- Madhya Pradesh ----
    {
      type: "Feature",
      properties: { id: "madhya_pradesh", name: "Madhya Pradesh", code: "MP", type: "state", region: "Central India", capital: "Bhopal" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.0, 24.0], [75.0, 24.5], [76.0, 25.0], [77.0, 24.5], [78.0, 23.5],
          [79.0, 22.5], [80.0, 22.0], [81.0, 22.5], [82.0, 23.5], [82.5, 24.5],
          [82.0, 25.0], [81.0, 25.5], [80.0, 25.5], [79.0, 25.0], [78.0, 25.5],
          [77.0, 26.0], [76.0, 26.5], [75.5, 26.0], [75.0, 25.5], [74.0, 24.5],
          [74.0, 24.0],
        ]],
      },
    },
    // ---- Delhi ----
    {
      type: "Feature",
      properties: { id: "delhi", name: "Delhi", code: "DL", type: "state", region: "North India", capital: "New Delhi" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.8, 28.4], [77.0, 28.6], [77.3, 28.8], [77.3, 28.6],
          [77.2, 28.4], [77.0, 28.2], [76.8, 28.4],
        ]],
      },
    },
    // ---- Kerala ----
    {
      type: "Feature",
      properties: { id: "kerala", name: "Kerala", code: "KL", type: "state", region: "South India", capital: "Thiruvananthapuram" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [76.0, 13.0], [76.0, 13.5], [76.5, 14.0], [77.0, 14.5], [77.5, 15.0],
          [77.0, 15.5], [76.5, 16.0], [76.0, 16.5], [75.5, 16.0], [75.5, 15.5],
          [75.5, 14.5], [75.5, 13.5], [75.8, 12.5], [76.0, 11.5], [76.5, 10.5],
          [77.0, 10.0], [77.2, 10.5], [77.0, 11.0], [76.5, 12.0], [76.0, 13.0],
        ]],
      },
    },
    // ---- Jammu & Kashmir ----
    {
      type: "Feature",
      properties: { id: "jammu_kashmir", name: "Jammu & Kashmir", code: "JK", type: "state", region: "North India", capital: "Srinagar" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [73.5, 32.5], [74.0, 33.0], [75.0, 33.5], [76.0, 34.0], [77.0, 34.5],
          [78.0, 34.0], [78.5, 33.5], [78.0, 33.0], [77.5, 32.5], [77.0, 32.0],
          [76.5, 32.0], [76.0, 32.5], [75.5, 32.5], [75.0, 32.0], [74.5, 32.0],
          [74.0, 32.5], [73.5, 32.5],
        ]],
      },
    },
    // ---- Assam ----
    {
      type: "Feature",
      properties: { id: "assam", name: "Assam", code: "AS", type: "state", region: "Northeast India", capital: "Dispur" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [89.5, 26.0], [90.0, 26.5], [91.0, 27.0], [92.0, 27.5], [93.0, 27.0],
          [93.5, 26.5], [94.0, 26.0], [94.5, 25.5], [94.0, 25.0], [93.5, 24.5],
          [93.0, 24.0], [92.0, 24.5], [91.0, 25.0], [90.5, 25.5], [90.0, 25.5],
          [89.5, 25.5], [89.5, 26.0],
        ]],
      },
    },
    // ---- Odisha ----
    {
      type: "Feature",
      properties: { id: "odisha", name: "Odisha", code: "OR", type: "state", region: "East India", capital: "Bhubaneswar" },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [80.0, 22.0], [80.5, 22.5], [81.0, 22.5], [82.0, 22.5], [83.0, 22.0],
          [84.0, 22.0], [84.5, 21.5], [85.0, 20.5], [85.5, 19.5], [85.0, 18.5],
          [84.5, 18.0], [84.0, 17.5], [83.5, 17.5], [83.0, 18.0], [82.5, 18.5],
          [82.0, 19.0], [81.5, 19.5], [81.0, 20.0], [80.5, 21.0], [80.0, 22.0],
        ]],
      },
    },
  ],
};
