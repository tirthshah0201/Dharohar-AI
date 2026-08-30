"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Sparkles, ExternalLink, Navigation } from "lucide-react";
import type { MapFeature } from "@/services/map/map-data";

/* ========================================
   Types
   ======================================== */

interface MapDetailPanelProps {
  feature: MapFeature | null;
  onClose: () => void;
  onAskAI?: (ctx: { name: string; state: string; category: string }) => void;
}

/* ========================================
   Helpers
   ======================================== */

const TYPE_LABELS: Record<string, string> = {
  state: "State",
  region: "Region",
  district: "District",
  city: "City",
  village: "Village",
  site: "Heritage Site",
  waterfall: "Waterfall",
  river: "River",
  lake: "Lake",
  gorge: "Gorge",
  mountain: "Mountain",
  beach: "Beach",
  backwater: "Backwater",
  wildlife_area: "Wildlife Area",
  cultural_site: "Cultural Site",
  natural_landmark: "Natural Landmark",
};

const TYPE_COLORS: Record<string, string> = {
  state: "#1E1B4B",
  region: "#6D28D9",
  district: "#C2703E",
  city: "#B8963E",
  village: "#2D5016",
  site: "#B45309",
  waterfall: "#0891B2",
  river: "#2563EB",
  lake: "#0284C7",
  gorge: "#475569",
  mountain: "#6B7280",
  beach: "#0EA5E9",
  backwater: "#0284C7",
  wildlife_area: "#DC2626",
  cultural_site: "#7C3AED",
  natural_landmark: "#059669",
};

/* ========================================
   Component
   ======================================== */

export function MapDetailPanel({
  feature,
  onClose,
  onAskAI,
}: MapDetailPanelProps) {
  const typeKey = feature?.type || feature?.category || "heritage";
  const typeLabel = TYPE_LABELS[typeKey] || typeKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const typeColor = TYPE_COLORS[typeKey] || "#C2703E";

  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          key="detail-panel"
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="absolute right-0 top-0 bottom-0 z-20 w-full sm:w-80 md:w-96
                     bg-white/95 backdrop-blur-md shadow-2xl shadow-black/10
                     border-l border-border overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-30 h-8 w-8 flex items-center justify-center
                       rounded-full bg-white/80 hover:bg-white border border-border
                       text-muted hover:text-charcoal transition-colors shadow-sm"
            aria-label="Close detail panel"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header with colored accent */}
          <div className="relative px-5 pt-5 pb-4">
            {/* Color accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: typeColor }}
            />

            {/* Type badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: typeColor }}
              >
                <Navigation className="h-3 w-3" />
                {typeLabel}
              </span>
            </div>

            {/* Name */}
            <h2 className="font-display text-xl sm:text-2xl text-charcoal leading-tight mb-1">
              {feature.name}
            </h2>

            {/* State */}
            <div className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-3.5 w-3.5" />
              <span>{feature.state}</span>
            </div>
          </div>

          {/* Description */}
          {feature.description && (
            <div className="px-5 pb-4">
              <p className="text-sm text-charcoal/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          )}

          {/* Coordinates */}
          <div className="px-5 pb-4">
            <div className="flex items-center gap-2 text-xs text-muted bg-parchment/60 rounded-lg px-3 py-2">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>
                {feature.latitude.toFixed(4)}°N, {feature.longitude.toFixed(4)}°E
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-border" />

          {/* Actions */}
          <div className="px-5 py-4 space-y-2">
            <button
              onClick={() =>
                onAskAI?.({
                  name: feature.name,
                  state: feature.state,
                  category: typeKey,
                })
              }
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                         bg-terracotta text-white text-sm font-semibold rounded-lg
                         hover:bg-terracotta-dark transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Ask Astrova about {feature.name}
            </button>

            <a
              href={`/ai?question=Tell me about ${encodeURIComponent(feature.name)} in ${encodeURIComponent(feature.state)}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                         border border-border text-charcoal text-sm font-medium rounded-lg
                         hover:bg-parchment transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Learn more in chat
            </a>
          </div>

          {/* Footer hint */}
          <div className="px-5 pb-4">
            <p className="text-[11px] text-muted/60 text-center">
              Click other markers on the map to explore more locations
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
