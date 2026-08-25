import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health";
import { locationsRouter } from "./routes/locations";
import { heritageRouter } from "./routes/heritage";
import { timelineRouter } from "./routes/timeline";
import { searchRouter } from "./routes/search";
import { aiRouter } from "./routes/ai";
import { systemRouter } from "./routes/system";

const app = express();
const PORT = parseInt(process.env.PORT || "", 10) || 3001;

// ---- Middleware ----
app.use(cors({ origin: process.env.NODE_ENV === "production" ? false : true }));
app.use(express.json());

// ---- Routes ----
app.use("/api/health", healthRouter);
app.use("/api/system", systemRouter);
app.use("/api/locations", locationsRouter);
app.use("/api/heritage", heritageRouter);
app.use("/api/timeline", timelineRouter);
app.use("/api/search", searchRouter);
app.use("/api/ai", aiRouter);

// ---- 404 Handler ----
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// ---- Error Handler ----
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
);

// ---- Start Server ----
app.listen(PORT, () => {
  console.log(`🏛️  Dharohar AI API running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(
    `   Connectivity: http://localhost:${PORT}/api/system/connectivity`
  );
});

export default app;
