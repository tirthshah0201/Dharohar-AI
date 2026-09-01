"use client";

import { useState, useEffect, useCallback } from "react";

/* ========================================
   Astrova — Favorites Hook (localStorage)
   ========================================
   Client-side favorites using localStorage.
   No server-side auth required.
   ======================================== */

const FAVORITES_KEY = "astrova_favorites";

function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setFavorites(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or unavailable
  }
}

/**
 * Hook for managing heritage favorites.
 * Uses localStorage for persistence.
 */
export function useFavorites() {
  const [favorites, setFavoritesState] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setFavoritesState(getFavorites());
    setLoaded(true);
  }, []);

  const isFavorited = useCallback(
    (heritageId: string) => favorites.includes(heritageId),
    [favorites]
  );

  const toggleFavorite = useCallback((heritageId: string) => {
    setFavoritesState((prev) => {
      const next = prev.includes(heritageId)
        ? prev.filter((id) => id !== heritageId)
        : [...prev, heritageId];
      setFavorites(next);
      return next;
    });
  }, []);

  const addFavorite = useCallback((heritageId: string) => {
    setFavoritesState((prev) => {
      if (prev.includes(heritageId)) return prev;
      const next = [...prev, heritageId];
      setFavorites(next);
      return next;
    });
  }, []);

  const removeFavorite = useCallback((heritageId: string) => {
    setFavoritesState((prev) => {
      const next = prev.filter((id) => id !== heritageId);
      setFavorites(next);
      return next;
    });
  }, []);

  return {
    favorites,
    loaded,
    isFavorited,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    count: favorites.length,
  };
}
