import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { healthRouter } from "./routes/health";
import { locationsRouter } from "./routes/locations";
import { heritageRouter } from "./routes/heritage";
import { timelineRouter } from "./routes/timeline";
import { searchRouter } from "./routes/search";
import { aiRouter } from "./routes/ai";
import { systemRouter } from "./routes/system";
import { sourcesRouter } from "./routes/sources";
import { mediaRouter } from "./routes/media";
import { periodsRouter } from "./routes/periods";
import { collectionsRouter } from "./routes/collections";
import { adminRouter } from "./routes/admin";
import { authRouter } from "./routes/auth";
import { favoritesRouter } from "./routes/favorites";
import { chatRateLimit, favoritesRateLimit } from "./middleware/rateLimit";

const app = express();
const PORT = parseInt(process.env.PORT || "", 10) || 3001;

// Trust loopback proxy (Next.js proxy → Express on same machine)
// Also safe behind reverse proxies that set X-Forwarded-For
app.set("trust proxy", "loopback");

// ---- Middleware ----
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:3000"];

app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? (origin, callback) => {
        // Allow requests with no origin (server-to-server, curl, mobile apps)
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }
    : true,
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// ---- Routes ----
app.use("/api/health", healthRouter);
app.use("/api/system", systemRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/heritage", heritageRouter);
app.use("/api/timeline", timelineRouter);
app.use("/api/search", searchRouter);
app.use("/api/sources", sourcesRouter);
app.use("/api/media", mediaRouter);
app.use("/api/periods", periodsRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);
app.use("/api/favorites", favoritesRateLimit, favoritesRouter);
app.use("/api/ai", chatRateLimit, aiRouter);

// ---- 404 Handler ----
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// ---- Error Handler (no stack trace or sensitive info in response) ----
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    // Log internally with detail (but never log secrets)
    console.error("[Error]", err.message);
    // Never expose stack traces, SQL errors, or internals to client
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred.",
      },
    });
  }
);

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`🏛️  Astrova API running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(
    `   Connectivity: http://localhost:${PORT}/api/system/connectivity`
  );
});

export default app;
