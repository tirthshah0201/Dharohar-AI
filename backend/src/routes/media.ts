/* ========================================
   Media Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { validateUUID } from "../middleware/validate";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";

const router = Router();

/**
 * GET /api/media
 *
 * List media records, optionally filtered by entity.
 * Query params: ?entity_id={uuid}
 * Requires: X-API-Key header
 */
router.get("/", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const entityId = req.query.entity_id as string | undefined;

    let sql = `
      SELECT m.id, m.entity_id, m.type, m.url, m.caption, m.alt_text, 
             m.credit, m.display_order, m.is_primary, m.verification_status,
             m.created_at,
             s.title as source_title, s.source_type, s.verification_status as source_verification
      FROM media m
      LEFT JOIN sources s ON m.source_id = s.id
    `;
    const params: unknown[] = [];

    if (entityId) {
      sql += " WHERE m.entity_id = $1";
      params.push(entityId);
    }

    sql += " ORDER BY m.is_primary DESC, m.display_order ASC, m.created_at DESC";

    const { rows } = await query(sql, params);

    res.json({
      success: true,
      data: rows,
      total: rows.length,
    });
  } catch (err) {
    console.error("[Media] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve media",
      },
    });
  }
});

/**
 * GET /api/media/:id
 *
 * Get a single media record by ID.
 * Requires: X-API-Key header
 */
router.get("/:id", requireDevelopmentApiKey, validateUUID("id"), async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { id } = req.params;

    const sql = `
      SELECT m.id, m.entity_id, m.type, m.url, m.caption, m.alt_text,
             m.credit, m.display_order, m.is_primary, m.verification_status,
             m.created_at,
             s.title as source_title, s.source_type, s.verification_status as source_verification
      FROM media m
      LEFT JOIN sources s ON m.source_id = s.id
      WHERE m.id = $1
    `;

    const { rows } = await query(sql, [id]);

    if (rows.length === 0) {
      res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Media record not found",
        },
      });
      return;
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error("[Media] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: "DATABASE_ERROR",
        message: "Failed to retrieve media",
      },
    });
  }
});

export { router as mediaRouter };
