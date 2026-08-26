/* ========================================
   Dharohar AI — Heritage Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { validateUUID } from "../middleware/validate";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";
import {
  isOneOf,
  VALID_HERITAGE_CATEGORIES,
} from "../utils/validation";

const router = Router();

/**
 * GET /api/heritage
 *
 * List heritage entities, optionally filtered by category.
 * Query params: ?category=monument|craft|festival|etc.
 * Requires: X-API-Key header
 */
router.get("/", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const category = req.query.category as string | undefined;

    if (category && !isOneOf(category, VALID_HERITAGE_CATEGORIES)) {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_QUERY_PARAMETER",
          message: `Invalid category parameter. Allowed values: ${VALID_HERITAGE_CATEGORIES.join(", ")}`,
        },
      });
      return;
    }

    let sql =
      "SELECT id, name, category, description, location_id, period_id, created_at FROM heritage_entities";
    const params: unknown[] = [];

    if (category) {
      sql += " WHERE category = $1";
      params.push(category);
    }

    sql += " ORDER BY name ASC";

    const { rows } = await query(sql, params);

    res.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (err) {
    console.error("[Heritage] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve heritage entities",
      },
    });
  }
});

/**
 * GET /api/heritage/:id
 *
 * Get a single heritage entity by UUID.
 * Requires: X-API-Key header
 * Validates: UUID format before query
 */
router.get(
  "/:id",
  requireDevelopmentApiKey,
  validateUUID("id"),
  async (req, res) => {
    if (!requireDatabase(res)) return;
    try {
      const { rows } = await query(
        "SELECT id, name, category, description, location_id, period_id, created_at FROM heritage_entities WHERE id = $1",
        [req.params.id]
      );

      if (rows.length === 0) {
        res.status(404).json({
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Heritage entity not found",
          },
        });
        return;
      }

      res.json({
        success: true,
        data: rows[0],
      });
    } catch (err) {
      console.error("[Heritage] Query error:", (err as Error).message);
      res.status(500).json({
        success: false,
        error: {
          code: "DATABASE_ERROR",
          message: "Failed to retrieve heritage entity",
        },
      });
    }
  }
);

export { router as heritageRouter };
