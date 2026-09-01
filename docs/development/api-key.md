# Development API Key — Astrova

## Purpose

The development API key (`DEMO_API_KEY`) is a **temporary mechanism** for establishing controlled frontend → backend connectivity during development. It is **NOT** a production authentication system.

---

## Architecture (Updated)

```
Browser
  ↓  Sends request to /api/proxy/*
  ↓
Next.js API Route (/api/proxy/[...path])
  ↓  Attaches X-API-Key header (server-side)
  ↓
Backend (Express)
  ↓  requireDevelopmentApiKey middleware validates the key
  ↓
API Endpoint
  ↓  Processes request if key is valid
  ↓
Response to Browser
```

**Security Improvement:** The API key is now **server-side only**. `NEXT_PUBLIC_DEMO_API_KEY` has been removed from the frontend.

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

# Proxy route reads this to forward requests
API_BASE_URL=http://localhost:3001
```

### 3. Security Notes

- `DEMO_API_KEY` — Server-side only, never exposed to the browser
- `API_BASE_URL` — Backend URL for the proxy route
- The frontend no longer needs `NEXT_PUBLIC_DEMO_API_KEY`

**Never put in `NEXT_PUBLIC_`:**
- `DATABASE_URL`
- `LLM_API_KEY`
- `JWT_SECRET`
- `DEMO_API_KEY`
- Any real secrets

---

## How the Proxy Works

The frontend API client (`frontend/services/api.ts`) routes all requests through `/api/proxy/*`:

1. Browser calls `/api/proxy/heritage`
2. Next.js route handler receives the request
3. Route handler attaches `X-API-Key` from `DEMO_API_KEY` env var
4. Proxied request sent to backend
5. Response returned to browser

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
| `/api/ai/*` | * | AI endpoints |

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

## Testing

### Test via Proxy (Frontend)

The frontend automatically routes through the proxy. No manual API key entry needed.

### Test with curl (Direct Backend Access)

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
2. Remove `requireDevelopmentApiKey` middleware from routes
3. Replace with JWT verification middleware
4. Update frontend to send `Authorization: Bearer <token>` header
5. Remove this documentation file or archive it
