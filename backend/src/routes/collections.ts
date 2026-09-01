/* ========================================
   Astrova — Collections Routes
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";
import { isValidSlug } from "../utils/slug";

const router = Router();

/**
 * GET /api/collections
 *
 * List all active collections with entity counts and hero media.
 */
router.get("/", requireDevelopmentApiKey, async (_req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { rows } = await query(`
      SELECT
        c.id,
        c.name,
        c.slug,
        c.description,
        c.display_order,
        COUNT(ci.id)::int AS entity_count,
        COALESCE(
          (SELECT m.url FROM media m WHERE m.id = c.hero_media_id LIMIT 1),
          (SELECT m.url FROM collection_items ci2
           JOIN media m ON ci2.heritage_entity_id = m.entity_id AND m.is_primary = true
           WHERE ci2.collection_id = c.id LIMIT 1)
        ) AS hero_image
      FROM collections c
      LEFT JOIN collection_items ci ON c.id = ci.collection_id
      WHERE c.is_active = true
      GROUP BY c.id, c.name, c.slug, c.description, c.display_order
      ORDER BY c.display_order ASC
    `);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("[Collections] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to retrieve collections" },
    });
  }
});

/**
 * GET /api/collections/:slug
 *
 * Get a single collection with its heritage entities.
 */
router.get("/:slug", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const slug = req.params.slug as string;

    if (!isValidSlug(slug)) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_SLUG", message: "Invalid collection slug" },
      });
      return;
    }

    // Get collection
    const { rows: collections } = await query(
      "SELECT * FROM collections WHERE slug = $1 AND is_active = true",
      [slug]
    );

    if (collections.length === 0) {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Collection not found" },
      });
      return;
    }

    const collection = collections[0];

    // Get entities in this collection
    const { rows: entities } = await query(`
      SELECT
        he.id, he.name, he.slug, he.category, he.description,
        CASE WHEN hp.id IS NOT NULL THEN json_build_object(
          'id', hp.id, 'name', hp.name
        ) ELSE NULL END as period,
        CASE WHEN l.id IS NOT NULL THEN json_build_object(
          'name', l.name, 'state', l.state
        ) ELSE NULL END as location,
        (SELECT m.url FROM media m WHERE m.entity_id = he.id AND m.is_primary = true LIMIT 1) as media_url,
        (SELECT m.alt_text FROM media m WHERE m.entity_id = he.id AND m.is_primary = true LIMIT 1) as media_alt
      FROM collection_items ci
      JOIN heritage_entities he ON ci.heritage_entity_id = he.id
      LEFT JOIN historical_periods hp ON he.period_id = hp.id
      LEFT JOIN locations l ON he.location_id = l.id
      WHERE ci.collection_id = $1
      ORDER BY ci.display_order ASC, he.name ASC
    `, [collection.id]);

    res.json({
      success: true,
      data: { ...collection, entities },
    });
  } catch (err) {
    console.error("[Collections] Query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to retrieve collection" },
    });
  }
});

/**
 * GET /api/collections/:slug/related
 *
 * Get related collections based on shared heritage entities.
 */
router.get("/:slug/related", requireDevelopmentApiKey, async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const slug = req.params.slug as string;

    if (!isValidSlug(slug)) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_SLUG", message: "Invalid collection slug" },
      });
      return;
    }

    // Get current collection ID
    const { rows: current } = await query(
      "SELECT id FROM collections WHERE slug = $1 AND is_active = true", [slug]
    );

    if (current.length === 0) {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Collection not found" },
      });
      return;
    }

    const collectionId = current[0].id;

    // Find related collections by shared heritage entities
    const { rows } = await query(`
      SELECT DISTINCT ON (c.id)
        c.id, c.name, c.slug, c.description,
        COUNT(DISTINCT ci2.heritage_entity_id) FILTER (
          WHERE ci2.heritage_entity_id IN (
            SELECT ci.heritage_entity_id FROM collection_items ci WHERE ci.collection_id = $1
          )
        )::int AS shared_count,
        COUNT(ci3.id)::int AS entity_count
      FROM collections c
      LEFT JOIN collection_items ci2 ON c.id = ci2.collection_id
      LEFT JOIN collection_items ci3 ON c.id = ci3.collection_id
      WHERE c.is_active = true AND c.id != $1
      GROUP BY c.id, c.name, c.slug, c.description
      ORDER BY c.id, shared_count DESC, entity_count DESC
      LIMIT 3
    `, [collectionId]);

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("[Collections] Related query error:", (err as Error).message);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to retrieve related collections" },
    });
  }
});

export { router as collectionsRouter };
