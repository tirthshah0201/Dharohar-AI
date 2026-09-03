"use client";

import { useState, useEffect, useCallback } from "react";

/* ========================================
   Astrova — Favorites Hook
   ========================================
   Dual-mode favorites:
   - Unauthenticated: localStorage
   - Authenticated: Neon PostgreSQL via API
   
   On login, localStorage favorites are synced to the backend.
   ======================================== */

const LOCAL_FAVORITES_KEY = "astrova_favorites";

function getLocalFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(LOCAL_FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function setLocalFavorites(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // Storage full or unavailable
  }
}

/**
 * Hook for managing heritage favorites.
 * Uses localStorage for unauthenticated users,
 * backend API for authenticated users.
 * 
 * Accepts shared auth state from useAuth to avoid
 * duplicate/independent auth checks that can desync.
 */
export function useFavorites(sharedAuthenticated?: boolean, isAuthLoading?: boolean) {
  const [favorites, setFavoritesState] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Use shared auth state when available; fall back to independent check only if needed
  useEffect(() => {
    // If shared auth state is provided and still loading, wait
    if (isAuthLoading === true) return;

    if (sharedAuthenticated !== undefined) {
      // Use shared auth state — no independent check needed
      setAuthenticated(sharedAuthenticated);
      if (sharedAuthenticated) {
        loadBackendFavorites();
      } else {
        setFavoritesState(getLocalFavorites());
      }
      setLoaded(true);
      return;
    }

    // Fallback: independent check (only if shared auth not provided)
    async function checkAuth() {
      try {
        const res = await fetch("/api/proxy/auth/me", { credentials: "include" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setAuthenticated(true);
            await loadBackendFavorites();
          } else {
            setAuthenticated(false);
            setFavoritesState(getLocalFavorites());
          }
        } else {
          setAuthenticated(false);
          setFavoritesState(getLocalFavorites());
        }
      } catch {
        setAuthenticated(false);
        setFavoritesState(getLocalFavorites());
      }
      setLoaded(true);
    }
    checkAuth();
  }, [sharedAuthenticated, isAuthLoading]);

  const loadBackendFavorites = useCallback(async () => {
    try {
      const res = await fetch("/api/proxy/favorites", { credentials: "include" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const ids = json.data.map((f: any) => f.heritage_entity_id);
          setFavoritesState(ids);
          setLocalFavorites(ids); // Keep localStorage in sync
        }
      }
    } catch {
      // Fallback to localStorage
      setFavoritesState(getLocalFavorites());
    }
  }, []);

  // Sync localStorage favorites to backend after login
  const syncToBackend = useCallback(async () => {
    const localIds = getLocalFavorites();
    if (localIds.length === 0) return;

    setSyncing(true);
    try {
      const res = await fetch("/api/proxy/favorites/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ heritageIds: localIds }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.favoriteIds) {
          setFavoritesState(json.data.favoriteIds);
          setLocalFavorites(json.data.favoriteIds);
        }
      }
    } catch {
      // Sync failure is non-fatal
    } finally {
      setSyncing(false);
    }
  }, []);

  const isFavorited = useCallback(
    (heritageId: string) => favorites.includes(heritageId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (heritageId: string) => {
      const wasFavorited = favorites.includes(heritageId);

      // Optimistic update
      setFavoritesState((prev) => {
        const next = wasFavorited
          ? prev.filter((id) => id !== heritageId)
          : [...prev, heritageId];
        setLocalFavorites(next);
        return next;
      });

      if (authenticated) {
        try {
          const method = wasFavorited ? "DELETE" : "POST";
          const url = `/api/proxy/favorites/${heritageId}`;
          await fetch(url, {
            method,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          });
        } catch {
          // Revert on failure
          setFavoritesState((prev) => {
            const next = wasFavorited
              ? [...prev, heritageId]
              : prev.filter((id) => id !== heritageId);
            setLocalFavorites(next);
            return next;
          });
        }
      }
    },
    [favorites, authenticated]
  );

  const addFavorite = useCallback(
    (heritageId: string) => {
      if (favorites.includes(heritageId)) return;
      setFavoritesState((prev) => {
        const next = [...prev, heritageId];
        setLocalFavorites(next);
        return next;
      });

      if (authenticated) {
        fetch(`/api/proxy/favorites/${heritageId}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }).catch(() => {});
      }
    },
    [favorites, authenticated]
  );

  const removeFavorite = useCallback(
    (heritageId: string) => {
      setFavoritesState((prev) => {
        const next = prev.filter((id) => id !== heritageId);
        setLocalFavorites(next);
        return next;
      });

      if (authenticated) {
        fetch(`/api/proxy/favorites/${heritageId}`, {
          method: "DELETE",
          credentials: "include",
        }).catch(() => {});
      }
    },
    [authenticated]
  );

  return {
    favorites,
    loaded,
    authenticated,
    syncing,
    isFavorited,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    syncToBackend,
    refreshFavorites: authenticated ? loadBackendFavorites : () => setFavoritesState(getLocalFavorites()),
    count: favorites.length,
  };
}
