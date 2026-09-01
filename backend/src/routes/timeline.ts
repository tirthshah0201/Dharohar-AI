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
    // Get periods with their associated heritage entities
    const { rows: periods } = await query(`
      SELECT
        hp.id,
        hp.name,
        hp.start_year,
        hp.end_year,
        hp.description
      FROM historical_periods hp
      ORDER BY hp.start_year ASC
    `);

    // For each period, fetch its heritage entities
    const result = [];
    for (const period of periods) {
      const { rows: entities } = await query(`
        SELECT he.id, he.name, he.slug, he.category, he.description,
          CASE WHEN l.id IS NOT NULL THEN json_build_object(
            'name', l.name, 'state', l.state
          ) ELSE NULL END as location,
          (SELECT m.url FROM media m WHERE m.entity_id = he.id AND m.is_primary = true LIMIT 1) as media_url,
          (SELECT m.alt_text FROM media m WHERE m.entity_id = he.id AND m.is_primary = true LIMIT 1) as media_alt
        FROM heritage_entities he
        LEFT JOIN locations l ON he.location_id = l.id
        WHERE he.period_id = $1
        ORDER BY he.name ASC
      `, [period.id]);

      result.push({
        ...period,
        entity_count: entities.length,
        entities,
      });
    }

    res.json({
      success: true,
      data: result,
      total: result.length,
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
