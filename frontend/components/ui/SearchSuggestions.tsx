"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Search, Landmark, MapPin, Clock, Tag, BookOpen, Loader2 } from "lucide-react";
import { api } from "@/services/api";

/* ========================================
   Types
   ======================================== */

interface Suggestion {
  type: "heritage" | "state" | "period" | "category" | "collection";
  label: string;
  slug?: string;
  id?: string;
}

interface SearchSuggestionsProps {
  query: string;
  onSelect?: () => void;
  className?: string;
}

/* ========================================
   Type icons and labels
   ======================================== */

const TYPE_CONFIG: Record<string, { icon: typeof Landmark; color: string; label: string }> = {
  heritage: { icon: Landmark, color: "text-heritage-gold", label: "Heritage" },
  state: { icon: MapPin, color: "text-terracotta", label: "State" },
  period: { icon: Clock, color: "text-heritage-gold", label: "Period" },
  category: { icon: Tag, color: "text-terracotta-dark", label: "Category" },
  collection: { icon: BookOpen, color: "text-terracotta", label: "Collection" },
};

/* ========================================
   Component
   ======================================== */

export function SearchSuggestions({ query, onSelect, className = "" }: SearchSuggestionsProps) {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    timeoutId = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get<{ success: boolean; data: Suggestion[] }>(
          `/search/suggestions?q=${encodeURIComponent(query.trim())}`
        );
        if (!cancelled && res.success && res.data.length > 0) {
          setSuggestions(res.data);
          setOpen(true);
          setActiveIndex(-1);
        } else if (!cancelled) {
          setSuggestions([]);
          setOpen(false);
        }
      } catch {
        if (!cancelled) {
          setSuggestions([]);
          setOpen(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to suggestion
  const handleSelect = useCallback((s: Suggestion) => {
    setOpen(false);
    onSelect?.();
    if (s.type === "heritage" && s.slug) {
      router.push(`/heritage/${s.slug}`);
    } else if (s.type === "state") {
      router.push(`/heritage?state=${encodeURIComponent(s.label)}`);
    } else if (s.type === "period" && s.id) {
      router.push(`/heritage?period=${s.id}`);
    } else if (s.type === "category") {
      router.push(`/heritage?category=${encodeURIComponent(s.label.toLowerCase())}`);
    } else if (s.type === "collection" && s.slug) {
      router.push(`/collections/${s.slug}`);
    }
  }, [router, onSelect]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex(i => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(i => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }, [open, suggestions, activeIndex, handleSelect]);

  if (!open || suggestions.length === 0) return null;

  return (
    <div ref={containerRef} className={`relative ${className}`} onKeyDown={handleKeyDown}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg border border-border overflow-hidden"
        >
          <div ref={listRef} className="max-h-72 overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-3 text-muted">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-xs">Searching...</span>
              </div>
            )}
            {!loading && suggestions.map((s, i) => {
              const config = TYPE_CONFIG[s.type] || TYPE_CONFIG.heritage;
              const Icon = config.icon;
              const isActive = i === activeIndex;
              return (
                <button
                  key={`${s.type}-${s.label}`}
                  onClick={() => handleSelect(s)}
                  onMouseEnter={() => setActiveIndex(i)}
                  onTouchEnd={() => handleSelect(s)}
                  className={`w-full flex items-center gap-3 px-4 py-3 sm:py-2.5 text-left transition-colors min-h-[44px] ${
                    isActive ? "bg-parchment" : "hover:bg-parchment/50"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${config.color}`} />
                  <div className="min-w-0 flex-1">
                    <span className="text-sm text-charcoal truncate block">{s.label}</span>
                  </div>
                  <span className="text-[10px] text-muted shrink-0 capitalize">{config.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
