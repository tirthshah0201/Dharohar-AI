/* ========================================
   Dharohar AI — System Routes
   ========================================

   Development-only diagnostic endpoints.
   These endpoints do NOT expose secrets.
   ======================================== */

import { Router } from "express";
import { requireDevelopmentApiKey } from "../middleware/apiKey";
import { testConnection } from "../database";

const router = Router();

/**
 * GET /api/system/connectivity
 *
 * Safe diagnostic endpoint for development.
 * Returns backend and database connection status.
 *
 * DOES NOT expose:
 * - DATABASE_URL
 * - API key
 * - Credentials
 * - Internal infrastructure details
 *
 * Requires: X-API-Key header
 */
router.get("/connectivity", requireDevelopmentApiKey, async (_req, res) => {
  const environment = process.env.NODE_ENV || "development";

  let databaseStatus = "disconnected";
  if (process.env.DATABASE_URL) {
    const isConnected = await testConnection();
    databaseStatus = isConnected ? "connected" : "disconnected";
  } else {
    databaseStatus = "not_configured";
  }

  res.json({
    success: true,
    backend: "connected",
    database: databaseStatus,
    environment,
  });
});

export { router as systemRouter };
