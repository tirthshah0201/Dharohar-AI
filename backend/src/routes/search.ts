/* ========================================
   ASTROVA — Search Routes
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
 * GET /api/search?q=<query>&category=<category>&state=<state>&type=<type>&sort=<sort>&order=<order>
 *
 * Full-text search across heritage entities and locations.
 * Uses CTE for clean filter composition.
 * Requires: X-API-Key header
 *
 * Sort options: relevance (default), name, state
 * Order: asc (default), desc
 */
router.get("/", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const q = (req.query.q as string) || "";
    const category = req.query.category as string | undefined;
    const state = req.query.state as string | undefined;
    const entityType = req.query.type as string | undefined;
    const period = req.query.period as string | undefined;
    const sortBy = (req.query.sort as string) || "relevance";
    const sortOrder = (req.query.order as string) || "asc";

    if (!q.trim()) {
      res.json({ success: true, data: [], total: 0 });
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

    const searchTerm = q.trim();
    const exactMatch = searchTerm;
    const startsWithPattern = `${searchTerm}%`;
    const containsPattern = `%${searchTerm}%`;

    // Build filters as parameterized WHERE clauses on the CTE
    const filters: string[] = [];
    const params: unknown[] = [exactMatch, startsWithPattern, containsPattern];
    let paramIndex = 3;

    // Heritage branch: match name or description
    // Location branch: match name or description

    if (category) {
      paramIndex++;
      filters.push(`(entity_type = 'heritage' AND category = $${paramIndex}) OR (entity_type = 'location' AND category = $${paramIndex})`);
      params.push(category);
    }

    if (state) {
      paramIndex++;
      filters.push(`state = $${paramIndex}`);
      params.push(state);
    }

    if (entityType && entityType !== "all") {
      paramIndex++;
      filters.push(`entity_type = $${paramIndex}`);
      params.push(entityType);
    }

    if (period) {
      paramIndex++;
      filters.push(`(entity_type = 'heritage' AND period_id = $${paramIndex}) OR entity_type = 'location'`);
      params.push(period);
    }

    const filterClause = filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    // Sort clause
    let orderClause: string;
    switch (sortBy) {
      case "name":
        orderClause = `ORDER BY name ${sortOrder === "desc" ? "DESC" : "ASC"}`;
        break;
      case "state":
        orderClause = `ORDER BY COALESCE(state, 'zzz') ${sortOrder === "desc" ? "DESC" : "ASC"}, relevance DESC`;
        break;
      default:
        orderClause = "ORDER BY relevance DESC";
    }

    const sql = `
      WITH combined AS (
        (
          SELECT
            he.id,
            he.name,
            he.slug,
            he.category,
            he.description,
            he.location_id,
            he.period_id,
            'heritage' AS entity_type,
            l.state,
            l.name AS location_name,
            hp.name AS period_name,
            CASE
              WHEN he.name = $1 THEN 1.0
              WHEN he.name ILIKE $2 THEN 0.9
              WHEN he.name ILIKE $3 THEN 0.7
              WHEN he.description ILIKE $3 THEN 0.4
              WHEN he.description ILIKE $2 THEN 0.3
              ELSE 0.2
            END AS relevance
          FROM heritage_entities he
          LEFT JOIN locations l ON he.location_id = l.id
          LEFT JOIN historical_periods hp ON he.period_id = hp.id
          WHERE he.name ILIKE $2 OR he.description ILIKE $3
        )
        UNION ALL
        (
          SELECT
            l.id,
            l.name,
            l.slug,
            l.type AS category,
            l.description,
            l.id AS location_id,
            NULL::uuid AS period_id,
            'location' AS entity_type,
            l.state,
            l.name AS location_name,
            NULL::varchar AS period_name,
            CASE
              WHEN l.name = $1 THEN 1.0
              WHEN l.name ILIKE $2 THEN 0.9
              WHEN l.name ILIKE $3 THEN 0.7
              WHEN l.description ILIKE $3 THEN 0.4
              WHEN l.description ILIKE $2 THEN 0.3
              ELSE 0.2
            END AS relevance
          FROM locations l
          WHERE l.name ILIKE $2 OR l.description ILIKE $3
        )
      )
      SELECT * FROM combined ${filterClause} ${orderClause} LIMIT 50
    `;

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

/**
 * GET /api/search/suggestions?q=<query>
 *
 * Returns search suggestions for autocomplete.
 * Returns heritage names, states, categories, and periods matching the query.
 */
router.get("/suggestions", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const q = (req.query.q as string || "").trim();
    if (!q || q.length < 2) {
      res.json({ success: true, data: [] });
      return;
    }

    const pattern = `%${q}%`;
    const suggestions: Array<{ type: string; label: string; slug?: string; id?: string }> = [];
    const seen = new Set<string>();

    // Heritage name suggestions
    const heritageRows = await query(
      `SELECT name, slug, id FROM heritage_entities WHERE name ILIKE $1 LIMIT 5`, [pattern]
    );
    for (const r of heritageRows.rows as Array<{ name: string; slug: string; id: string }>) {
      const key = r.name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({ type: "heritage", label: r.name, slug: r.slug, id: r.id });
      }
    }

    // State suggestions
    const stateRows = await query(
      `SELECT DISTINCT l.state FROM locations l WHERE l.state ILIKE $1 LIMIT 3`, [pattern]
    );
    for (const r of stateRows.rows as Array<{ state: string }>) {
      const key = r.state.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({ type: "state", label: r.state });
      }
    }

    // Period suggestions
    const periodRows = await query(
      `SELECT name, id FROM historical_periods WHERE name ILIKE $1 LIMIT 3`, [pattern]
    );
    for (const r of periodRows.rows as Array<{ name: string; id: string }>) {
      const key = r.name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({ type: "period", label: r.name, id: r.id });
      }
    }

    // Category suggestions
    const validCategories = VALID_HERITAGE_CATEGORIES.filter(c => c.toLowerCase().includes(q.toLowerCase()));
    for (const c of validCategories.slice(0, 2)) {
      const key = c.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({ type: "category", label: c.charAt(0).toUpperCase() + c.slice(1) });
      }
    }

    // Collection suggestions
    const collectionRows = await query(
      `SELECT name, slug FROM collections WHERE (name ILIKE $1 OR description ILIKE $1) AND is_active = true LIMIT 2`, [pattern]
    );
    for (const r of collectionRows.rows as Array<{ name: string; slug: string }>) {
      const key = r.name.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        suggestions.push({ type: "collection", label: r.name, slug: r.slug });
      }
    }

    res.json({ success: true, data: suggestions.slice(0, 10) });
  } catch (err) {
    console.error("[Search] Suggestions error:", (err as Error).message);
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to get suggestions" } });
  }
});

export { router as searchRouter };
