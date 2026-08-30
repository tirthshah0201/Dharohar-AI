"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  GeoJSON,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  INDIAN_STATES,
  INDIA_ZOOM,
  type StateData,
} from "@/constants/india";
import {
  INDIA_CENTER,
  MIN_ZOOM,
  MAX_ZOOM,
  STATE_ZOOM,
  REGION_ZOOM,
  FOCUS_ZOOM,
  OSM_TILE_URL,
  OSM_ATTRIBUTION,
  STATE_STYLE,
  STATE_HOVER_STYLE,
  STATE_SELECTED_STYLE,
  REGION_STYLE,
  REGION_HOVER_STYLE,
  REGION_SELECTED_STYLE,
} from "@/constants/map";
import { loadMapData, type MapFeature } from "@/services/map/map-data";
import {
  createFeatureIcon,
  createTooltipContent,
  getZoomForFeature,
  getGeometryCenter,
} from "@/services/map/map-utils";
import { INDIA_STATES_GEOJSON } from "@/data/geojson/states";
import { REGIONS_GEOJSON } from "@/data/geojson/regions";
import { StateSelector } from "./StateSelector";
import { MapControls } from "./MapControls";
import { HeritagePopup } from "./HeritagePopup";
import { MapDetailPanel } from "./MapDetailPanel";

/* ---- Fix Leaflet default icon issue in Next.js ---- */
if (typeof window !== "undefined") {
  // @ts-expect-error -- Leaflet asset URL fix for bundlers
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

/* ---- Types ---- */
interface Props {
  onAskAI?: (ctx: { name: string; state: string; category: string }) => void;
  height?: string;
  /** If provided, the map will fly to this location and open its popup */
  focusLocationId?: string | null;
}

/* ---- Map event handler component ---- */
function MapEvents({
  onZoomChange,
  onBoundsChange,
}: {
  onZoomChange: (zoom: number) => void;
  onBoundsChange: (bounds: L.LatLngBounds) => void;
}) {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom());
    },
    moveend: (e) => {
      onBoundsChange(e.target.getBounds());
    },
  });
  return null;
}

