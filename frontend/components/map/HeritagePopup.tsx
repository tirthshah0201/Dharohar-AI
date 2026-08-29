"use client";

import { MapPin, Bot, ExternalLink } from "lucide-react";

/* ========================================
   Types
   ======================================== */

interface HeritagePopupProps {
  name: string;
  type: string;
  description: string;
  state: string;
  category: string;
  onAskAI?: (context: { name: string; state: string; category: string }) => void;
}

/* ========================================
   Helpers
   ======================================== */

const CATEGORY_ICONS: Record<string, string> = {
  state: "🗺️",
  district: "🏘️",
  city: "🏙️",
  village: "🏡",
  site: "🏛️",
  monument: "🏛️",
  temple: "🛕",
  fort: "🏰",
  museum: "🏛️",
  craft: "🎨",
  festival: "🎭",
};

/* ========================================
   Component
   ======================================== */

export function HeritagePopup({
  name,
  type,
  description,
  state,
  category,
  onAskAI,
}: HeritagePopupProps) {
  const icon = CATEGORY_ICONS[category] || CATEGORY_ICONS[type] || "📍";

  return (
    <div className="p-0 min-w-[220px] max-w-[280px]" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <div className="px-3 pt-3 pb-2 border-b border-gray-100">
        <div className="flex items-start gap-2">
          <span className="text-lg mt-0.5">{icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-gray-900 leading-tight">{name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="h-3 w-3 text-gray-400" />
              <span className="text-[11px] text-gray-500">{state}</span>
              <span className="text-[11px] text-gray-300">·</span>
              <span className="text-[11px] text-amber-600 font-medium capitalize">{type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="px-3 py-2">
          <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{description}</p>
        </div>
      )}

      {/* Actions */}
      <div className="px-3 pb-3 flex gap-2">
        <button
          onClick={() => onAskAI?.({ name, state, category: type })}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
        >
          <Bot className="h-3 w-3" />
          Ask AI
        </button>
        <a
          href={`/heritage/${name.toLowerCase().replace(/\s+/g, "-")}`}
          className="flex items-center justify-center gap-1 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-md hover:bg-gray-50 transition-colors"
        >
          <ExternalLink className="h-3 w-3" />
          Details
        </a>
      </div>
    </div>
  );
}
