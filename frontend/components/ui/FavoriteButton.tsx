"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

/* ========================================
   Favorite Button Component
   ========================================
   Heart toggle button for heritage favorites.
   Uses localStorage-based favorites.
   ======================================== */

interface FavoriteButtonProps {
  heritageId: string;
  size?: "sm" | "md";
  className?: string;
}

export function FavoriteButton({ heritageId, size = "sm", className = "" }: FavoriteButtonProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const favorited = isFavorited(heritageId);

  const sizeClasses = size === "sm"
    ? "h-4 w-4"
    : "h-5 w-5";

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(heritageId);
      }}
      className={`p-1.5 rounded-full transition-colors ${
        favorited
          ? "text-red-500 hover:text-red-600 bg-red-50"
          : "text-muted hover:text-red-400 hover:bg-red-50/50"
      } ${className}`}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`${sizeClasses} ${favorited ? "fill-current" : ""}`} />
    </button>
  );
}