/* ---- Fly-to controller ---- */
function FlyToController({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}



/* ---- Main Component ---- */
export function AstrovaMap({ onAskAI, height = "500px", focusLocationId }: Props) {
  const [selState, setSelState] = useState<string | null>(null);
  const [catFilter, setCatFilter] = useState("all");
  const [markerCount, setMarkerCount] = useState(0);
  const [locations, setLocations] = useState<MapFeature[]>([]);
  const [heritage, setHeritage] = useState<MapFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentZoom, setCurrentZoom] = useState(INDIA_ZOOM);
  const [flyTarget, setFlyTarget] = useState<{
    center: [number, number];
    zoom: number;
  }>({ center: INDIA_CENTER, zoom: INDIA_ZOOM });
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(
    null
  );
  const [focusFeature, setFocusFeature] = useState<MapFeature | null>(null);

  // ---- Load data ----
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loadMapData();
      setLocations(data.mappableLocations);
      setHeritage(data.heritageFeatures);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Unable to load heritage data";
      console.error("[Map] API error:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // ---- Focus on a specific location when focusLocationId prop changes ----
  const focusAppliedRef = useRef(false);
  useEffect(() => {
    if (!focusLocationId || loading || focusAppliedRef.current) return;

    // Search in both locations and heritage
    const all = [...locations, ...heritage];
    const feature = all.find((f) => f.id === focusLocationId);
    if (feature && feature.latitude && feature.longitude) {
      focusAppliedRef.current = true;
      setFlyTarget({
        center: [feature.latitude, feature.longitude],
        zoom: FOCUS_ZOOM,
      });
      setFocusFeature(feature);
    }
  }, [focusLocationId, loading, locations, heritage]);

  // ---- Merge all features for markers ----
  const allFeatures = useMemo(() => {
    const merged: MapFeature[] = [...locations];

    // Add heritage not already covered by location names
    const locNames = new Set(locations.map((l) => l.name.toLowerCase()));
    for (const h of heritage) {
      if (!locNames.has(h.name.toLowerCase())) {
        merged.push(h);
      }
    }

    return merged;
  }, [locations, heritage]);

  // ---- Filter features ----
  const filteredFeatures = useMemo(() => {
    let features = allFeatures;

    // Filter by state
    if (selState) {
      const stateObj = INDIAN_STATES.find((s) => s.code === selState);
      if (stateObj) {
        features = features.filter(
          (f) =>
            f.state.toLowerCase() === stateObj.name.toLowerCase() ||
            f.state.toLowerCase() === selState.toLowerCase()
        );
      }
    }

    // Filter by category
    if (catFilter !== "all") {
      features = features.filter(
        (f) => f.type === catFilter || f.category === catFilter
      );
    }

    return features;
  }, [allFeatures, selState, catFilter]);

  // ---- Categories ----
  const categories = useMemo(() => {
    const cats = new Set(allFeatures.map((f) => f.type || f.category).filter((c): c is string => Boolean(c)));
    return [...cats].sort();
  }, [allFeatures]);

  // ---- Update marker count ----
  useEffect(() => {
    setMarkerCount(filteredFeatures.length);
  }, [filteredFeatures]);

  // ---- State selector handler ----
  const handleStateSelect = useCallback((state: StateData | null) => {
    if (!state) {
      setSelState(null);
      setFlyTarget({ center: INDIA_CENTER, zoom: INDIA_ZOOM });
    } else {
      setSelState(state.code);
      setFlyTarget({ center: state.center, zoom: STATE_ZOOM });
    }
    setSelectedFeature(null);
  }, []);

  // ---- GeoJSON event handlers for states ----
  const onStateEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      const props = feature.properties as {
        id: string;
        name: string;
        code: string;
      };

      layer.on({
        mouseover: () => {
          setHoveredState(props.id);
          (layer as L.Path).setStyle(STATE_HOVER_STYLE);
          (layer as L.Path).bringToFront();
        },
        mouseout: () => {
          setHoveredState(null);
          if (selState !== props.id) {
            (layer as L.Path).setStyle(STATE_STYLE);
          } else {
            (layer as L.Path).setStyle(STATE_SELECTED_STYLE);
          }
        },
        click: () => {
          const stateObj = INDIAN_STATES.find((s: StateData) => s.code === props.code);
          if (stateObj) {
            handleStateSelect(stateObj);
          }
        },
      });
    },
    [selState, handleStateSelect]
  );

  // ---- GeoJSON event handlers for regions ----
  const onRegionEachFeature = useCallback(
    (feature: GeoJSON.Feature, layer: L.Layer) => {
      const props = feature.properties as { id: string; name: string };

      layer.on({
        mouseover: () => {
          setHoveredRegion(props.id);
          (layer as L.Path).setStyle(REGION_HOVER_STYLE);
          (layer as L.Path).bringToFront();
        },
        mouseout: () => {
          setHoveredRegion(null);
          (layer as L.Path).setStyle(REGION_STYLE);
        },
        click: () => {
          const center = getGeometryCenter(
            (feature.geometry as GeoJSON.Polygon).coordinates
          );
          setFlyTarget({ center, zoom: REGION_ZOOM });
        },
      });
    },
    []
  );

  // ---- Determine marker size based on zoom ----
  const markerSize = useMemo(() => {
    if (currentZoom <= 5) return 32;
    if (currentZoom <= 8) return 26;
    if (currentZoom <= 11) return 22;
    return 18;
  }, [currentZoom]);

  // ---- Render state GeoJSON with dynamic style ----
  const stateGeoJson = useMemo(() => {
    return INDIA_STATES_GEOJSON;
  }, []);

  const stateStyle = useCallback(
    (feature?: GeoJSON.Feature) => {
      const props = feature?.properties as { id: string } | undefined;
      if (props && selState === props.id) return STATE_SELECTED_STYLE;
      return STATE_STYLE;
    },
    [selState]
  );

  const regionStyle = useCallback(
    (feature?: GeoJSON.Feature) => {
      return REGION_STYLE;
    },
    []
  );

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-border bg-card"
      style={{ height }}
    >
      {/* Loading overlay */}
      {(loading || error) && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-ivory/80 backdrop-blur-sm">
          {loading ? (
            <div className="flex items-center gap-3 text-charcoal">
              <div className="h-5 w-5 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium">
                Loading heritage map...
              </span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 text-charcoal max-w-sm text-center px-4">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium">
                Heritage data is temporarily unavailable.
              </p>
              <p className="text-xs text-muted">
                Ensure the backend API server is running on port 3001.
              </p>
              <button
                onClick={loadData}
                className="mt-1 px-4 py-2 text-xs font-semibold text-white bg-terracotta rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : null}
        </div>
      )}

      {/* Leaflet Map */}
      <MapContainer
        center={INDIA_CENTER}
        zoom={INDIA_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        zoomControl={true}
        attributionControl={true}
        className="w-full h-full"
        style={{ background: "#E8E4DE" }}
      >
        {/* OSM Tile Layer */}
        <TileLayer
          url={OSM_TILE_URL}
          attribution={OSM_ATTRIBUTION}
          maxZoom={MAX_ZOOM}
        />

        {/* Map events */}
        <MapEvents
          onZoomChange={setCurrentZoom}
          onBoundsChange={() => {}}
        />

        {/* Fly-to controller */}
        <FlyToController
          center={flyTarget.center}
          zoom={flyTarget.zoom}
        />

        {/* State boundaries GeoJSON */}
        <GeoJSON
          key="states"
          data={stateGeoJson as unknown as GeoJSON.GeoJsonObject}
          style={stateStyle}
          onEachFeature={onStateEachFeature}
        >
          {/* State tooltips */}
        </GeoJSON>

        {/* Region boundaries GeoJSON */}
        <GeoJSON
          key="regions"
          data={REGIONS_GEOJSON as unknown as GeoJSON.GeoJsonObject}
          style={regionStyle}
          onEachFeature={onRegionEachFeature}
        >
          {/* Region tooltips */}
        </GeoJSON>

        {/* Feature markers */}
        {filteredFeatures.map((feature) => {
          const icon = createFeatureIcon(feature, markerSize);
          return (
            <Marker
              key={`${feature.source}-${feature.id}`}
              position={[feature.latitude, feature.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => {
                  setSelectedFeature(feature);
                },
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -markerSize / 2]}
                opacity={0.95}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: createTooltipContent(feature),
                  }}
                />
              </Tooltip>
              <Popup
                maxWidth={320}
                closeButton={true}
                className="astrova-popup"
              >
                <HeritagePopup
                  name={feature.name}
                  type={feature.type || feature.category || "heritage"}
                  description={feature.description || ""}
                  state={feature.state}
                  category={feature.type || feature.category || "heritage"}
                  id={feature.id}
                  source={feature.source}
                  onAskAI={onAskAI}
                />
              </Popup>
            </Marker>
          );
        })}      </MapContainer>

      {/* State selector */}
      <div className="absolute left-3 top-3 z-10">
        <StateSelector
          states={INDIAN_STATES}
          selectedState={selState}
          onSelect={handleStateSelect}
        />
      </div>

      {/* Map controls */}
      <div className="absolute right-3 top-16 z-10">
        <MapControls
          onReset={() => handleStateSelect(null)}
          categoryFilter={catFilter}
          onCategoryChange={setCatFilter}
          categories={categories}
          totalMarkers={markerCount}
        />
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <p className="text-[10px] font-semibold text-charcoal mb-1.5 uppercase tracking-wider">
          Legend
        </p>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#C2703E" }}
            />
            <span className="text-[10px] text-muted">Location</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5"
              style={{
                backgroundColor: "#B8963E",
                transform: "rotate(45deg)",
              }}
            />
            <span className="text-[10px] text-muted">Heritage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 border"
              style={{
                backgroundColor: "rgba(194, 112, 62, 0.1)",
                borderColor: "#C2703E",
              }}
            />
            <span className="text-[10px] text-muted">State</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 border"
              style={{
                backgroundColor: "rgba(109, 40, 217, 0.1)",
                borderColor: "#6D28D9",
              }}
            />
            <span className="text-[10px] text-muted">Region</span>
          </div>
        </div>
      </div>

      {/* Map Detail Panel — shows when a location is focused from search */}
      <MapDetailPanel
        feature={focusFeature}
        onClose={() => setFocusFeature(null)}
        onAskAI={onAskAI}
      />

      {/* OSM Attribution (redundant but ensures visibility) */}
      <div className="absolute bottom-1 right-1 z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded px-1.5 py-0.5 text-[8px] text-muted">
          © OpenStreetMap contributors
        </div>
      </div>
    </div>
  );
}
