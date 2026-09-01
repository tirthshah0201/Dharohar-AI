/**
 * Astrova — Region Boundaries GeoJSON
 *
 * Approximate geographic extents for 6 required cultural/natural regions.
 * Used for map visualization.
 *
 * Source: Astrova project — approximate centroids with buffer areas
 * License: Project internal
 * Note: These are approximate regions for visualization, not administrative boundaries.
 */

export interface RegionFeature {
  type: "Feature";
  properties: {
    id: string;
    name: string;
    state: string;
    stateCode: string;
    type: "region";
    category: string;
    description: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

export interface RegionFeatureCollection {
  type: "FeatureCollection";
  features: RegionFeature[];
}

/**
 * Approximate region boundary coordinates.
 * [longitude, latitude] order per GeoJSON spec.
 */
export const REGIONS_GEOJSON: RegionFeatureCollection = {
  type: "FeatureCollection",
  features: [
    // ---- North Malabar, Kerala ----
    {
      type: "Feature",
      properties: {
        id: "north_malabar",
        name: "North Malabar",
        state: "Kerala",
        stateCode: "KL",
        type: "region",
        category: "cultural",
        description: "Northern Kerala region encompassing Kannur, Kasaragod, and Wayanad — known for Theyyam, pristine waterfalls, verdant forests, and coastal heritage.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [75.5, 12.0], [75.8, 12.5], [76.0, 13.0], [76.5, 13.5], [77.0, 14.0],
          [76.5, 14.5], [76.0, 14.8], [75.5, 14.5], [75.3, 14.0], [75.2, 13.5],
          [75.2, 13.0], [75.3, 12.5], [75.5, 12.0],
        ]],
      },
    },
    // ---- Chettinad, Tamil Nadu ----
    {
      type: "Feature",
      properties: {
        id: "chettinad",
        name: "Chettinad",
        state: "Tamil Nadu",
        stateCode: "TN",
        type: "region",
        category: "cultural",
        description: "Historic region of the Nattukottai Chettiar community — renowned for grand mansions, distinctive Athangudi tile architecture, and fiery Chettinad cuisine.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [78.5, 10.0], [78.8, 10.2], [79.2, 10.3], [79.5, 10.1],
          [79.3, 9.8], [79.0, 9.5], [78.7, 9.6], [78.5, 9.8], [78.5, 10.0],
        ]],
      },
    },
    // ---- Gurez Valley, Jammu & Kashmir ----
    {
      type: "Feature",
      properties: {
        id: "gurez_valley",
        name: "Gurez Valley",
        state: "Jammu & Kashmir",
        stateCode: "JK",
        type: "region",
        category: "cultural",
        description: "Remote Himalayan valley along the Kishanganga River — home to Dard/Shina cultural heritage, traditional villages, and pristine mountain landscapes.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [74.2, 34.5], [74.5, 34.8], [74.8, 35.0], [75.2, 34.8],
          [75.0, 34.5], [74.8, 34.2], [74.5, 34.0], [74.2, 34.2], [74.2, 34.5],
        ]],
      },
    },
    // ---- Satkosia Gorge, Odisha ----
    {
      type: "Feature",
      properties: {
        id: "satkosia_gorge",
        name: "Satkosia Gorge",
        state: "Odisha",
        stateCode: "OD",
        type: "region",
        category: "natural",
        description: "Dramatic gorge where the Mahanadi River cuts through the Eastern Ghats — surrounded by dense forests, wildlife, and eco-tourism opportunities.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [83.5, 20.5], [83.8, 20.7], [84.2, 20.8], [84.5, 20.6],
          [84.3, 20.3], [84.0, 20.1], [83.7, 20.2], [83.5, 20.4], [83.5, 20.5],
        ]],
      },
    },
    // ---- Amboli, Maharashtra ----
    {
      type: "Feature",
      properties: {
        id: "amboli",
        name: "Amboli",
        state: "Maharashtra",
        stateCode: "MH",
        type: "region",
        category: "natural",
        description: "Hill station at 690m on the Western Ghats ridge — famous for monsoon waterfalls, dense biodiversity forests, and mist-covered landscapes.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [73.8, 15.8], [74.0, 16.0], [74.3, 16.1], [74.5, 15.9],
          [74.3, 15.6], [74.0, 15.5], [73.8, 15.6], [73.8, 15.8],
        ]],
      },
    },
    // ---- Majuli, Assam ----
    {
      type: "Feature",
      properties: {
        id: "majuli",
        name: "Majuli",
        state: "Assam",
        stateCode: "AS",
        type: "region",
        category: "cultural",
        description: "World's largest river island on the Brahmaputra — centre of neo-Vaishnavite Satra culture, Sattriya dance, mask making, and traditional pottery.",
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [94.0, 26.8], [94.2, 27.0], [94.5, 27.1], [94.8, 27.0],
          [94.7, 26.8], [94.5, 26.6], [94.2, 26.6], [94.0, 26.7], [94.0, 26.8],
        ]],
      },
    },
  ],
};
