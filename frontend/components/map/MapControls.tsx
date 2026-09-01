"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Filter, X, Clock } from "lucide-react";

/* ========================================
   Types
   ======================================== */

interface Period {
  id: string;
  name: string;
  start_year: number;
  end_year: number | null;
}

interface MapControlsProps {
  onReset: () => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  periodFilter: string;
  onPeriodChange: (periodId: string) => void;
  periods: Period[];
  totalMarkers: number;
}

/* ========================================
   Component
   ======================================== */

export function MapControls({
  onReset,
  categoryFilter,
  onCategoryChange,
  categories,
  periodFilter,
  onPeriodChange,
  periods,
  totalMarkers,
}: MapControlsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"category" | "period">("category");

  const hasActiveFilter = categoryFilter !== "all" || periodFilter !== "all";

  return (
    <div className="flex flex-col gap-2 items-end">
      {/* Reset button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="flex items-center gap-1.5 px-2.5 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-border text-xs font-medium text-charcoal hover:bg-white transition-colors cursor-pointer"
        title="Reset to India view"
      >
        <RotateCcw className="h-3.5 w-3.5" />
      </motion.button>

      {/* Filter button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowFilters(!showFilters)}
        className={`flex items-center gap-1.5 px-2.5 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border text-xs font-medium transition-colors cursor-pointer ${
          hasActiveFilter
            ? "border-terracotta text-terracotta bg-terracotta/5"
            : "border-border text-charcoal hover:bg-white"
        }`}
        title="Filter by category or period"
      >
        <Filter className="h-3.5 w-3.5" />
      </motion.button>

      {/* Marker count */}
      <div className="px-2.5 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-border text-[10px] text-muted font-medium text-center min-w-[40px]">
        {totalMarkers} markers
      </div>

      {/* Filter dropdown */}
      <AnimatePresence>
        {showFilters && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 4, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 z-50 w-52 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
            >
              {/* Tab header */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab("category")}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === "category"
                      ? "text-terracotta border-b-2 border-terracotta"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  Category
                </button>
                <button
                  onClick={() => setActiveTab("period")}
                  className={`flex-1 px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === "period"
                      ? "text-terracotta border-b-2 border-terracotta"
                      : "text-muted hover:text-charcoal"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1">
                    <Clock className="h-3 w-3" />
                    Period
                  </span>
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-2 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="h-3 w-3 text-muted" />
                </button>
              </div>

              {/* Category tab */}
              {activeTab === "category" && (
                <div className="max-h-[200px] overflow-y-auto">
                  <button
                    onClick={() => {
                      onCategoryChange("all");
                      setShowFilters(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors hover:bg-parchment cursor-pointer ${
                      categoryFilter === "all" ? "bg-parchment font-medium text-charcoal" : "text-muted"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    All Categories
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        onCategoryChange(cat);
                        setShowFilters(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left capitalize transition-colors hover:bg-parchment cursor-pointer ${
                        categoryFilter === cat ? "bg-parchment font-medium text-charcoal" : "text-muted"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-heritage-gold" />
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Period tab */}
              {activeTab === "period" && (
                <div className="max-h-[200px] overflow-y-auto">
                  <button
                    onClick={() => {
                      onPeriodChange("all");
                      setShowFilters(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors hover:bg-parchment cursor-pointer ${
                      periodFilter === "all" ? "bg-parchment font-medium text-charcoal" : "text-muted"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-300" />
                    All Periods
                  </button>

                  {periods.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onPeriodChange(p.id);
                        setShowFilters(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors hover:bg-parchment cursor-pointer ${
                        periodFilter === p.id ? "bg-parchment font-medium text-charcoal" : "text-muted"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-heritage-gold" />
                      <span className="truncate">{p.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
