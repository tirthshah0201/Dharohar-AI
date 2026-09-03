/* ========================================
   Astrova — Authentication Middleware
   ========================================
   JWT-based session management using HttpOnly cookies.
   Separate from admin authentication (X-Admin-Token).
   ======================================== */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { query } from "../database";

const COOKIE_NAME = "astrova_session";

// JWT_SECRET is required for secure authentication.
// Without it, the server starts but token generation is blocked.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("[Auth] WARNING: JWT_SECRET is not configured.");
  console.error("[Auth] Token generation and verification will be disabled.");
  console.error("[Auth] Set JWT_SECRET in your .env file.");
  console.error("[Auth] Generate with: node -e \"console.log(require('crypto').randomBytes(64).toString('hex'))\"");
}

const SECRET_AVAILABLE = !!JWT_SECRET;

/**
 * Check if JWT authentication is properly configured.
 */
export function isAuthConfigured(): boolean {
  return SECRET_AVAILABLE;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

/**
 * Generate a JWT token for a user.
 * Throws if JWT_SECRET is not configured — refuse to create insecure tokens.
 */
export function generateToken(user: AuthUser): string {
  if (!JWT_SECRET) {
    throw new Error("Cannot generate token: JWT_SECRET is not configured.");
  }
  const options: jwt.SignOptions = {
    expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
  };
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    options
  );
}

/**
 * Set the authentication cookie on the response.
 */
export function setAuthCookie(res: Response, token: string): void {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });
}

/**
 * Clear the authentication cookie.
 */
export function clearAuthCookie(res: Response): void {
  res.cookie(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

/**
 * Optional authentication middleware.
 * Attaches user to req if valid session exists, but does NOT reject unauthenticated requests.
 */
export async function optionalAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) {
      next();
      return;
    }

    if (!JWT_SECRET) {
      next();
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    
    // Verify user still exists
    const { rows } = await query<Record<string, unknown>>(
      "SELECT id, name, email FROM users WHERE id = $1",
      [decoded.id]
    );
    
    if (rows.length > 0) {
      req.user = {
        id: String(rows[0].id),
        name: String(rows[0].name),
        email: String(rows[0].email),
      };
    }
    
    next();
  } catch {
    // Invalid token — continue without auth
    next();
  }
}

/**
 * Required authentication middleware.
 * Rejects unauthenticated requests with 401.
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(401).json({
        success: false,
        error: { code: "UNAUTHORIZED", message: "Authentication required." },
      });
      return;
    }

    if (!JWT_SECRET) {
      res.status(503).json({
        success: false,
        error: { code: "AUTH_NOT_CONFIGURED", message: "Authentication is not configured on the server." },
      });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser;
    
    // Verify user still exists
    const { rows } = await query<Record<string, unknown>>(
      "SELECT id, name, email FROM users WHERE id = $1",
      [decoded.id]
    );
    
    if (rows.length === 0) {
      clearAuthCookie(res);
      res.status(401).json({
        success: false,
        error: { code: "USER_NOT_FOUND", message: "User account no longer exists." },
      });
      return;
    }
    
    req.user = {
      id: String(rows[0].id),
      name: String(rows[0].name),
      email: String(rows[0].email),
    };
    
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      clearAuthCookie(res);
      res.status(401).json({
        success: false,
        error: { code: "TOKEN_EXPIRED", message: "Session has expired. Please log in again." },
      });
      return;
    }
    res.status(401).json({
      success: false,
      error: { code: "INVALID_TOKEN", message: "Invalid authentication session." },
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
