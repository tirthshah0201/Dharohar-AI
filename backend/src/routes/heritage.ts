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
import { isValidSlug, isUUID } from "../utils/slug";

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
    const period = req.query.period as string | undefined;
    const state = req.query.state as string | undefined;
    const q = req.query.q as string | undefined;
    const sortBy = (req.query.sort as string) || "name";
    const sortOrder = (req.query.order as string) || "asc";

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

    let sql = `SELECT he.id, he.name, he.slug, he.category, he.description, he.location_id, he.period_id, he.image_url, he.created_at,
      json_build_object(
        'id', s.id, 'title', s.title, 'publisher', s.publisher, 'url', s.url,
        'source_type', s.source_type, 'verification_status', s.verification_status
      ) as source,
      CASE WHEN l.id IS NOT NULL THEN json_build_object(
        'id', l.id, 'name', l.name, 'state', l.state
      ) ELSE NULL END as location,
      CASE WHEN hp.id IS NOT NULL THEN json_build_object(
        'id', hp.id, 'name', hp.name, 'start_year', hp.start_year, 'end_year', hp.end_year
      ) ELSE NULL END as period
      FROM heritage_entities he
      LEFT JOIN sources s ON he.source_id = s.id
      LEFT JOIN locations l ON he.location_id = l.id
      LEFT JOIN historical_periods hp ON he.period_id = hp.id`;
    const conditions: string[] = [];
    const params: unknown[] = [];
    let paramIndex = 0;

    if (category) {
      paramIndex++;
      conditions.push(`he.category = $${paramIndex}`);
      params.push(category);
    }

    if (period) {
      paramIndex++;
      conditions.push(`hp.id = $${paramIndex}`);
      params.push(period);
    }

    if (state) {
      paramIndex++;
      conditions.push(`l.state = $${paramIndex}`);
      params.push(state);
    }

    if (q && q.trim()) {
      paramIndex++;
      conditions.push(`(he.name ILIKE $${paramIndex} OR he.description ILIKE $${paramIndex} OR he.category ILIKE $${paramIndex})`);
      params.push(`%${q.trim()}%`);
    }

    if (conditions.length > 0) {
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    // Sorting
    let orderClause = "he.name ASC";
    switch (sortBy) {
      case "name-desc":
        orderClause = "he.name DESC";
        break;
      case "state":
        orderClause = "COALESCE(l.state, 'zzz') ASC, he.name ASC";
        break;
      case "category":
        orderClause = "he.category ASC, he.name ASC";
        break;
      case "name":
      default:
        orderClause = sortOrder === "desc" ? "he.name DESC" : "he.name ASC";
        break;
    }
    sql += ` ORDER BY ${orderClause}`;

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
 * GET /api/heritage/state-counts
 *
 * Returns heritage entity counts grouped by state.
 * Must be defined BEFORE /:id to avoid route conflict.
 */
router.get("/state-counts", requireDevelopmentApiKey, async (_req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { rows } = await query(`
      SELECT l.state, COUNT(DISTINCT he.id)::int AS heritage_count
      FROM heritage_entities he
      JOIN locations l ON he.location_id = l.id
      WHERE l.state IS NOT NULL
      GROUP BY l.state
      ORDER BY heritage_count DESC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error("[Heritage] State counts error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve state counts",
      },
    });
  }
});

/**
 * GET /api/heritage/:id
 *
 * Get a single heritage entity by UUID or slug.
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

      const baseSelect = `he.id, he.name, he.slug, he.category, he.description, he.location_id, he.period_id, he.image_url, he.created_at,
          json_build_object(
            'id', s.id, 'title', s.title, 'publisher', s.publisher, 'author', s.author,
            'url', s.url, 'source_type', s.source_type, 'verification_status', s.verification_status,
            'publication_date', s.publication_date, 'retrieved_date', s.retrieved_date
          ) as source,
          CASE WHEN hp.id IS NOT NULL THEN json_build_object(
            'id', hp.id, 'name', hp.name, 'start_year', hp.start_year, 'end_year', hp.end_year, 'description', hp.description
          ) ELSE NULL END as period`;

      if (isUUID(identifier)) {
        // UUID lookup
        sql = `SELECT ${baseSelect}
          FROM heritage_entities he
          LEFT JOIN sources s ON he.source_id = s.id
          LEFT JOIN historical_periods hp ON he.period_id = hp.id
          WHERE he.id = $1`;
        params = [identifier];
      } else if (isValidSlug(identifier)) {
        // Slug lookup
        sql = `SELECT ${baseSelect}
          FROM heritage_entities he
          LEFT JOIN sources s ON he.source_id = s.id
          LEFT JOIN historical_periods hp ON he.period_id = hp.id
          WHERE he.slug = $1`;
        params = [identifier];
      } else {
        res.status(400).json({
          success: false,
          error: {
            code: "INVALID_IDENTIFIER",
            message: "Invalid heritage identifier. Provide a valid UUID or slug.",
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
            message: "Heritage entity not found",
          },
        });
        return;
      }

      const heritage = rows[0];

      // Fetch media for this entity
      const mediaSql = `
        SELECT m.id, m.entity_id, m.type, m.url, m.caption, m.alt_text,
               m.credit, m.display_order, m.is_primary, m.verification_status
        FROM media m
        WHERE m.entity_id = $1
        ORDER BY m.is_primary DESC, m.display_order ASC, m.created_at DESC
      `;
      const { rows: mediaRows } = await query(mediaSql, [heritage.id]);

      // Fetch related heritage from relationships table
      const relatedSql = `
        SELECT DISTINCT ON (he.id) he.id, he.name, he.slug, he.category,
          r.type as relationship_type, r.description as relationship_description
        FROM relationships r
        JOIN heritage_entities he ON (
          (r.source_id = $1 AND he.id = r.target_id) OR
          (r.target_id = $1 AND he.id = r.source_id)
        )
        WHERE r.source_id = $1 OR r.target_id = $1
        ORDER BY he.id, r.type
        LIMIT 6
      `;
      const { rows: relatedRows } = await query(relatedSql, [heritage.id]);

      res.json({
        success: true,
        data: {
          ...heritage,
          media: mediaRows,
          related: relatedRows,
        },
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
    }});

export { router as heritageRouter };
