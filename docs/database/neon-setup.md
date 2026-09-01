# Neon PostgreSQL Setup — Dharohar AI

## Overview

Dharohar AI uses **Neon PostgreSQL** as its primary database. Neon is a serverless PostgreSQL service that provides a free tier suitable for development.

---

## 1. Creating a Neon Project

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up or log in
3. Click **Create Project**
4. Choose a project name (e.g., `dharohar-ai`)
5. Select a region closest to your deployment target (e.g., `us-east-1` for general use)
6. Click **Create Project**

---

## 2. Obtaining DATABASE_URL

After creating your project:

1. Go to the **Dashboard** tab
2. Under **Connection Details**, select **Connection string**
3. Copy the full connection string. It looks like:

```
postgresql://neondb_owner:xxxx@ep-xxxxx.us-east-1.aws.neon.tech/dharohar_ai?sslmode=require
```

> ⚠️ **Security**: This URL contains credentials. Never commit it to Git, never share it publicly.

---

## 3. Configuring .env

1. Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

2. Paste your Neon DATABASE_URL:

```env
DATABASE_URL=postgresql://neondb_owner:xxxx@ep-xxxxx.us-east-1.aws.neon.tech/dharohar_ai?sslmode=require
```

3. Also configure the development API key:

```env
DEMO_API_KEY=your_random_key_here
API_BASE_URL=http://localhost:3001
```

> ⚠️ **Important**: Generate a random key for `DEMO_API_KEY`. Do not use the default value in any environment with real data.

---

## 4. Running Migrations

From the project root:

```bash
# Install dependencies (if not already done)
cd backend && npm install && cd ..

# Run all migrations
npx ts-node database/migrate.ts migrate
```

Expected output:
```
🔄 Applying migration: 001_initial_schema.sql
✅ Applied: 001_initial_schema.sql

✅ 1 migration(s) applied successfully.
```

To check migration status:
```bash
npx ts-node database/migrate.ts status
```

---

## 5. Running Seed Data

After migrations:

```bash
npx ts-node database/migrate.ts seed
```

Expected output:
```
🌱 Running seed: 001_gujarat_heritage.sql
✅ Seeded: 001_gujarat_heritage.sql

✅ 1 seed file(s) applied successfully.
```

Or run both at once:
```bash
npx ts-node database/migrate.ts reset
```

This drops all tables, re-runs migrations, and re-seeds.

---

## 6. Verifying Database Connectivity

### Via the Backend API

Start the backend:
```bash
cd backend && npm run dev
```

Test connectivity (replace `dev_demo_key_change_me` with your actual DEMO_API_KEY):

```bash
curl -H "X-API-Key: dev_demo_key_change_me" http://localhost:3001/api/system/connectivity
```

Expected response:
```json
{
  "success": true,
  "backend": "connected",
  "database": "connected",
  "environment": "development"
}
```

If `database` shows `disconnected`, check:
- Your DATABASE_URL is correct
- Your Neon project is active (free tier pauses after inactivity)
- Your network allows outbound SSL connections

### Via the Migration Tool

```bash
npx ts-node database/migrate.ts status
```

If this connects and shows migration status, your database connection is working.

---

## 7. Troubleshooting

### "DATABASE_URL is not set"
- Ensure `.env` exists in the project root (not just `.env.example`)
- Ensure `DATABASE_URL` is set in `.env`
- The backend and migration tool both read from `.env`

### "Connection refused" or "timeout"
- Neon free tier projects pause after ~5 minutes of inactivity
- Visit [console.neon.tech](https://console.neon.tech) and ensure your project is active
- Neon will wake up automatically, but it may take 1-2 seconds

### "password authentication failed"
- Verify the password in your DATABASE_URL matches what Neon shows
- You can reset the password in Neon Dashboard → Project Settings →.getConnection Details

### "SSL connection required"
- Neon requires SSL. Our connection pool is configured with `ssl: { rejectUnauthorized: false }`
- If connecting from a tool like pgAdmin, enable SSL and set `sslmode=require`

### "relation does not exist"
- Run migrations first: `npx ts-node database/migrate.ts migrate`
- Then run seeds: `npx ts-node database/migrate.ts seed`

### Free Tier Pausing
- Neon free tier pauses databases after ~5 minutes of inactivity
- The first query after pause may take 1-3 seconds as the compute wakes up
- This is normal behavior — not an error

---

## 8. Important Notes

- **Never** commit `.env` to Git
- **Never** put DATABASE_URL in `NEXT_PUBLIC_` variables
- **Never** expose credentials in API responses
- The `sslmode=require` parameter is mandatory for Neon
- Use the migration tool (`database/migrate.ts`) for all schema changes
- Back up important data before running `reset`
