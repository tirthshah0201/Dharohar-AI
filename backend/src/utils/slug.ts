/* ============================================
   Astrova — Slug Utilities
   ============================================
   Canonical slug generation and validation.
   Used for human-readable, URL-safe entity identifiers.
   ============================================ */

/**
 * Generate a URL-safe slug from a string.
 *
 * Rules:
 * - lowercase
 * - hyphen-separated
 * - alphanumeric + hyphens only
 * - no leading/trailing hyphens
 * - no consecutive hyphens
 *
 * Examples:
 *   "Rani ki Vav"        → "rani-ki-vav"
 *   "Sanchi Stupa"       → "sanchi-stupa"
 *   "North Malabar"      → "north-malabar"
 *   "Basilica of Bom Jesus" → "basilica-of-bom-jesus"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Remove non-alphanumeric characters (keep spaces and hyphens)
    .replace(/[^a-z0-9\s-]/g, "")
    // Replace spaces with hyphens
    .replace(/\s+/g, "-")
    // Collapse consecutive hyphens
    .replace(/-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}

/**
 * Validate that a string looks like a valid slug.
 * Must be lowercase alphanumeric with hyphens.
 */
export function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value);
}

/**
 * Check if a string looks like a UUID (for fallback routing).
 */
export function isUUID(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}
