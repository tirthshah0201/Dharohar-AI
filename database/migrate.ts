/**
 *   Astrova — Database Migration Runner
 *
 * Usage:
 *   npx ts-node database/migrate.ts migrate   — Run all pending migrations
 *   npx ts-node database/migrate.ts seed      — Run seed scripts
 *   npx ts-node database/migrate.ts reset     — Drop all tables and re-run
 *   npx ts-node database/migrate.ts status    — Check migration status
 *
 * Requires DATABASE_URL in .env
 */

import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL is not set. Configure it in your .env file.");
  console.error("   See docs/database/neon-setup.md for instructions.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const MIGRATIONS_DIR = join(__dirname, "migrations");
const SEEDS_DIR = join(__dirname, "seeds");

async function ensureMigrationTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

async function getAppliedMigrations(): Promise<string[]> {
  const { rows } = await pool.query("SELECT filename FROM _migrations ORDER BY id");
  return rows.map((r) => r.filename);
}

async function runMigrations() {
  await ensureMigrationTable();
  const applied = await getAppliedMigrations();
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  const pending = files.filter((f) => !applied.includes(f));

  if (pending.length === 0) {
    console.log("✅ All migrations already applied.");
    return;
  }

  for (const file of pending) {
    console.log(`🔄 Applying migration: ${file}`);
    const sql = readFileSync(join(MIGRATIONS_DIR, file), "utf-8");
    await pool.query(sql);
    await pool.query("INSERT INTO _migrations (filename) VALUES ($1)", [file]);
    console.log(`✅ Applied: ${file}`);
  }

  console.log(`\n✅ ${pending.length} migration(s) applied successfully.`);
}

async function runSeeds() {
  const files = readdirSync(SEEDS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  if (files.length === 0) {
    console.log("⚠️  No seed files found.");
    return;
  }

  for (const file of files) {
    console.log(`🌱 Running seed: ${file}`);
    const sql = readFileSync(join(SEEDS_DIR, file), "utf-8");
    await pool.query(sql);
    console.log(`✅ Seeded: ${file}`);
  }

  console.log(`\n✅ ${files.length} seed file(s) applied successfully.`);
}

async function showStatus() {
  await ensureMigrationTable();
  const applied = await getAppliedMigrations();

  const allFiles = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  console.log("\nMigration Status:");
  console.log("=================");
  for (const file of allFiles) {
    const status = applied.includes(file) ? "✅ Applied" : "⏳ Pending";
    console.log(`  ${status}  ${file}`);
  }
  console.log();
}

async function resetDatabase() {
  console.log("⚠️  Dropping all tables...");
  await pool.query(`
    DROP TABLE IF EXISTS media CASCADE;
    DROP TABLE IF EXISTS sources CASCADE;
    DROP TABLE IF EXISTS relationships CASCADE;
    DROP TABLE IF EXISTS heritage_entities CASCADE;
    DROP TABLE IF EXISTS historical_periods CASCADE;
    DROP TABLE IF EXISTS locations CASCADE;
    DROP TABLE IF EXISTS _migrations CASCADE;
  `);
  console.log("✅ All tables dropped.");
  await runMigrations();
  await runSeeds();
}

async function main() {
  const command = process.argv[2];

  try {
    switch (command) {
      case "migrate":
        await runMigrations();
        break;
      case "seed":
        await runSeeds();
        break;
      case "reset":
        await resetDatabase();
        break;
      case "status":
        await showStatus();
        break;
      default:
        console.log("Astrova — Database Migration Tool");
        console.log("Usage:");
        console.log("  npx ts-node database/migrate.ts migrate  — Run migrations");
        console.log("  npx ts-node database/migrate.ts seed     — Run seeds");
        console.log("  npx ts-node database/migrate.ts reset    — Reset database");
        console.log("  npx ts-node database/migrate.ts status   — Show status");
    }
  } catch (err) {
    console.error("❌ Error:", (err as Error).message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
