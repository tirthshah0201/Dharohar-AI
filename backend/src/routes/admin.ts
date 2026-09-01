/* ========================================
   Astrova — Admin API Routes
   ========================================
   Admin-only endpoints for heritage management,
   collection editorial, and analytics.
   ======================================== */

import { Router } from "express";
import { requireAdmin } from "../middleware/admin";
import { query } from "../database";
import { requireDatabase } from "../database/helpers";

const router = Router();

// All admin routes require admin authorization
router.use(requireAdmin);

// ---- ADMIN OVERVIEW ----

/**
 * GET /api/admin/overview
 * Dashboard overview with counts
 */
router.get("/overview", async (_req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const counts = await Promise.all([
      query("SELECT count(*) FROM heritage_entities"),
      query("SELECT count(*) FROM media"),
      query("SELECT count(*) FROM relationships"),
      query("SELECT count(*) FROM collections"),
      query("SELECT count(*) FROM collection_items"),
      query("SELECT count(*) FROM chatbot_knowledge"),
      query("SELECT count(*) FROM supported_states"),
      query("SELECT count(*) FROM historical_periods"),
      query("SELECT count(*) FROM analytics_events"),
    ]);

    res.json({
      success: true,
      data: {
        heritage_entities: parseInt(String(counts[0].rows[0].count)),
        media: parseInt(String(counts[1].rows[0].count)),
        relationships: parseInt(String(counts[2].rows[0].count)),
        collections: parseInt(String(counts[3].rows[0].count)),
        collection_items: parseInt(String(counts[4].rows[0].count)),
        chatbot_knowledge: parseInt(String(counts[5].rows[0].count)),
        supported_states: parseInt(String(counts[6].rows[0].count)),
        historical_periods: parseInt(String(counts[7].rows[0].count)),
        analytics_events: parseInt(String(counts[8].rows[0].count)),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to load overview" } });
  }
});

// ---- ADMIN HERITAGE ----

/**
 * GET /api/admin/heritage
 * List heritage entities with filtering
 */
router.get("/heritage", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const q = (req.query.q as string) || "";
    const category = req.query.category as string | undefined;
    const state = req.query.state as string | undefined;
    const period = req.query.period as string | undefined;

    let sql = `SELECT he.id, he.name, he.slug, he.category, he.description, he.period_id, he.location_id,
      l.state, l.name as location_name,
      hp.name as period_name
    FROM heritage_entities he
    LEFT JOIN locations l ON he.location_id = l.id
    LEFT JOIN historical_periods hp ON he.period_id = hp.id`;
    const conditions: string[] = [];
    const params: unknown[] = [];
    let idx = 0;

    if (q) { idx++; conditions.push(`(he.name ILIKE $${idx} OR he.description ILIKE $${idx})`); params.push(`%${q}%`); }
    if (category) { idx++; conditions.push(`he.category = $${idx}`); params.push(category); }
    if (state) { idx++; conditions.push(`l.state = $${idx}`); params.push(state); }
    if (period) { idx++; conditions.push(`he.period_id = $${idx}`); params.push(period); }

    if (conditions.length) sql += ` WHERE ${conditions.join(" AND ")}`;
    sql += ` ORDER BY he.name ASC LIMIT 100`;

    const { rows } = await query(sql, params);
    res.json({ success: true, data: rows, total: rows.length });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to list heritage" } });
  }
});

/**
 * PUT /api/admin/heritage/:id
 * Update a heritage entity
 */
router.put("/heritage/:id", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const id = req.params.id;
    const { name, category, description, period_id, location_id } = req.body;

    // Validate
    if (!name || !category) {
      res.status(400).json({ success: false, error: { code: "INVALID_PAYLOAD", message: "name and category are required" } });
      return;
    }

    // Check existence
    const { rows: existing } = await query("SELECT id FROM heritage_entities WHERE id = $1", [id]);
    if (existing.length === 0) {
      res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Heritage entity not found" } });
      return;
    }

    await query(
      `UPDATE heritage_entities SET name=$1, category=$2, description=$3, period_id=$4, location_id=$5 WHERE id=$6`,
      [name, category, description || "", period_id || null, location_id || null, id]
    );

    res.json({ success: true, message: "Heritage entity updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to update heritage" } });
  }
});

// ---- ADMIN COLLECTIONS ----

/**
 * GET /api/admin/collections
 * List collections with full details
 */
router.get("/collections", async (_req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { rows } = await query(`
      SELECT c.*, COUNT(ci.id)::int AS entity_count,
        COALESCE(
          (SELECT m.url FROM media m WHERE m.id = c.hero_media_id LIMIT 1),
          (SELECT m.url FROM collection_items ci2 JOIN media m ON ci2.heritage_entity_id = m.entity_id AND m.is_primary = true WHERE ci2.collection_id = c.id LIMIT 1)
        ) AS hero_image
      FROM collections c
      LEFT JOIN collection_items ci ON c.id = ci.collection_id
      GROUP BY c.id
      ORDER BY c.display_order ASC
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to list collections" } });
  }
});

/**
 * POST /api/admin/collections
 * Create a new collection
 */
router.post("/collections", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { name, slug, description, display_order, hero_media_id } = req.body;
    if (!name || !slug) {
      res.status(400).json({ success: false, error: { code: "INVALID_PAYLOAD", message: "name and slug are required" } });
      return;
    }

    // Check duplicate slug
    const { rows: existing } = await query("SELECT id FROM collections WHERE slug = $1", [slug]);
    if (existing.length > 0) {
      res.status(409).json({ success: false, error: { code: "DUPLICATE_SLUG", message: "Collection slug already exists" } });
      return;
    }

    const { rows } = await query(
      `INSERT INTO collections (name, slug, description, display_order, hero_media_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, slug, description || "", display_order || 0, hero_media_id || null]
    );

    res.status(201).json({ success: true, data: { id: rows[0].id } });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to create collection" } });
  }
});

