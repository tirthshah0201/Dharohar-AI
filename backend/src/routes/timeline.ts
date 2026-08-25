/* ========================================
   Dharohar AI — Timeline Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";

const router = Router();

/**
 * GET /api/timeline
 *
 * List historical periods with heritage entity counts.
 * Requires: X-API-Key header
 */
router.get("/", requireDevelopmentApiKey, async (_req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { rows } = await query(`
      SELECT
        hp.id,
        hp.name,
        hp.start_year,
        hp.end_year,
        hp.description,
        COUNT(he.id)::int AS entity_count
      FROM historical_periods hp
      LEFT JOIN heritage_entities he ON he.period_id = hp.id
      GROUP BY hp.id
      ORDER BY hp.start_year ASC
    `);

    res.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (err) {
    console.error("[Timeline] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve timeline",
      },
    });
  }
});

/**
 * GET /api/timeline/eras
 *
 * List eras as simple label + period objects.
 * Derived from historical_periods table.
 * Requires: X-API-Key header
 */
router.get("/eras", requireDevelopmentApiKey, async (_req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { rows } = await query(
      "SELECT id, name, start_year, end_year FROM historical_periods ORDER BY start_year ASC"
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("[Timeline] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve eras",
      },
    });
  }
});

export { router as timelineRouter };
