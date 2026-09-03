/* ========================================
   Astrova — Authentication API Routes
   ========================================
   Register, login, logout, and session management.
   Uses HttpOnly cookies for secure session handling.
   ======================================== */

import { Router } from "express";
import bcrypt from "bcrypt";
import { query } from "../database";
import {
  generateToken,
  setAuthCookie,
  clearAuthCookie,
  requireAuth,
  isAuthConfigured,
} from "../middleware/auth";
import { registerRateLimit, loginRateLimit } from "../middleware/rateLimit";

const router = Router();
const SALT_ROUNDS = 10;
const MAX_NAME_LENGTH = 100;

/**
 * POST /api/auth/register
 * Create a new user account.
 */
router.post("/register", registerRateLimit, async (req, res) => {
  if (!isAuthConfigured()) {
    res.status(503).json({
      success: false,
      error: { code: "AUTH_NOT_CONFIGURED", message: "Authentication is not configured on the server." },
    });
    return;
  }
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_PAYLOAD", message: "Name, email, and password are required." },
      });
      return;
    }

    if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > MAX_NAME_LENGTH) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_NAME", message: `Name must be between 2 and ${MAX_NAME_LENGTH} characters.` },
      });
      return;
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_EMAIL", message: "Please provide a valid email address." },
      });
      return;
    }

    if (typeof password !== "string" || password.length < 6) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_PASSWORD", message: "Password must be at least 6 characters." },
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Check for existing account
    const { rows: existing } = await query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (existing.length > 0) {
      res.status(409).json({
        success: false,
        error: { code: "EMAIL_EXISTS", message: "An account with this email already exists." },
      });
      return;
    }

    // Hash password and create user
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const { rows } = await query<Record<string, unknown>>(
      "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email",
      [trimmedName, normalizedEmail, passwordHash]
    );

    const user = rows[0];
    const userId = String(user.id);
    const userName = String(user.name);
    const userEmail = String(user.email);
    const token = generateToken({ id: userId, name: userName, email: userEmail });
    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      data: { id: userId, name: userName, email: userEmail },
    });
  } catch (err) {
    console.error("[Auth] Registration error:", err);
    res.status(500).json({
      success: false,
      error: { code: "REGISTRATION_FAILED", message: "Failed to create account." },
    });
  }
});

/**
 * POST /api/auth/login
 * Authenticate an existing user.
 */
router.post("/login", loginRateLimit, async (req, res) => {
  if (!isAuthConfigured()) {
    res.status(503).json({
      success: false,
      error: { code: "AUTH_NOT_CONFIGURED", message: "Authentication is not configured on the server." },
    });
    return;
  }
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        error: { code: "INVALID_PAYLOAD", message: "Email and password are required." },
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const { rows } = await query<Record<string, unknown>>(
      "SELECT id, name, email, password_hash FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (rows.length === 0) {
      res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password." },
      });
      return;
    }

    const user = rows[0];
    const validPassword = await bcrypt.compare(password, String(user.password_hash));

    if (!validPassword) {
      res.status(401).json({
        success: false,
        error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password." },
      });
      return;
    }

    const userId = String(user.id);
    const userName = String(user.name);
    const userEmail = String(user.email);
    const token = generateToken({ id: userId, name: userName, email: userEmail });
    setAuthCookie(res, token);

    res.json({
      success: true,
      data: { id: userId, name: userName, email: userEmail },
    });
  } catch (err) {
    console.error("[Auth] Login error:", err);
    res.status(500).json({
      success: false,
      error: { code: "LOGIN_FAILED", message: "Failed to authenticate." },
    });
  }
});

/**
 * POST /api/auth/logout
 * Clear the session cookie.
 */
router.post("/logout", (_req, res) => {
  clearAuthCookie(res);
  res.json({ success: true, message: "Logged out successfully." });
});

/**
 * GET /api/auth/me
 * Return current authenticated user, or 401.
 */
router.get("/me", requireAuth, (req, res) => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: { code: "UNAUTHORIZED", message: "Not authenticated." },
    });
    return;
  }

  res.json({
    success: true,
    data: { id: req.user.id, name: req.user.name, email: req.user.email },
  });
});

export { router as authRouter };
