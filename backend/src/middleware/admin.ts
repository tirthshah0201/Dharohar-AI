/* ========================================
   Astrova — Admin Authorization Middleware
   ========================================
   JWT + role-based admin authorization.
   Requires authenticated user with role='admin'.
   ======================================== */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { query } from "../database";

const COOKIE_NAME = "astrova_session";
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Admin authorization middleware.
 *
 * 1. Extracts JWT from cookie or Authorization header
 * 2. Verifies JWT signature
 * 3. Checks user exists and has role='admin'
 * 4. Attaches user to req.user
 *
 * Rejects with:
 * - 401 if no token / invalid token / user not found
 * - 403 if user is not an admin
 */
export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Extract token from cookie or Authorization header
  const token = extractToken(req);

  if (!token) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Admin authentication required.",
      },
    });
    return;
  }

  if (!JWT_SECRET) {
    res.status(503).json({
      success: false,
      error: {
        code: "AUTH_NOT_CONFIGURED",
        message: "Authentication is not configured on the server.",
      },
    });
    return;
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      name: string;
      email: string;
      role?: string;
      ver?: number;
    };

    // Verify user exists and check role
    const { rows } = await query<{
      id: string;
      name: string;
      email: string;
      role: string;
      token_version: number | string | null;
    }>(
      "SELECT id, name, email, role, token_version FROM users WHERE id = $1",
      [decoded.id]
    );

    if (rows.length === 0) {
      res.status(401).json({
        success: false,
        error: {
          code: "USER_NOT_FOUND",
          message: "User account no longer exists.",
        },
      });
      return;
    }

    const user = rows[0];

    // Check token version (revocation)
    const currentVersion = Number(user.token_version ?? 0);
    if (Number(decoded.ver ?? 0) !== currentVersion) {
      res.status(401).json({
        success: false,
        error: {
          code: "TOKEN_REVOKED",
          message: "Session has been revoked. Please log in again.",
        },
      });
      return;
    }

    // Check admin role
    if (user.role !== "admin") {
      res.status(403).json({
        success: false,
        error: {
          code: "FORBIDDEN",
          message: "Admin access required.",
        },
      });
      return;
    }

    // Attach user to request
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        success: false,
        error: {
          code: "TOKEN_EXPIRED",
          message: "Session has expired. Please log in again.",
        },
      });
      return;
    }
    res.status(401).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "Invalid authentication session.",
      },
    });
  }
}

/**
 * Extract JWT token from cookie or Authorization header.
 */
function extractToken(req: Request): string | null {
  // Try cookie first
  const cookieToken = (req as any).cookies?.[COOKIE_NAME];
  if (cookieToken) return cookieToken;

  // Try Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}
