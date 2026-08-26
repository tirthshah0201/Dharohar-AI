/* ========================================
   Dharohar AI — Validation Utilities
   ========================================

   Reusable validation functions for API input.
   ======================================== */

/**
 * Standard UUID regex (RFC 4122).
 * Accepts any UUID version: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
 * Used for validating user-supplied IDs before database queries.
 */
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Validate that a string is a valid UUID (any version).
 */
export function isValidUUID(value: string): boolean {
  return UUID_REGEX.test(value);
}

/** Allowed location types (matches DB CHECK constraint) */
export const VALID_LOCATION_TYPES = [
  "state",
  "district",
  "city",
  "village",
  "site",
] as const;

/** Allowed heritage categories (matches DB CHECK constraint) */
export const VALID_HERITAGE_CATEGORIES = [
  "monument",
  "person",
  "craft",
  "tradition",
  "festival",
  "architecture",
  "event",
  "food",
  "community",
] as const;

/**
 * Validate that a value is one of the allowed options.
 */
export function isOneOf<T extends readonly string[]>(
  value: string,
  allowed: T
): value is T[number] {
  return (allowed as readonly string[]).includes(value);
}

/**
 * Validate search query length.
 * Rejects empty strings after trimming and overly long queries.
 */
export function isValidSearchQuery(value: string): boolean {
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= 500;
}
