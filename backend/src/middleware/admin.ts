/* ========================================
   Astrova — Admin Authorization Middleware
   ========================================
   Simple token-based admin authorization.
   Uses ADMIN_TOKEN environment variable.
   ======================================== */

import { Request, Response, NextFunction } from "express";

/**
 * Middleware that validates admin authorization.
 *
 * Reads X-Admin-Token from request headers
 * and compares against configured ADMIN_TOKEN from env.
 *
 * This is a lightweight admin auth system.
 * In production, replace with JWT/session-based auth.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const configuredToken = process.env.ADMIN_TOKEN;

  if (!configuredToken) {
    res.status(503).json({
      success: false,
      error: {
        code: "ADMIN_NOT_CONFIGURED",
        message: "Admin authorization is not configured on the server.",
      },
    });
    return;
  }

  const providedToken = req.headers["x-admin-token"];

  if (!providedToken || typeof providedToken !== "string") {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Admin authorization required.",
      },
    });
    return;
  }

  if (providedToken !== configuredToken) {
    res.status(403).json({
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "Invalid admin token.",
      },
    });
    return;
  }

  next();
}
