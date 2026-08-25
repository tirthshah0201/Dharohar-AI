/* ========================================
   Dharohar AI — API Key Middleware
   ========================================

   Development-only API key validation.
   This is NOT the final authentication system.

   Reads X-API-Key from the request header
   and compares it against DEMO_API_KEY from env.
   ======================================== */

import { Request, Response, NextFunction } from "express";

/**
 * Middleware that validates the development API key.
 *
 * - Reads X-API-Key from request headers
 * - Compares against configured DEMO_API_KEY
 * - Returns 401 if invalid or missing
 * - Passes through to next handler if valid
 *
 * IMPORTANT: This is temporary development-only protection.
 * It will be replaced by JWT authentication in a future phase.
 */
export function requireDevelopmentApiKey(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const configuredKey = process.env.DEMO_API_KEY;

  // If no key is configured, deny all requests (fail-safe)
  if (!configuredKey) {
    console.warn(
      "[API Key] DEMO_API_KEY is not configured. Denying request."
    );
    res.status(401).json({
      success: false,
      error: {
        code: "API_KEY_NOT_CONFIGURED",
        message: "Development API key is not configured on the server.",
      },
    });
    return;
  }

  const providedKey = req.headers["x-api-key"];

  if (!providedKey || typeof providedKey !== "string") {
    res.status(401).json({
      success: false,
      error: {
        code: "INVALID_API_KEY",
        message: "Invalid API key",
      },
    });
    return;
  }

  // Constant-time comparison to prevent timing attacks
  if (providedKey.length !== configuredKey.length) {
    res.status(401).json({
      success: false,
      error: {
        code: "INVALID_API_KEY",
        message: "Invalid API key",
      },
    });
    return;
  }

  let mismatch = 0;
  for (let i = 0; i < providedKey.length; i++) {
    mismatch |= providedKey.charCodeAt(i) ^ configuredKey.charCodeAt(i);
  }

  if (mismatch !== 0) {
    res.status(401).json({
      success: false,
      error: {
        code: "INVALID_API_KEY",
        message: "Invalid API key",
      },
    });
    return;
  }

  // Key is valid — proceed
  next();
}
