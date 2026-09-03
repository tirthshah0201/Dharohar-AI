/* ========================================
   Astrova — Favorites API Routes
   ========================================
   Persistent, user-authenticated favorites.
   Each user can only manage their own favorites.
   ======================================== */

import { Router } from "express";
import { query } from "../database";
import { requireAuth } from "../middleware/auth";
import { validateUUID } from "../middleware/validate";

const router = Router();

// All favorites routes require authentication
router.use(requireAuth);

/**
 * GET /api/favorites
 * List all favorites for the authenticated user.
 */
router.get("/", async (req, res) => {
  try {
    const userId = req.user!.id;

    const { rows } = await query(
      `SELECT uf.id, uf.heritage_entity_id, uf.created_at,
              he.name, he.slug, he.category, he.description,
              l.name AS location_name, l.state,
              hp.name AS period_name
       FROM user_favorites uf
       JOIN heritage_entities he ON uf.heritage_entity_id = he.id
       LEFT JOIN locations l ON he.location_id = l.id
       LEFT JOIN historical_periods hp ON he.period_id = hp.id
       WHERE uf.user_id = $1
       ORDER BY uf.created_at DESC`,
      [userId]
    );

    res.json({ success: true, data: rows, total: rows.length });
  } catch (err) {
    console.error("[Favorites] List error:", err);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to load favorites." },
    });
  }
});

/**
 * GET /api/favorites/:heritageId/status
 * Check if a specific heritage entity is favorited by the user.
 */
router.get("/:heritageId/status", validateUUID("heritageId"), async (req, res) => {
  try {
    const userId = req.user!.id;
    const { heritageId } = req.params;

    const { rows } = await query(
      "SELECT id FROM user_favorites WHERE user_id = $1 AND heritage_entity_id = $2",
      [userId, heritageId]
    );

    res.json({ success: true, data: { isFavorited: rows.length > 0 } });
  } catch (err) {
    console.error("[Favorites] Status check error:", err);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to check favorite status." },
    });
  }
});

/**
 * POST /api/favorites/:heritageId
 * Add a heritage entity to the user's favorites.
 */
router.post("/:heritageId", validateUUID("heritageId"), async (req, res) => {
  try {
    const userId = req.user!.id;
    const { heritageId } = req.params;

    // Verify the heritage entity exists
    const { rows: heritage } = await query(
      "SELECT id, name FROM heritage_entities WHERE id = $1",
      [heritageId]
    );

    if (heritage.length === 0) {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Heritage entity not found." },
      });
      return;
    }

    // Check for duplicate
    const { rows: existing } = await query(
      "SELECT id FROM user_favorites WHERE user_id = $1 AND heritage_entity_id = $2",
      [userId, heritageId]
    );

    if (existing.length > 0) {
      res.status(409).json({
        success: false,
        error: { code: "ALREADY_FAVORITED", message: "Already in favorites." },
      });
      return;
    }

    await query(
      "INSERT INTO user_favorites (user_id, heritage_entity_id) VALUES ($1, $2)",
      [userId, heritageId]
    );

    res.status(201).json({
      success: true,
      message: `${heritage[0].name} added to favorites.`,
    });
  } catch (err) {
    console.error("[Favorites] Add error:", err);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to add favorite." },
    });
  }
});

/**
 * DELETE /api/favorites/:heritageId
 * Remove a heritage entity from the user's favorites.
 */
router.delete("/:heritageId", validateUUID("heritageId"), async (req, res) => {
  try {
    const userId = req.user!.id;
    const { heritageId } = req.params;

    const { rowCount } = await query(
      "DELETE FROM user_favorites WHERE user_id = $1 AND heritage_entity_id = $2",
      [userId, heritageId]
    );

    if (rowCount === 0) {
      res.status(404).json({
        success: false,
        error: { code: "NOT_FOUND", message: "Favorite not found." },
      });
      return;
    }

    res.json({ success: true, message: "Removed from favorites." });
  } catch (err) {
    console.error("[Favorites] Remove error:", err);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to remove favorite." },
    });
  }
});

/**
 * POST /api/favorites/sync
 * Merge localStorage favorites into the authenticated user's backend favorites.
 */
router.post("/sync", async (req, res) => {
  try {
    const userId = req.user!.id;
    const { heritageIds } = req.body;

    if (!Array.isArray(heritageIds)) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_PAYLOAD", message: "heritageIds must be an array." },
      });
      return;
    }

    // Limit array size to prevent abuse
    if (heritageIds.length > 100) {
      res.status(400).json({
        success: false,
        error: { code: "PAYLOAD_TOO_LARGE", message: "Cannot sync more than 100 favorites at once." },
      });
      return;
    }

    // Filter to valid heritage IDs
    const validIds: string[] = [];
    for (const id of heritageIds) {
      if (typeof id !== "string") continue;
      const { rows } = await query(
        "SELECT id FROM heritage_entities WHERE id = $1",
        [id]
      );
      if (rows.length > 0) validIds.push(id);
    }

    // Insert each, ignoring duplicates
    let added = 0;
    for (const id of validIds) {
      try {
        await query(
          "INSERT INTO user_favorites (user_id, heritage_entity_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [userId, id]
        );
        added++;
      } catch {
        // Skip duplicates or errors silently
      }
    }

    // Return updated full list
    const { rows } = await query(
      "SELECT heritage_entity_id FROM user_favorites WHERE user_id = $1",
      [userId]
    );

    res.json({
      success: true,
      data: {
        synced: added,
        total: rows.length,
        favoriteIds: rows.map((r) => r.heritage_entity_id),
      },
    });
  } catch (err) {
    console.error("[Favorites] Sync error:", err);
    res.status(500).json({
      success: false,
      error: { code: "DATABASE_ERROR", message: "Failed to sync favorites." },
    });
  }
});

export { router as favoritesRouter };
