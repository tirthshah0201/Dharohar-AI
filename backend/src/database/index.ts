/* ========================================
   Dharohar AI — Database Connection
   ========================================

   Neon PostgreSQL connection pool.
   Credentials are NEVER logged or exposed.
   ======================================== */

import { Pool, PoolConfig } from "pg";

let pool: Pool | null = null;

function getPoolConfig(): PoolConfig {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Configure it in your .env file. " +
        "See docs/database/neon-setup.md for instructions."
    );
  }

  return {
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false, // Neon requires SSL
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };
}

/**
 * Get the database connection pool.
 * Creates the pool on first call (lazy initialization).
 */
export function getPool(): Pool {
  if (!pool) {
    pool = new Pool(getPoolConfig());

    pool.on("error", (err) => {
      console.error("[Database] Unexpected pool error:", err.message);
      // Do NOT log connection string or credentials
    });
  }

  return pool;
}

/**
 * Test database connectivity with a minimal query.
 * Returns { connected: true } or throws on failure.
 * Never exposes credentials or database metadata.
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = await getPool().connect();
    try {
      await client.query("SELECT 1");
      return true;
    } finally {
      client.release();
    }
  } catch {
    return false;
  }
}

/**
 * Execute a query with parameters.
 * Safe wrapper around pool.query.
 */
export async function query<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<{ rows: T[]; rowCount: number | null }> {
  const result = await getPool().query(text, params);
  return {
    rows: result.rows as T[],
    rowCount: result.rowCount,
  };
}

/**
 * Close the connection pool gracefully.
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
