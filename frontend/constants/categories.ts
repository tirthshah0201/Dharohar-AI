/* ========================================
   Astrova — Shared Category Constants
   ========================================
   Centralized category icons, colors, and labels.
   Import from this file instead of redefining locally.
   ======================================== */

import {
  Landmark,
  Users,
  Palette,
  Calendar,
  Clock,
  UtensilsCrossed,
  BookOpen,
  Theater,
  Compass,
  MapPin,
} from "lucide-react";

/* ---- Category Icons ---- */

export const categoryIcons: Record<string, typeof Landmark> = {
  monument: Landmark,
  craft: Palette,
  person: Users,
  festival: Calendar,
  architecture: Landmark,
  event: Clock,
  food: UtensilsCrossed,
  community: Users,
  tradition: BookOpen,
  natural_landmark: Compass,
  waterfall: Compass,
  lake: Compass,
  river: Compass,
  mountain: Compass,
  gorge: Compass,
  beach: Compass,
  backwater: Compass,
  cultural_site: Landmark,
  wildlife: Compass,
  eco_tourism: Compass,
  adventure: Compass,
};

/* ---- Category Colors (for badge/icon backgrounds) ---- */

export const categoryColors: Record<string, string> = {
  monument: "bg-terracotta/10 text-terracotta",
  craft: "bg-heritage-gold/10 text-heritage-gold",
  person: "bg-terracotta-dark/10 text-terracotta-dark",
  festival: "bg-terracotta-light/10 text-terracotta-dark",
  architecture: "bg-terracotta/10 text-terracotta",
  event: "bg-terracotta-dark/10 text-terracotta-dark",
  food: "bg-heritage-gold/10 text-heritage-gold",
  community: "bg-terracotta-light/10 text-terracotta-dark",
  tradition: "bg-heritage-gold/10 text-heritage-gold",
  natural_landmark: "bg-terracotta/10 text-terracotta",
  waterfall: "bg-terracotta/10 text-terracotta",
  lake: "bg-terracotta/10 text-terracotta",
  river: "bg-terracotta/10 text-terracotta",
  mountain: "bg-terracotta/10 text-terracotta",
  gorge: "bg-terracotta/10 text-terracotta",
  beach: "bg-terracotta/10 text-terracotta",
  backwater: "bg-terracotta/10 text-terracotta",
  cultural_site: "bg-terracotta/10 text-terracotta",
  wildlife: "bg-terracotta/10 text-terracotta",
  eco_tourism: "bg-terracotta/10 text-terracotta",
  adventure: "bg-terracotta/10 text-terracotta",
};

/* ---- Category Labels (for display) ---- */

export const categoryLabels: Record<string, string> = {
  monument: "Monument",
  craft: "Craft",
  person: "Person",
  festival: "Festival",
  architecture: "Architecture",
  event: "Event",
  food: "Food",
  community: "Community",
  tradition: "Tradition",
  natural_landmark: "Natural Landmark",
  waterfall: "Waterfall",
  lake: "Lake",
  river: "River",
  mountain: "Mountain",
  gorge: "Gorge",
  beach: "Beach",
  backwater: "Backwater",
  cultural_site: "Cultural Site",
  wildlife: "Wildlife",
  eco_tourism: "Eco Tourism",
  adventure: "Adventure",
};

/* ---- Helper: get icon for a category ---- */

export function getCategoryIcon(category: string): typeof Landmark {
  return categoryIcons[category] || Landmark;
}

/* ---- Helper: get color class for a category ---- */

export function getCategoryColor(category: string): string {
  return categoryColors[category] || "bg-terracotta/10 text-terracotta";
}

/* ---- Helper: get label for a category ---- */

export function getCategoryLabel(category: string): string {
  return categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1);
}
