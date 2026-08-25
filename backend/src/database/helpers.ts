/* ========================================
   Dharohar AI — Database Helpers
   ========================================

   Utility functions for database-aware route handlers.
   ======================================== */

import { Response } from "express";

/**
 * Check if DATABASE_URL is configured.
 * Sends an error response and returns false if not configured.
 * Returns true if configured (caller should proceed with query).
 */
export function requireDatabase(res: Response): boolean {
  if (!process.env.DATABASE_URL) {
    res.status(503).json({
      success: false,
      error: {
        code: "DATABASE_NOT_CONFIGURED",
        message:
          "Database is not configured. Set DATABASE_URL in your .env file. See docs/database/neon-setup.md.",
      },
    });
    return false;
  }
  return true;
}
