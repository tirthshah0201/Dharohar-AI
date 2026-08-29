"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { INDIAN_STATES, INDIA_CENTER, INDIA_ZOOM, type StateData } from "@/constants/india";
import { API_BASE_URL, DEMO_API_KEY } from "@/constants";
import { FAMOUS_HERITAGE_MARKERS, type FamousMarker } from "@/constants/famousMarkers";
import { HeritagePopup } from "./HeritagePopup";
import { StateSelector } from "./StateSelector";
import { MapControls } from "./MapControls";

interface Location {
  id: string; name: string; type: string; description: string;
  latitude: number | null; longitude: number | null; parent_id: string | null; state: string;
}
interface HeritageEntity {
  id: string; name: string; category: string; description: string; location_id: string | null;
}
interface Props {
  onAskAI?: (ctx: { name: string; state: string; category: string }) => void;
  height?: string;
}

const KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY || "";
function buildStyle(): string | maplibregl.StyleSpecification {
  if (KEY) return `https://api.maptiler.com/maps/streets-v2/style.json?key=${KEY}`;
  return {
    version: 8,
    sources: { osm: { type: "raster", tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], tileSize: 256, attribution: "© OpenStreetMap" } },
    layers: [{ id: "osm", type: "raster", source: "osm" }],
  };
}

const COLORS: Record<string, string> = {
  state: "#1E1B4B",
  district: "#C2703E",
  city: "#B8963E",
  village: "#2D5016",
  site: "#B45309",
};

/**
 * Validate a coordinate value.
 * Returns null if invalid, the numeric value if valid.
 */
function validateCoord(value: number | null | undefined): number | null {
  if (value === null || value === undefined || isNaN(value)) return null;
  return value;
}

