/* ========================================
   Dharohar AI Backend — Configuration
   ======================================== */

export const config = {
  port: parseInt(process.env.PORT || "3001", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  neo4jUri: process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4jUsername: process.env.NEO4J_USERNAME || "neo4j",
  neo4jPassword: process.env.NEO4J_PASSWORD || "",
  aiServiceUrl: process.env.AI_SERVICE_URL || "http://localhost:8000",
  jwtSecret: process.env.JWT_SECRET || "",
  demoApiKey: process.env.DEMO_API_KEY || "",
} as const;
