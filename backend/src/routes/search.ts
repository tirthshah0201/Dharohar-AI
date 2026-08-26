/* ========================================
   Dharohar AI — Search Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";
import {
  isOneOf,
  isValidSearchQuery,
  VALID_HERITAGE_CATEGORIES,
} from "../utils/validation";

const router = Router();

/**
 * GET /api/search?q=<query>&category=<category>
 *
 * Full-text search across heritage entities.
 * Uses PostgreSQL tsvector for efficient text search.
 * Requires: X-API-Key header
 */
router.get("/", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const q = (req.query.q as string) || "";
    const category = req.query.category as string | undefined;

    if (!q.trim()) {
      res.json({
        success: true,
        data: [],
        total: 0,
      });
      return;
    }

    if (!isValidSearchQuery(q)) {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_QUERY_PARAMETER",
          message: "Search query must be between 1 and 500 characters",
        },
      });
      return;
    }

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

    // Build search query using tsvector
    const searchTerm = q.trim();

    let sql = `
      SELECT
        id,
        name,
        category,
        description,
        location_id,
        period_id,
        ts_rank(
          to_tsvector('english', name || ' ' || description),
          plainto_tsquery('english', $1)
        ) AS relevance
      FROM heritage_entities
      WHERE to_tsvector('english', name || ' ' || description)
            @@ plainto_tsquery('english', $1)
    `;
    const params: unknown[] = [searchTerm];

    if (category) {
      sql += " AND category = $" + (params.length + 1);
      params.push(category);
    }

    sql += " ORDER BY relevance DESC LIMIT 50";

    const { rows } = await query(sql, params);

    res.json({
      success: true,
      data: rows,
      total: rows.length,
      query: q,
    });
  } catch (err) {
    console.error("[Search] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Search failed",
      },
    });
  }
});

export { router as searchRouter };
