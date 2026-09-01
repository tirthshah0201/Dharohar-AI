/* ========================================
   Dharohar AI — Locations Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { validateUUID } from "../middleware/validate";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";
import { isOneOf, VALID_LOCATION_TYPES } from "../utils/validation";
import { isValidSlug, isUUID } from "../utils/slug";

const router = Router();

/**
 * GET /api/locations
 *
 * List all locations, optionally filtered by type.
 * Query params: ?type=state|district|city|village|site
 * Requires: X-API-Key header
 */
router.get("/", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const type = req.query.type as string | undefined;

    if (type && !isOneOf(type, VALID_LOCATION_TYPES)) {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_QUERY_PARAMETER",
          message: `Invalid type parameter. Allowed values: ${VALID_LOCATION_TYPES.join(", ")}`,
        },
      });
      return;
    }

    let sql =
      "SELECT id, name, slug, type, description, latitude, longitude, parent_id, state FROM locations";
    const params: unknown[] = [];

    if (type) {
      sql += " WHERE type = $1";
      params.push(type);
    }

    sql += " ORDER BY name ASC";

    const { rows } = await query(sql, params);

    res.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (err) {
    console.error("[Locations] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve locations",
      },
    });
  }
});

/**
 * GET /api/locations/:id
 *
 * Get a single location by UUID or slug.
 * Requires: X-API-Key header
 * Accepts: UUID or slug string
 */
router.get(
  "/:id",
  requireDevelopmentApiKey,
  async (req, res) => {
    if (!requireDatabase(res)) return;
    try {
      const identifier = String(req.params.id);
      let sql: string;
      let params: unknown[];

      if (isUUID(identifier)) {
        // UUID lookup
        sql = "SELECT id, name, slug, type, description, latitude, longitude, parent_id, state FROM locations WHERE id = $1";
        params = [identifier];
      } else if (isValidSlug(identifier)) {
        // Slug lookup
        sql = "SELECT id, name, slug, type, description, latitude, longitude, parent_id, state FROM locations WHERE slug = $1";
        params = [identifier];
      } else {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_IDENTIFIER",
            message: "Invalid location identifier. Provide a valid UUID or slug.",
          },
        });
        return;
      }

      const { rows } = await query(sql, params);

      if (rows.length === 0) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Location not found",
          },
        });
        return;
      }

      res.json({
        success: true,
        data: rows[0],
      });
    } catch (err) {
      console.error("[Locations] Query error:", (err as Error).message);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Failed to retrieve location",
        },
      });
    }
  }
);

export { router as locationsRouter };
