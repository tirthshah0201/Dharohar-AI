"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, Filter, X } from "lucide-react";

/* ========================================
   Types
   ======================================== */

interface MapControlsProps {
  onReset: () => void;
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
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
  totalMarkers,
}: MapControlsProps) {
  const [showFilters, setShowFilters] = useState(false);

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
          categoryFilter !== "all"
            ? "border-terracotta text-terracotta bg-terracotta/5"
            : "border-border text-charcoal hover:bg-white"
        }`}
        title="Filter by category"
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
              className="absolute right-0 top-12 z-50 w-44 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-border flex items-center justify-between">
                <span className="text-xs font-semibold text-charcoal">Category</span>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-0.5 rounded hover:bg-gray-100 cursor-pointer"
                >
                  <X className="h-3 w-3 text-muted" />
                </button>
              </div>

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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
