# Environment Configuration Audit — Astrova

## Overview

This document audits all environment variables used by Astrova.

**Audit Date:** P0 Phase
**Status:** PASS WITH WARNINGS

---

## Environment Variables

### Required Variables

| Variable | Used By | Purpose | Notes |
|----------|---------|---------|-------|
| `DATABASE_URL` | Backend, Database scripts | Neon PostgreSQL connection | **CRITICAL** - App won't start without this |
| `DEMO_API_KEY` | Backend, Frontend proxy | Development API key | **REQUIRED** for API access |

### Optional Variables (with defaults)

| Variable | Default | Used By | Purpose |
|----------|---------|---------|---------|
| `PORT` | `3001` | Backend | Backend server port |
| `NODE_ENV` | `development` | Backend | Environment mode |
| `API_BASE_URL` | `http://localhost:3001` | Frontend proxy | Backend URL for proxy route |
| `AI_SERVICE_URL` | `http://localhost:8000` | Backend chatbot | AI service URL |
| `NEXT_PUBLIC_API_URL` | `http://localhost:3001/api` | Frontend | Backend API URL |
| `NEXT_PUBLIC_AI_SERVICE_URL` | `http://localhost:8000` | Frontend | AI service URL |

### Future Variables (not yet used)

| Variable | Purpose | Status |
|----------|---------|--------|
| `NEO4J_URI` | Neo4j connection | NOT IMPLEMENTED |
| `NEO4J_USERNAME` | Neo4j auth | NOT IMPLEMENTED |
| `NEO4J_PASSWORD` | Neo4j auth | NOT IMPLEMENTED |
| `JWT_SECRET` | Authentication | NOT IMPLEMENTED |
| `LLM_API_KEY` | LLM provider | NOT IMPLEMENTED |
| `LLM_MODEL` | LLM model | NOT IMPLEMENTED |
| `MAPTILER_API_KEY` | Map tiles | OPTIONAL |
| `AI_SERVICE_PORT` | AI service port | OPTIONAL |
| `GEOCODING_PROVIDER` | Geocoding | OPTIONAL |

---

## Security Audit

### ✅ SECURE

| Variable | Status | Reason |
|----------|--------|--------|
| `DATABASE_URL` | ✅ Server-side only | Not in NEXT_PUBLIC |
| `DEMO_API_KEY` | ✅ Server-side only | Attached by proxy route |
| `JWT_SECRET` | ✅ Server-side only | Future use |
| `NEO4J_PASSWORD` | ✅ Server-side only | Future use |

### ⚠️ REMOVED (Security Fix)

| Variable | Status | Reason |
|----------|--------|--------|
| `NEXT_PUBLIC_DEMO_API_KEY` | ❌ REMOVED | Was exposing API key in browser |

### ℹ️ PUBLIC (By Design)

| Variable | Status | Reason |
|----------|--------|--------|
| `NEXT_PUBLIC_API_URL` | ✅ Public | Backend URL (non-sensitive) |
| `NEXT_PUBLIC_AI_SERVICE_URL` | ✅ Public | AI service URL (non-sensitive) |

---

## Recommendations

### Current State: PASS WITH WARNINGS

1. ✅ API key is now server-side only (P0-1 fix)
2. ✅ No secrets in NEXT_PUBLIC variables
3. ⚠️ `DEMO_API_KEY` should be randomized in production
4. ⚠️ CORS is wide open in development (acceptable for dev)

### Future Improvements

1. Add rate limiting to backend
2. Implement JWT authentication
3. Add environment validation on startup
4. Use secret management for production
5. Add `.env.local` documentation

---

## Configuration Files

| File | Purpose | Committed |
|------|---------|-----------|
| `.env.example` | Template | ✅ Yes |
| `.env` | Root environment | ❌ No (gitignored) |
| `frontend/.env.local` | Frontend environment | ❌ No (gitignored) |

---

## How to Configure

1. Copy `.env.example` to `.env`
2. Set `DATABASE_URL` to your Neon connection string
3. Generate a random `DEMO_API_KEY`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
   ```
4. Start services:
   ```bash
   cd backend && npm run dev
   cd frontend && npm run dev
   ```