function isValidLatLng(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export function IndiaHeritageMap({ onAskAI, height = "500px" }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const tooltipsRef = useRef<HTMLDivElement[]>([]);

  const [selState, setSelState] = useState<string | null>(null);
  const [catFilter, setCatFilter] = useState("all");
  const [markerCount, setMarkerCount] = useState(0);
  const [locations, setLocations] = useState<Location[]>([]);
  const [heritage, setHeritage] = useState<HeritageEntity[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data directly
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const headers: Record<string, string> = {};
        if (DEMO_API_KEY) headers["X-API-Key"] = DEMO_API_KEY;

        const [locRes, herRes] = await Promise.all([
          fetch(`${API_BASE_URL}/locations`, { headers }).then(r => r.json()),
          fetch(`${API_BASE_URL}/heritage`, { headers }).then(r => r.json()),
        ]);

        if (!cancelled) {
          setLocations(locRes.data ?? []);
          setHeritage(herRes.data ?? []);
          setLoading(false);
        }
      } catch (e) {
        console.error("[Map] fetch error:", e);
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Derived data with validation
  const mappable = useMemo(() => {
    const validated: (Location & { latitude: number; longitude: number })[] = [];
    for (const l of locations) {
      const lat = validateCoord(l.latitude ? +l.latitude : null);
      const lng = validateCoord(l.longitude ? +l.longitude : null);
      if (!lat || !lng) continue;
      if (!isValidLatLng(lat, lng)) {
        console.warn(`[Map] Invalid coordinates for "${l.name}": lat=${lat}, lng=${lng}`);
        continue;
      }
      validated.push({ ...l, latitude: lat, longitude: lng });
    }
    return validated;
  }, [locations]);

  const herWithCoords = useMemo(() => {
    const dbHeritage = heritage
      .map(h => {
        const loc = locations.find(l => l.id === h.location_id);
        if (!loc) return null;
        const lat = validateCoord(loc.latitude ? +loc.latitude : null);
        const lng = validateCoord(loc.longitude ? +loc.longitude : null);
        if (!lat || !lng || !isValidLatLng(lat, lng)) {
          console.warn(`[Map] Invalid heritage coords for "${h.name}": lat=${lat}, lng=${lng}`);
          return null;
        }
        return { ...h, latitude: lat, longitude: lng, state: loc.state };
      })
      .filter(Boolean) as (HeritageEntity & { latitude: number; longitude: number; state: string })[];

    // Merge famous markers not already covered by database
    const existingNames = new Set(dbHeritage.map(h => h.name.toLowerCase()));
    const famousAsHeritage: (HeritageEntity & { latitude: number; longitude: number; state: string })[] = [];
    for (const fm of FAMOUS_HERITAGE_MARKERS) {
      if (fm.type !== "site") continue; // Only heritage sites, not cities/states
      if (existingNames.has(fm.name.toLowerCase())) continue; // Skip if already in DB
      famousAsHeritage.push({
        id: fm.id,
        name: fm.name,
        category: fm.category,
        description: fm.description,
        location_id: null,
        latitude: fm.latitude,
        longitude: fm.longitude,
        state: fm.state,
      });
    }

    return [...dbHeritage, ...famousAsHeritage];
  }, [heritage, locations]);

  // Famous city markers (supplemental, not from DB)
  const famousCityMarkers = useMemo(() => {
    const dbCityNames = new Set(mappable.filter(l => l.type === "city").map(l => l.name.toLowerCase()));
    return FAMOUS_HERITAGE_MARKERS.filter(
      fm => fm.type === "city" && !dbCityNames.has(fm.name.toLowerCase())
    );
  }, [mappable]);

  const categories = useMemo(() => [...new Set(herWithCoords.map(h => h.category))].sort(), [herWithCoords]);

  // ---- Create tooltip element ----
  const createTooltip = useCallback((text: string) => {
    const el = document.createElement("div");
    el.style.cssText = `
      position:absolute; bottom:100%; left:50%; transform:translateX(-50%);
      background:#1C1915; color:white; padding:6px 10px; border-radius:6px;
      font-size:11px; font-weight:500; white-space:nowrap; pointer-events:none;
      box-shadow:0 2px 8px rgba(0,0,0,.3); z-index:1000; margin-bottom:8px;
      font-family:system-ui,sans-serif; line-height:1.4;
    `;
    el.textContent = text;
    el.style.opacity = "0";
    el.style.transition = "opacity 0.15s";
    return el;
  }, []);

  // ---- Create markers function ----
  const renderMarkers = useCallback((map: maplibregl.Map, locs: typeof mappable, her: typeof herWithCoords, cityMarkers: FamousMarker[], state: string | null, cat: string) => {
    // Clean up existing
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    tooltipsRef.current.forEach(el => el.remove());
    tooltipsRef.current = [];
    popupRef.current?.remove();

    const fLocs = state ? locs.filter(l => l.state === state) : locs;
    let fHer = state ? her.filter(h => h.state === state) : her;
    if (cat !== "all") fHer = fHer.filter(h => h.category === cat);
    const fCities = state ? cityMarkers.filter(c => c.stateCode === state) : cityMarkers;

    // Location markers (circles)
    fLocs.forEach(loc => {
      if (!loc.latitude || !loc.longitude) return;

      const markerWrap = document.createElement("div");
      markerWrap.style.cssText = "position:relative;";

      const el = document.createElement("div");
      el.style.cssText = `
        width:28px; height:28px; border-radius:50%;
        background:${COLORS[loc.type] || "#C2703E"};
        border:3px solid white; box-shadow:0 2px 8px rgba(0,0,0,.25);
        cursor:pointer; transition:transform .15s;
      `;
      markerWrap.appendChild(el);

      // Hover tooltip
      const tooltipText = `${loc.name}\n${loc.state} · ${loc.type}`;
      const tooltip = createTooltip(tooltipText);
      markerWrap.appendChild(tooltip);
      tooltipsRef.current.push(tooltip);

      el.onmouseenter = () => {
        el.style.transform = "scale(1.25)";
        tooltip.style.opacity = "1";
      };
      el.onmouseleave = () => {
        el.style.transform = "scale(1)";
        tooltip.style.opacity = "0";
      };

      const m = new maplibregl.Marker({ element: markerWrap, anchor: "center" })
        .setLngLat([loc.longitude as number, loc.latitude as number])
        .addTo(map);

      el.onclick = (e) => {
        e.stopPropagation();
        popupRef.current?.remove();
        const p = new maplibregl.Popup({ offset: 25, closeButton: true, maxWidth: "320px" })
          .setLngLat([loc.longitude as number, loc.latitude as number])
          .setHTML(`<div id="p-${loc.id}" style="font-family:system-ui,sans-serif"></div>`)
          .addTo(map);
        popupRef.current = p;
        requestAnimationFrame(() => {
          const c = document.getElementById(`p-${loc.id}`);
          if (c) createRoot(c).render(
            <HeritagePopup
              name={loc.name}
              type={loc.type}
              description={loc.description}
              state={loc.state}
              category={loc.type}
              onAskAI={onAskAI}
            />
          );
        });
      };
      markersRef.current.push(m);
    });

    // Heritage markers (diamonds — using clip-path for stable center)
    fHer.forEach(h => {
      const markerWrap = document.createElement("div");
      markerWrap.style.cssText = "position:relative;";

      const el = document.createElement("div");
      el.style.cssText = `
        width:20px; height:20px; border-radius:3px;
        background:#B8963E; border:2px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,.2); cursor:pointer;
        transition:transform .15s; transform:rotate(45deg);
        transform-origin:center center;
      `;
      markerWrap.appendChild(el);

      // Hover tooltip
      const tooltipText = `${h.name}\n${h.state} · ${h.category}`;
      const tooltip = createTooltip(tooltipText);
      markerWrap.appendChild(tooltip);
      tooltipsRef.current.push(tooltip);

      el.onmouseenter = () => {
        el.style.transform = "rotate(45deg) scale(1.3)";
        tooltip.style.opacity = "1";
      };
      el.onmouseleave = () => {
        el.style.transform = "rotate(45deg)";
        tooltip.style.opacity = "0";
      };

      const m = new maplibregl.Marker({ element: markerWrap, anchor: "center" })
        .setLngLat([h.longitude, h.latitude])
        .addTo(map);

      el.onclick = (e) => {
        e.stopPropagation();
        popupRef.current?.remove();
        const p = new maplibregl.Popup({ offset: 25, closeButton: true, maxWidth: "320px" })
          .setLngLat([h.longitude, h.latitude])
          .setHTML(`<div id="ph-${h.id}" style="font-family:system-ui,sans-serif"></div>`)
          .addTo(map);
        popupRef.current = p;
        requestAnimationFrame(() => {
          const c = document.getElementById(`ph-${h.id}`);
          if (c) createRoot(c).render(
            <HeritagePopup
              name={h.name}
              type={h.category}
              description={h.description}
              state={h.state}
              category={h.category}
              onAskAI={onAskAI}
            />
          );
        });
      };
      markersRef.current.push(m);
    });

    // Famous city markers (triangles)
    fCities.forEach(c => {
      const markerWrap = document.createElement("div");
      markerWrap.style.cssText = "position:relative;";

      const el = document.createElement("div");
      el.style.cssText = `
        width:20px; height:20px; border-radius:4px;
        background:#7C3AED; border:2px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,.2); cursor:pointer;
        transition:transform .15s; clip-path:polygon(50% 0%, 0% 100%, 100% 100%);
      `;
      markerWrap.appendChild(el);

      // Hover tooltip
      const tooltipText = `${c.name}\n${c.state}`;
      const tooltip = createTooltip(tooltipText);
      markerWrap.appendChild(tooltip);
      tooltipsRef.current.push(tooltip);

      el.onmouseenter = () => {
        el.style.transform = "scale(1.3)";
        tooltip.style.opacity = "1";
      };
      el.onmouseleave = () => {
        el.style.transform = "scale(1)";
        tooltip.style.opacity = "0";
      };

      const m = new maplibregl.Marker({ element: markerWrap, anchor: "center" })
        .setLngLat([c.longitude, c.latitude])
        .addTo(map);

      markersRef.current.push(m);
    });

    setMarkerCount(markersRef.current.length);
  }, [onAskAI, createTooltip]);

  // ---- Init map ----
  useEffect(() => {
    if (!boxRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: boxRef.current,
      style: buildStyle(),
      center: INDIA_CENTER,
      zoom: INDIA_ZOOM,
      minZoom: 3,
      maxZoom: 18,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), "top-right");

    // Close popup on map click
    map.on("click", () => {
      popupRef.current?.remove();
    });

    mapRef.current = map;

    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      tooltipsRef.current.forEach(el => el.remove());
      tooltipsRef.current = [];
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ---- Update markers when data or filters change ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || mappable.length === 0) return;
    renderMarkers(map, mappable, herWithCoords, famousCityMarkers, selState, catFilter);
  }, [mappable, herWithCoords, famousCityMarkers, selState, catFilter, renderMarkers]);

  // ---- Fly ----
  const flyTo = useCallback((st: StateData | null) => {
    const map = mapRef.current;
    if (!map) return;
    if (!st) {
      map.flyTo({ center: INDIA_CENTER, zoom: INDIA_ZOOM, duration: 1500, essential: true });
      setSelState(null);
    } else {
      setSelState(st.code);
      map.flyTo({ center: st.center, zoom: st.zoom, duration: 1500, essential: true });
    }
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden border border-border bg-card" style={{ height }}>
      <div className="absolute inset-0">
        <div ref={boxRef} style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="absolute left-3 top-3 z-10">
        <StateSelector states={INDIAN_STATES} selectedState={selState} onSelect={flyTo} />
      </div>
      <div className="absolute right-3 top-16 z-10">
        <MapControls onReset={() => flyTo(null)} categoryFilter={catFilter} onCategoryChange={setCatFilter} categories={categories} totalMarkers={markerCount} />
      </div>
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-ivory/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 text-charcoal">
            <div className="h-5 w-5 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading heritage map...</span>
          </div>
        </div>
      )}
      <div className="absolute bottom-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
        <p className="text-[10px] font-semibold text-charcoal mb-1.5 uppercase tracking-wider">Legend</p>
        <div className="flex flex-col gap-1">
          {Object.entries(COLORS).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[10px] text-muted capitalize">{type}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5" style={{ backgroundColor: "#7C3AED", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
            <span className="text-[10px] text-muted">famous city</span>
          </div>
        </div>
      </div>
    </div>
  );
}
