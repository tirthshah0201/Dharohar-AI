import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    success: true,
    service: "Dharohar AI API",
    version: "0.1.0",
    timestamp: new Date().toISOString(),
  });
});

export { router as healthRouter };
