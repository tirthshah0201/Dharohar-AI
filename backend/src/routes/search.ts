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

    // Build search query using ILIKE for flexible matching.
    // plainto_tsquery uses English stemming which often misses Indian place names;
    // ILIKE with wildcards gives substring matching for all languages.
    const searchTerm = q.trim();
    const likePattern = `%${searchTerm}%`;

    let sql = `
      (
        SELECT
          he.id,
          he.name,
          he.category,
          he.description,
          he.location_id,
          he.period_id,
          CASE
            WHEN he.name ILIKE $1 THEN 1.0
            WHEN he.name ILIKE $2 THEN 0.8
            ELSE 0.5
          END AS relevance
        FROM heritage_entities he
        WHERE he.name ILIKE $2
           OR he.description ILIKE $2
      )
      UNION ALL
      (
        SELECT
          l.id,
          l.name,
          l.type AS category,
          l.description,
          l.parent_id AS location_id,
          NULL::uuid AS period_id,
          CASE
            WHEN l.name ILIKE $1 THEN 1.0
            WHEN l.name ILIKE $2 THEN 0.8
            ELSE 0.5
          END AS relevance
        FROM locations l
        WHERE l.name ILIKE $2
           OR l.description ILIKE $2
      )
    `;
    const params: unknown[] = [searchTerm, likePattern];

    if (category) {
      sql = `SELECT * FROM (${sql}) AS combined WHERE category = $3 ORDER BY relevance DESC LIMIT 50`;
      params.push(category);
    } else {
      sql += " ORDER BY relevance DESC LIMIT 50";
    }

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
