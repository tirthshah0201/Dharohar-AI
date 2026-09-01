/* ============================================
   Astrova — Sources Routes
   ============================================
   API endpoints for source attribution.
   ============================================ */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";

const router = Router();

/**
 * GET /api/sources
 *
 * List all sources, optionally filtered by type.
 * Query params: ?type=UNESCO|ASI|TOURISM|etc.
 */
router.get("/", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const type = req.query.type as string | undefined;

    let sql = "SELECT id, title, author, publisher, url, source_type, verification_status, publication_date, notes, created_at FROM sources";
    const params: unknown[] = [];

    if (type) {
      sql += " WHERE source_type = $1";
      params.push(type);
    }

    sql += " ORDER BY title ASC";

    const { rows } = await query(sql, params);

    res.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (err) {
    console.error("[Sources] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve sources",
      },
    });
  }
});

/**
 * GET /api/sources/:id
 *
 * Get a single source by ID.
 */
router.get("/:id", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { rows } = await query(
      "SELECT id, title, author, publisher, url, source_type, verification_status, publication_date, notes, created_at FROM sources WHERE id = $1",
      [req.params.id]
    );

    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Source not found",
        },
      });
      return;
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error("[Sources] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve source",
      },
    });
  }
});

export { router as sourcesRouter };
