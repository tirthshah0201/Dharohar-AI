"use client";

import { useState, useEffect, useCallback } from "react";

/* ========================================
   Astrova — Favorites Hook (Auth-Only)
   ========================================
   Favorites are ONLY for authenticated users.
   No anonymous/localStorage favorites.
   
   Accepts shared auth state from useAuth.
   Backend is the single source of truth.
   ======================================== */

/**
 * Hook for managing heritage favorites.
 * Requires authentication — no anonymous favorites.
 * 
 * Accepts shared auth state from useAuth to avoid
 * duplicate/independent auth checks that can desync.
 */
export function useFavorites(sharedAuthenticated?: boolean, isAuthLoading?: boolean) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // Load backend favorites when authenticated
  const loadBackendFavorites = useCallback(async () => {
    try {
      const res = await fetch("/api/proxy/favorites", { credentials: "include" });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const ids = json.data.map((f: any) => f.heritage_entity_id);
          setFavorites(ids);
        }
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  // React to shared auth state changes
  useEffect(() => {
    // If shared auth state is provided and still loading, wait
    if (isAuthLoading === true) return;

    if (sharedAuthenticated !== undefined) {
      setAuthenticated(sharedAuthenticated);
      if (sharedAuthenticated) {
        loadBackendFavorites();
      } else {
        // Not authenticated — clear favorites (no anonymous storage)
        setFavorites([]);
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
            setFavorites([]);
          }
        } else {
          setAuthenticated(false);
          setFavorites([]);
        }
      } catch {
        setAuthenticated(false);
        setFavorites([]);
      }
      setLoaded(true);
    }
    checkAuth();
  }, [sharedAuthenticated, isAuthLoading, loadBackendFavorites]);

  // Sync localStorage favorites to backend after login
  const syncToBackend = useCallback(async () => {
    if (!authenticated) return;
    
    // Read any legacy localStorage favorites
    let localIds: string[] = [];
    try {
      const stored = localStorage.getItem("astrova_favorites");
      if (stored) localIds = JSON.parse(stored);
    } catch { /* ignore */ }
    
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
          setFavorites(json.data.favoriteIds);
        }
        // Clear legacy localStorage after successful sync
        localStorage.removeItem("astrova_favorites");
      }
    } catch {
      // Sync failure is non-fatal
    } finally {
      setSyncing(false);
    }
  }, [authenticated]);

  const isFavorited = useCallback(
    (heritageId: string) => favorites.includes(heritageId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    async (heritageId: string) => {
      // Only authenticated users can toggle
      if (!authenticated) return;

      const wasFavorited = favorites.includes(heritageId);

      // Optimistic update
      setFavorites((prev) =>
        wasFavorited
          ? prev.filter((id) => id !== heritageId)
          : [...prev, heritageId]
      );

      try {
        const method = wasFavorited ? "DELETE" : "POST";
        const url = `/api/proxy/favorites/${heritageId}`;
        const res = await fetch(url, {
          method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          // Revert on failure
          setFavorites((prev) =>
            wasFavorited
              ? [...prev, heritageId]
              : prev.filter((id) => id !== heritageId)
          );
        }
      } catch {
        // Revert on failure
        setFavorites((prev) =>
          wasFavorited
            ? [...prev, heritageId]
            : prev.filter((id) => id !== heritageId)
        );
      }
    },
    [favorites, authenticated]
  );

  const addFavorite = useCallback(
    async (heritageId: string) => {
      if (!authenticated) return;
      if (favorites.includes(heritageId)) return;

      setFavorites((prev) => [...prev, heritageId]);

      try {
        const res = await fetch(`/api/proxy/favorites/${heritageId}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          setFavorites((prev) => prev.filter((id) => id !== heritageId));
        }
      } catch {
        setFavorites((prev) => prev.filter((id) => id !== heritageId));
      }
    },
    [favorites, authenticated]
  );

  const removeFavorite = useCallback(
    async (heritageId: string) => {
      if (!authenticated) return;

      setFavorites((prev) => prev.filter((id) => id !== heritageId));

      try {
        const res = await fetch(`/api/proxy/favorites/${heritageId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) {
          // Revert on failure — reload from backend
          await loadBackendFavorites();
        }
      } catch {
        await loadBackendFavorites();
      }
    },
    [authenticated, loadBackendFavorites]
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
    refreshFavorites: loadBackendFavorites,
    count: favorites.length,
  };
}
