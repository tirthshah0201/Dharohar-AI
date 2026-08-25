/* ========================================
   Dharohar AI — Locations Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";

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
    let sql = "SELECT id, name, type, description, latitude, longitude, parent_id, state FROM locations";
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
 * Get a single location by ID.
 * Requires: X-API-Key header
 */
router.get("/:id", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { rows } = await query(
      "SELECT id, name, type, description, latitude, longitude, parent_id, state FROM locations WHERE id = $1",
      [req.params.id]
    );

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
});

export { router as locationsRouter };
