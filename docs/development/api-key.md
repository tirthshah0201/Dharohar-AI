# Development API Key — Dharohar AI

## Purpose

The development API key (`DEMO_API_KEY`) is a **temporary mechanism** for establishing controlled frontend → backend connectivity during development. It is **NOT** a production authentication system.

---

## How It Works

```
Frontend (Next.js)
  ↓  Sends X-API-Key header with every API request
  ↓
Backend (Express)
  ↓  requireDevelopmentApiKey middleware validates the key
  ↓
API Endpoint
  ↓  Processes request if key is valid
  ↓
Response to Frontend
```

---

## Configuration

### 1. Generate a Key

Create a random string. Example (run in terminal):

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
```

### 2. Set in .env

```env
# Backend reads this for validation
DEMO_API_KEY=your_generated_key_here

# Frontend reads this to send the header
NEXT_PUBLIC_DEMO_API_KEY=your_generated_key_here
```

Both values must match.

### 3. ⚠️ Security Notes

- `DEMO_API_KEY` — Private, stays on the backend. Never exposed to the browser.
- `NEXT_PUBLIC_DEMO_API_KEY` — **Not a secret.** It's a temporary dev key that gets embedded in frontend JavaScript. This is acceptable because:
  - It only works with the backend's CORS-allowed origins
  - It will be removed when real JWT authentication is implemented
  - It provides no access to production systems

**Never put in `NEXT_PUBLIC_`:**
- `DATABASE_URL`
- `LLM_API_KEY`
- `JWT_SECRET`
- Neon credentials
- Any real secrets

---

## Frontend Behavior

The frontend API client (`frontend/services/api.ts`) automatically:

1. Reads `NEXT_PUBLIC_DEMO_API_KEY` from environment
2. Attaches it as `X-API-Key` header on every request
3. Handles 401 errors with a clear message

If `NEXT_PUBLIC_DEMO_API_KEY` is empty, the header is not sent (allows health checks to work without a key).

---

## Backend Behavior

### Protected Endpoints (require API key)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/system/connectivity` | GET | Development connectivity check |
| `/api/locations` | GET | List locations |
| `/api/locations/:id` | GET | Get location by ID |
| `/api/heritage` | GET | List heritage entities |
| `/api/heritage/:id` | GET | Get heritage entity by ID |
| `/api/timeline` | GET | List historical periods |
| `/api/timeline/eras` | GET | List eras |
| `/api/search` | GET | Full-text search |

### Public Endpoints (no API key required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |

---

## Error Responses

### Missing or Invalid Key

```json
{
  "success": false,
  "error": {
    "code": "INVALID_API_KEY",
    "message": "Invalid API key"
  }
}
```

HTTP Status: `401`

### Key Not Configured on Server

```json
{
  "success": false,
  "error": {
    "code": "API_KEY_NOT_CONFIGURED",
    "message": "Development API key is not configured on the server."
  }
}
```

HTTP Status: `401`

The server never reveals what the correct key is.

---

## Why This Is NOT Production Authentication

| Aspect | DEMO_API_KEY | Production Auth (Future) |
|--------|-------------|------------------------|
| Scope | All-or-nothing | Per-user permissions |
| Identity | None | User identity tracked |
| Expiry | Never | Token expiry + refresh |
| Revocation | Change env var | Per-user revocation |
| Audit trail | None | Full audit log |
| Multi-tenant | No | Yes |

---

## Future Replacement

When the project implements JWT authentication:

1. Remove `DEMO_API_KEY` from `.env`
2. Remove `NEXT_PUBLIC_DEMO_API_KEY` from `.env`
3. Remove `requireDevelopmentApiKey` middleware from routes
4. Replace with JWT verification middleware
5. Update frontend API client to send `Authorization: Bearer <token>` header
6. Remove this documentation file or archive it

---

## Testing

### Test with curl

```bash
# Without key (should return 401)
curl http://localhost:3001/api/locations

# With key (should return data)
curl -H "X-API-Key: your_key_here" http://localhost:3001/api/locations

# Health check (no key needed)
curl http://localhost:3001/api/health
```

### Test connectivity

```bash
curl -H "X-API-Key: your_key_here" http://localhost:3001/api/system/connectivity
```

Expected:
```json
{
  "success": true,
  "backend": "connected",
  "database": "connected",
  "environment": "development"
}
```
