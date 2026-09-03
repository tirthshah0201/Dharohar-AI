"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

/* ========================================
   Favorite Button Component
   ========================================
   Authenticated: toggles favorite via backend API.
   Unauthenticated: shows login-required prompt.
   
   NEVER creates favorites for anonymous users.
   ======================================== */

interface FavoriteButtonProps {
  heritageId: string;
  /** Current favorite state from parent (optional, for controlled usage) */
  isFavorited?: boolean;
  /** Callback when favorite state changes */
  onToggle?: (heritageId: string) => void;
  /** Whether a toggle request is in progress */
  isLoading?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function FavoriteButton({
  heritageId,
  isFavorited: controlledFavorited,
  onToggle,
  isLoading: controlledLoading,
  size = "sm",
  className = "",
}: FavoriteButtonProps) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [animating, setAnimating] = useState(false);

  const isAuthenticated = !!user;
  const favorited = controlledFavorited ?? false;
  const loading = controlledLoading ?? animating;

  const sizeClasses = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    // If not authenticated, show login prompt
    if (!isAuthenticated && !authLoading) {
      setShowLoginPrompt(true);
      return;
    }

    // If still loading auth, ignore click
    if (authLoading) return;

    // If already loading, ignore
    if (loading) return;

    // Authenticated — toggle favorite
    if (onToggle) {
      setAnimating(true);
      try {
        onToggle(heritageId);
      } finally {
        setAnimating(false);
      }
    }
  }

  function handleLogin() {
    setShowLoginPrompt(false);
    router.push("/auth");
  }

  function handleCreateAccount() {
    setShowLoginPrompt(false);
    router.push("/auth");
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading || authLoading}
        className={`p-1.5 rounded-full transition-colors ${loading ? "opacity-50" : ""} ${
          favorited
            ? "text-red-500 hover:text-red-600 bg-red-50"
            : "text-muted hover:text-red-400 hover:bg-red-50/50"
        } ${className}`}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`${sizeClasses} ${favorited ? "fill-current" : ""}`} />
      </button>

      {/* Login Required Prompt */}
      {showLoginPrompt && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={() => setShowLoginPrompt(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <Heart className="h-5 w-5 text-terracotta" />
              <h3 className="font-display text-lg text-charcoal">Login Required</h3>
            </div>
            <p className="text-sm text-muted mb-5">
              Please sign in to your Astrova account to save heritage places to your favorites.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleLogin}
                className="flex-1 px-4 py-2 rounded-lg bg-terracotta text-white text-sm font-medium hover:bg-terracotta-dark transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={handleCreateAccount}
                className="flex-1 px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-charcoal transition-colors"
              >
                Create Account
              </button>
            </div>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="w-full mt-2 px-4 py-1.5 text-xs text-muted hover:text-charcoal transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
