/* ========================================
   Dharohar AI — Validation Middleware
   ========================================

   Express middleware for validating request
   parameters before they reach route handlers.
   ======================================== */

import { Request, Response, NextFunction } from "express";
import { isValidUUID } from "../utils/validation";

/**
 * Middleware that validates a UUID parameter.
 *
 * Usage:
 *   router.get("/:id", validateUUID("id"), handler)
 *
 * If the param is missing or not a valid UUID v4,
 * responds with 400 and halts the chain.
 */
export function validateUUID(paramName: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const value = req.params[paramName];

    if (!value || typeof value !== "string") {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_PARAMETER",
          message: `Missing required parameter: ${paramName}`,
        },
      });
      return;
    }

    if (!isValidUUID(value)) {
      res.status(400).json({
        success: false,
        error: {
          code: "INVALID_UUID",
          message: `Invalid ${paramName}: must be a valid UUID`,
        },
      });
      return;
    }

    next();
  };
}
