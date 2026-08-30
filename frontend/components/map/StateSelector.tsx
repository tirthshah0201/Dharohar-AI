"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, ChevronDown, X } from "lucide-react";
import type { StateData } from "@/constants/india";

/* ========================================
   Types
   ======================================== */

interface StateSelectorProps {
  states: StateData[];
  selectedState: string | null;
  onSelect: (state: StateData | null) => void;
}

/* ========================================
   Component
   ======================================== */

export function StateSelector({ states, selectedState, onSelect }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = states.find((s) => s.code === selectedState);

  return (
    <div className="relative">
      {/* Selector row: toggle + clear as siblings */}
      <div className="flex items-center gap-0 bg-white/90 backdrop-blur-sm rounded-lg shadow-md border border-border overflow-hidden">
        {/* Toggle button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-charcoal hover:bg-white/50 transition-colors cursor-pointer"
        >
          <MapPin className="h-4 w-4 text-terracotta" />
          <span className="max-w-[120px] truncate">
            {selected ? selected.name : "All States"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </motion.button>

        {/* Clear button — sibling, not nested */}
        {selected && (
          <button
            type="button"
            aria-label={`Clear ${selected.name} filter`}
            onClick={() => {
              onSelect(null);
              setIsOpen(false);
            }}
            className="px-2 py-2 text-muted hover:text-charcoal hover:bg-gray-100 transition-colors cursor-pointer border-l border-border"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Backdrop — outside AnimatePresence so it always unmounts cleanly */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-1 z-50 w-56 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
            >
              {/* All States option */}
              <button
                onClick={() => {
                  onSelect(null);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors hover:bg-parchment cursor-pointer ${
                  !selectedState ? "bg-parchment font-medium text-charcoal" : "text-muted"
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span>All States</span>
                <span className="ml-auto text-[10px] text-muted">Reset</span>
              </button>

              {/* Divider */}
              <div className="h-px bg-border mx-2" />

              {/* States */}
              <div className="max-h-[280px] overflow-y-auto">
                {states.map((state) => (
                  <button
                    key={state.code}
                    onClick={() => {
                      onSelect(state);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors hover:bg-parchment cursor-pointer ${
                      selectedState === state.code ? "bg-parchment font-medium text-charcoal" : "text-muted"
                    }`}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: state.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="block truncate">{state.name}</span>
                      <span className="block text-[10px] text-muted">{state.heritageCount} sites</span>
                    </div>
                    {selectedState === state.code && (
                      <div className="h-1.5 w-1.5 rounded-full bg-terracotta" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
