# Dharohar AI — API Product Requirements Document (PRD)

## 1. Project Overview

Dharohar AI is an intelligent cultural and historical knowledge platform focused on Gujarat's heritage. The backend API serves as the primary data layer between the Next.js frontend and the Neon PostgreSQL database.

## 2. Current API Architecture

```
Frontend (Next.js)
  ↓ X-API-Key header
Backend (Express.js + TypeScript)
  ↓ API Key Middleware
Route Handlers
  ↓ SQL queries
Neon PostgreSQL
```

**Base URL:** `http://localhost:3001/api` (development)

**Authentication:** Development API key via `X-API-Key` header (temporary, will be replaced by JWT in future phases).

## 3. API Endpoints

### Public Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/health` | None | Health check |

### Protected Endpoints (require `X-API-Key`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/locations` | List all locations (optional `?type=` filter) |
| GET | `/api/locations/:id` | Get location by UUID |
| GET | `/api/heritage` | List all heritage entities (optional `?category=` filter) |
| GET | `/api/heritage/:id` | Get heritage entity by UUID |
| GET | `/api/timeline` | List historical periods with entity counts |
| GET | `/api/timeline/eras` | List eras (name + date range) |
| GET | `/api/search?q=&category=` | Full-text search across heritage entities |
| GET | `/api/system/connectivity` | Development connectivity check |

### Stub Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/chat` | AI chat (future phase) |
| GET | `/api/ai/suggestions` | AI suggestions (placeholder) |

## 4. Validation Requirements

### UUID Parameters

All UUID-based endpoints (`/api/locations/:id`, `/api/heritage/:id`) validate UUID format before database queries.

- **Valid UUID format → 200 or 404** (valid syntax, record may or may not exist)
- **Invalid UUID format → 400 Bad Request** with `INVALID_UUID` error code
- PostgreSQL never receives malformed UUIDs

### Query Parameters

| Endpoint | Parameter | Validation |
|----------|-----------|------------|
| `/api/locations` | `type` | Must be one of: `state`, `district`, `city`, `village`, `site` |
| `/api/heritage` | `category` | Must be one of: `monument`, `person`, `craft`, `tradition`, `festival`, `architecture`, `event`, `food`, `community` |
| `/api/search` | `q` | Must be 1-500 characters after trimming |
| `/api/search` | `category` | Same as heritage category validation |

Invalid query parameters return **400 Bad Request** with `INVALID_QUERY_PARAMETER` error code.

## 5. Authentication

**Current (Development Phase):**
- API key passed via `X-API-Key` header
- Key compared against `DEMO_API_KEY` environment variable
- Constant-time comparison to prevent timing attacks
- 401 response for missing/invalid keys

**Future (not yet implemented):**
- JWT-based authentication
- User roles and permissions
- Rate limiting

## 6. Error Handling

All error responses follow a consistent structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable description"
  }
}
```

### Error Codes

| Code | HTTP Status | When |
|------|-------------|------|
| `INVALID_UUID` | 400 | UUID parameter has invalid format |
| `INVALID_PARAMETER` | 400 | Required parameter is missing |
| `INVALID_QUERY_PARAMETER` | 400 | Query parameter has invalid value |
| `INVALID_API_KEY` | 401 | API key is missing or incorrect |
| `API_KEY_NOT_CONFIGURED` | 401 | Server has no API key configured |
| `NOT_FOUND` | 404 | Resource does not exist |
| `ENDPOINT_NOT_FOUND` | 404 | API endpoint does not exist |
| `DATABASE_NOT_CONFIGURED` | 503 | DATABASE_URL is not set |
| `DATABASE_ERROR` | 500 | Unexpected database error |

### Security Rules

Error responses **never** expose:
- `DATABASE_URL` or connection strings
- API keys or passwords
- PostgreSQL error messages
- Stack traces
- Internal server details

## 7. Current Implementation Status

| Feature | Status |
|---------|--------|
| Health endpoint | ✅ Implemented |
| Location CRUD (read) | ✅ Implemented |
| Heritage CRUD (read) | ✅ Implemented |
| Timeline listing | ✅ Implemented |
| Full-text search | ✅ Implemented |
| API key authentication | ✅ Implemented |
| UUID validation | ✅ Implemented |
| Query parameter validation | ✅ Implemented |
| Error response consistency | ✅ Implemented |
| Create/Update/Delete endpoints | 🔜 Future phase |
| JWT authentication | 🔜 Future phase |
| Rate limiting | 🔜 Future phase |
| AI chat integration | 🔜 Future phase |
| Knowledge graph | 🔜 Future phase |

## 8. Database Schema

The API reads from these Neon PostgreSQL tables:

- `locations` — Geographic locations (state, district, city, site)
- `historical_periods` — Timeline eras
- `heritage_entities` — Cultural heritage items
- `relationships` — Entity-to-entity connections
- `sources` — Reference materials
- `media` — Images, documents, audio, video

All IDs are UUID type.

## 9. Future API Requirements

- Mutation endpoints (POST, PUT, DELETE) for admin CMS
- Pagination support for list endpoints
- Filtering by location + period combinations
- Relationship traversal queries
- AI-powered search with RAG
- Knowledge graph queries (Neo4j)
- Multilingual content support
- Contribution system API
- Authentication and authorization
