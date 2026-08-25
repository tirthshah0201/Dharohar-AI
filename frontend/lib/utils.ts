/* ========================================
   Dharohar AI — Utility Functions
   ======================================== */

/**
 * Combine class names conditionally (simple clsx alternative).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a number with locale-specific formatting.
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

/**
 * Truncate text to a maximum length.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert a heritage category to a human-readable label.
 */
export function categoryLabel(category: string): string {
  return capitalize(category.replace(/_/g, " "));
}
