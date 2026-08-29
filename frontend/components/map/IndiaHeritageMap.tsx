"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { createRoot } from "react-dom/client";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { INDIAN_STATES, INDIA_CENTER, INDIA_ZOOM, type StateData } from "@/constants/india";
import { API_BASE_URL, DEMO_API_KEY } from "@/constants";
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
const COLORS: Record<string, string> = { state: "#1E1B4B", district: "#C2703E", city: "#B8963E", village: "#2D5016", site: "#B45309" };

export function IndiaHeritageMap({ onAskAI, height = "500px" }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const popupRef = useRef<maplibregl.Popup | null>(null);

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

  // Derived data
  const mappable = useMemo(() =>
    locations.map(l => ({ ...l, latitude: l.latitude ? +l.latitude : null, longitude: l.longitude ? +l.longitude : null }))
      .filter(l => l.latitude && l.longitude),
    [locations]
  );

  const herWithCoords = useMemo(() => {
    return heritage.map(h => {
      const loc = locations.find(l => l.id === h.location_id);
      return loc?.latitude && loc?.longitude
        ? { ...h, latitude: +loc.latitude, longitude: +loc.longitude, state: loc.state }
        : null;
    }).filter(Boolean) as (HeritageEntity & { latitude: number; longitude: number; state: string })[];
  }, [heritage, locations]);

  const categories = useMemo(() => [...new Set(herWithCoords.map(h => h.category))].sort(), [herWithCoords]);

  // ---- Create markers function ----
  const renderMarkers = useCallback((map: maplibregl.Map, locs: typeof mappable, her: typeof herWithCoords, state: string | null, cat: string) => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    popupRef.current?.remove();

    const fLocs = state ? locs.filter(l => l.state === state) : locs;
    let fHer = state ? her.filter(h => h.state === state) : her;
    if (cat !== "all") fHer = fHer.filter(h => h.category === cat);

    fLocs.forEach(loc => {
      const el = document.createElement("div");
      el.style.cssText = `width:28px;height:28px;border-radius:50%;background:${COLORS[loc.type]||"#C2703E"};border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;transition:transform .15s;`;
      el.onmouseenter = () => { el.style.transform = "scale(1.2)"; };
      el.onmouseleave = () => { el.style.transform = "scale(1)"; };
      const m = new maplibregl.Marker({ element: el }).setLngLat([loc.longitude!, loc.latitude!]).addTo(map);
      el.onclick = (e) => {
        e.stopPropagation();
        popupRef.current?.remove();
        const p = new maplibregl.Popup({ offset: 20, closeButton: true, maxWidth: "320px" })
          .setLngLat([loc.longitude!, loc.latitude!])
          .setHTML(`<div id="p-${loc.id}" style="font-family:system-ui,sans-serif"></div>`)
          .addTo(map);
        popupRef.current = p;
        requestAnimationFrame(() => {
          const c = document.getElementById(`p-${loc.id}`);
          if (c) createRoot(c).render(<HeritagePopup name={loc.name} type={loc.type} description={loc.description} state={loc.state} category={loc.type} onAskAI={onAskAI} />);
        });
      };
      markersRef.current.push(m);
    });

    fHer.forEach(h => {
      const el = document.createElement("div");
      el.style.cssText = `width:22px;height:22px;border-radius:4px;background:#B8963E;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.2);cursor:pointer;transition:transform .15s;transform:rotate(45deg);`;
      el.onmouseenter = () => { el.style.transform = "rotate(45deg) scale(1.2)"; };
      el.onmouseleave = () => { el.style.transform = "rotate(45deg)"; };
      const m = new maplibregl.Marker({ element: el }).setLngLat([h.longitude, h.latitude]).addTo(map);
      el.onclick = (e) => {
        e.stopPropagation();
        popupRef.current?.remove();
        const p = new maplibregl.Popup({ offset: 20, closeButton: true, maxWidth: "320px" })
          .setLngLat([h.longitude, h.latitude])
          .setHTML(`<div id="ph-${h.id}" style="font-family:system-ui,sans-serif"></div>`)
          .addTo(map);
        popupRef.current = p;
        requestAnimationFrame(() => {
          const c = document.getElementById(`ph-${h.id}`);
          if (c) createRoot(c).render(<HeritagePopup name={h.name} type={h.category} description={h.description} state={h.state} category={h.category} onAskAI={onAskAI} />);
        });
      };
      markersRef.current.push(m);
    });

    setMarkerCount(markersRef.current.length);
  }, [onAskAI]);

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
    mapRef.current = map;

    return () => {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ---- Update markers when data or filters change ----
  useEffect(() => {
    const map = mapRef.current;
    if (!map || mappable.length === 0) return;
    renderMarkers(map, mappable, herWithCoords, selState, catFilter);
  }, [mappable, herWithCoords, selState, catFilter, renderMarkers]);

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
        </div>
      </div>
    </div>
  );
}
