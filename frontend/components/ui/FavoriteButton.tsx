"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

/* ========================================
   Favorite Button Component
   ========================================
   Heart toggle button for heritage favorites.
   Supports localStorage (unauthenticated) and
   backend API (authenticated) modes.
   ======================================== */

interface FavoriteButtonProps {
  heritageId: string;
  size?: "sm" | "md";
  className?: string;
}

export function FavoriteButton({ heritageId, size = "sm", className = "" }: FavoriteButtonProps) {
  const { isFavorited, toggleFavorite } = useFavorites();
  const [animating, setAnimating] = useState(false);
  const favorited = isFavorited(heritageId);

  const sizeClasses = size === "sm"
    ? "h-4 w-4"
    : "h-5 w-5";

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (animating) return;
    setAnimating(true);
    try {
      await toggleFavorite(heritageId);
    } finally {
      setAnimating(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={animating}
      className={`p-1.5 rounded-full transition-colors ${animating ? "opacity-50" : ""} ${
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
