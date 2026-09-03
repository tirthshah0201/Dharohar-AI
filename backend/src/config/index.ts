/* ========================================
   Astrova Backend — Configuration
   ======================================== */

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000",
  jwtSecret: process.env.JWT_SECRET || "",
  demoApiKey: process.env.DEMO_API_KEY || "",
} as const;