/**
 * PUT /api/admin/collections/:id
 * Update a collection
 */
router.put("/collections/:id", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const id = req.params.id;
    const { name, slug, description, display_order, is_active, hero_media_id } = req.body;

    const { rows: existing } = await query("SELECT id FROM collections WHERE id = $1", [id]);
    if (existing.length === 0) {
      res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Collection not found" } });
      return;
    }

    await query(
      `UPDATE collections SET name=COALESCE($1,name), slug=COALESCE($2,slug),
       description=COALESCE($3,description), display_order=COALESCE($4,display_order),
       is_active=COALESCE($5,is_active), hero_media_id=$6 WHERE id=$7`,
      [name, slug, description, display_order, is_active, hero_media_id || null, id]
    );

    res.json({ success: true, message: "Collection updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to update collection" } });
  }
});

/**
 * POST /api/admin/collections/:id/items
 * Add heritage entity to collection
 */
router.post("/collections/:id/items", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const collectionId = req.params.id;
    const { heritage_entity_id, display_order } = req.body;

    if (!heritage_entity_id) {
      res.status(400).json({ success: false, error: { code: "INVALID_PAYLOAD", message: "heritage_entity_id is required" } });
      return;
    }

    // Check duplicate
    const { rows: existing } = await query(
      "SELECT id FROM collection_items WHERE collection_id = $1 AND heritage_entity_id = $2",
      [collectionId, heritage_entity_id]
    );
    if (existing.length > 0) {
      res.status(409).json({ success: false, error: { code: "DUPLICATE", message: "Entity already in collection" } });
      return;
    }

    await query(
      `INSERT INTO collection_items (collection_id, heritage_entity_id, display_order)
       VALUES ($1, $2, $3)`,
      [collectionId, heritage_entity_id, display_order || 0]
    );

    res.status(201).json({ success: true, message: "Entity added to collection" });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to add item" } });
  }
});

/**
 * DELETE /api/admin/collections/:id/items/:itemId
 * Remove entity from collection
 */
router.delete("/collections/:id/items/:itemId", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { id, itemId } = req.params;
    await query("DELETE FROM collection_items WHERE id = $1 AND collection_id = $2", [itemId, id]);
    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to remove item" } });
  }
});

// ---- ADMIN ANALYTICS ----

/**
 * GET /api/admin/analytics/overview
 * Analytics overview with aggregation
 */
router.get("/analytics/overview", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const days = parseInt(String(req.query.days || "30")) || 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const [total, byType, topHeritage, topSearches, topCollections] = await Promise.all([
      query("SELECT count(*) FROM analytics_events WHERE created_at >= $1", [since]),
      query(`SELECT event_type, count(*)::int AS count FROM analytics_events WHERE created_at >= $1 GROUP BY event_type ORDER BY count DESC`, [since]),
      query(`SELECT he.name, he.slug, count(*)::int AS views FROM analytics_events ae JOIN heritage_entities he ON ae.heritage_entity_id = he.id WHERE ae.event_type = 'heritage_view' AND ae.created_at >= $1 GROUP BY he.id, he.name, he.slug ORDER BY views DESC LIMIT 10`, [since]),
      query(`SELECT search_query, count(*)::int AS count FROM analytics_events WHERE event_type = 'search' AND search_query IS NOT NULL AND created_at >= $1 GROUP BY search_query ORDER BY count DESC LIMIT 10`, [since]),
      query(`SELECT c.name, c.slug, count(*)::int AS views FROM analytics_events ae JOIN collections c ON ae.collection_id = c.id WHERE ae.event_type = 'collection_view' AND ae.created_at >= $1 GROUP BY c.id, c.name, c.slug ORDER BY views DESC LIMIT 10`, [since]),
    ]);

    res.json({
      success: true,
      data: {
        total_events: parseInt(String(total.rows[0].count)),
        by_type: byType.rows,
        top_heritage: topHeritage.rows,
        top_searches: topSearches.rows,
        top_collections: topCollections.rows,
        period_days: days,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: { code: "DATABASE_ERROR", message: "Failed to load analytics" } });
  }
});

/**
 * POST /api/admin/analytics/track
 * Record an analytics event (called by frontend)
 */
router.post("/analytics/track", async (req, res) => {
  if (!requireDatabase(res)) return;
  try {
    const { event_type, heritage_entity_id, collection_id, search_query, language, metadata } = req.body;

    if (!event_type) {
      res.status(400).json({ success: false, error: { code: "INVALID_PAYLOAD", message: "event_type is required" } });
      return;
    }

    await query(
      `INSERT INTO analytics_events (event_type, heritage_entity_id, collection_id, search_query, language, metadata)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [event_type, heritage_entity_id || null, collection_id || null, search_query || null, language || null, metadata ? JSON.stringify(metadata) : null]
    );

    res.json({ success: true });
  } catch (err) {
    // Analytics should not fail the request
    res.json({ success: true });
  }
});

export { router as adminRouter };
