# Astrova

**Discover India. Experience Heritage.**

Astrova is an AI-powered multilingual platform for exploring and preserving India's cultural heritage. It covers 12 Indian states with 74 heritage entities across monuments, crafts, festivals, traditions, food, and natural landmarks.

## Purpose

India's vast cultural heritage is fragmented across static websites, unstructured documents, and inaccessible databases. Astrova provides a unified, interactive platform for discovering heritage across states, languages, and cultural categories — with AI-powered assistance in 6 Indian languages.

## Features

- **Heritage Discovery** — Browse 74 heritage entities across 12 Indian states with detailed descriptions, media, and historical context
- **Interactive Map** — Explore heritage locations with state and period filtering (Leaflet / MapTiler)
- **Historical Timeline** — Navigate 9 historical periods from ancient to modern India
- **Curated Collections** — 6 themed collections: Sacred Architecture, Indian Crafts, Living Traditions, Natural Heritage, Ancient India, First-Time Explorer's Guide
- **AI Chatbot** — Ask questions in 6 languages (English, Gujarati, Hindi, Marathi, Tamil, Punjabi) with multilingual knowledge retrieval and romanized input support
- **Search** — Full-text search with relevance ranking, autocomplete suggestions, and collection discovery
- **User Favorites** — Persistent PostgreSQL-backed favorites (requires account); localStorage for unauthenticated users with sync on login
- **Admin Dashboard** — Content management for heritage entities, collections, and analytics
- **Authentication** — JWT-based with HttpOnly cookies, bcrypt password hashing

## Architecture

```
Browser → Next.js Frontend (:3000) → API Proxy → Express Backend (:3001) → Neon PostgreSQL
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Backend | Express.js, TypeScript, pg |
| Database | Neon PostgreSQL |
| Authentication | JWT + HttpOnly cookies |
| AI/Chatbot | Regex + ML intent classification, OpenStreetMap geocoding |
| Maps | Leaflet / MapTiler |

## Repository Structure

```
├── frontend/          Next.js application
│   ├── app/           App Router pages
│   ├── components/    Reusable UI components
│   ├── hooks/         React hooks (useAuth, useFavorites)
│   ├── services/      API client
│   └── constants/     Application constants
├── backend/           Express.js API server
│   ├── src/
│   │   ├── routes/    API route handlers
│   │   ├── middleware/ Authentication, rate limiting, validation
│   │   ├── services/  Chatbot service
│   │   └── config/    Configuration
│   └── dist/          Compiled output
├── database/          Migrations and schema
│   └── migrations/    27 sequential migrations
├── ai-service/        FastAPI AI service (optional, legacy — separate from active backend)
├── ml/                ML training data and models
├── docs/              Documentation
└── scripts/           Utility scripts
```

## Prerequisites

- Node.js 18+
- npm
- Neon PostgreSQL account (or compatible PostgreSQL)

## Installation

```bash
# Clone and install
git clone <repo-url> && cd astrova
cd frontend && npm install
cd backend && npm install
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

### Server-Side Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string | — |
| `JWT_SECRET` | Yes | JWT signing key (generate below) | — |
| `DEMO_API_KEY` | Yes | Development API key for frontend proxy | — |
| `ADMIN_TOKEN` | No | Enables admin dashboard (503 without it) | (disabled) |
| `JWT_EXPIRY` | No | Token lifetime | `7d` |
| `ALLOWED_ORIGINS` | No | CORS origins for production (comma-separated) | `http://localhost:3000` |
| `PORT` | No | Backend port | `3001` |
| `NODE_ENV` | No | Set to `production` for production deployment | `development` |
| `API_BASE_URL` | No | Backend URL for Next.js proxy | `http://localhost:3001` |

Generate `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Client-Side Variables

| Variable | Description |
|----------|-------------|
| `MAPTILER_API_KEY` | Map tiles (free tier: 100k tiles/month) |
| `NEXT_PUBLIC_API_URL` | API base URL for client-side fetches |
| `NEXT_PUBLIC_AI_SERVICE_URL` | AI service URL (optional) |

**Security note:** `DEMO_API_KEY` should be a strong randomized secret in production. The frontend `.env.local` must contain `DEMO_API_KEY` for the Next.js server-side proxy — it is never exposed to the browser.

## Development Startup

```bash
# Terminal 1 — Backend (port 3001)
cd backend && npm run dev

# Terminal 2 — Frontend (port 3000)
cd frontend && npm run dev
```

Open http://localhost:3000

## Production Build / Start

```bash
cd frontend && npm run build
cd backend && npm run build
cd backend && node dist/index.js
```

### Deployment Requirements

1. Set `NODE_ENV=production` — without it, CORS defaults to permissive mode
2. Set `ADMIN_TOKEN` — without it, admin endpoints return 503
3. Set a strong `JWT_SECRET` — without it, auth endpoints return 503
4. Set `DATABASE_URL` — without it, no database operations work
5. Set a strong `DEMO_API_KEY` — without it, all data endpoints return 401

## API Architecture

The frontend communicates with the backend through a Next.js API proxy (`/api/proxy/*`). The API key is attached server-side, keeping it hidden from the browser.

```
Browser → /api/proxy/heritage → Next.js (adds X-API-Key) → Backend:3001/api/heritage
```

## API Endpoint Overview

### Public (no API key)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |

### Data (require X-API-Key)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/heritage` | GET | Heritage entity listing |
| `/api/heritage/:id` | GET | Heritage entity detail |
| `/api/search?q=` | GET | Full-text search |
| `/api/search/suggestions?q=` | GET | Autocomplete suggestions |
| `/api/locations` | GET | Geographic locations |
| `/api/periods` | GET | Historical periods |
| `/api/timeline` | GET | Periods with heritage entities |
| `/api/media` | GET | Media records |
| `/api/sources` | GET | Source attributions |
| `/api/collections` | GET | Curated collections |
| `/api/collections/:slug` | GET | Single collection with entities |

### AI/Chat (require X-API-Key, rate-limited 30/min)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ai/chat` | POST | Chat endpoint (6 languages) |
| `/api/ai/welcome` | GET | Welcome message for language |
| `/api/ai/suggestions` | GET | Context-aware suggestions |
| `/api/ai/languages` | GET | Supported languages list |

### Auth (rate-limited, see Authentication)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User login |
| `/api/auth/logout` | POST | Clear session |
| `/api/auth/me` | GET | Current user |

### Favorites (rate-limited 30/min, require cookie)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/favorites` | GET | List favorites |
| `/api/favorites/:heritageId/status` | GET | Check favorite status |
| `/api/favorites/:heritageId` | POST | Add favorite |
| `/api/favorites/:heritageId` | DELETE | Remove favorite |
| `/api/favorites/sync` | POST | Sync localStorage favorites |

### Admin (require X-Admin-Token)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/overview` | GET | Dashboard counts |
| `/api/admin/heritage` | GET | Heritage management |
| `/api/admin/collections` | GET/POST | Collection management |
| `/api/admin/analytics/overview` | GET | Analytics aggregation |

## Authentication

- JWT-based with HttpOnly cookies (`astrova_session`)
- bcrypt password hashing (10 rounds)
- 7-day token expiry
- Server-side session verification on every request
- Fail-safe: refuses token operations if `JWT_SECRET` not configured (returns 503)
- Register: 3 accounts/hour + 10 requests/15min per IP
- Login: 5 attempts/15min + 10 requests/15min per IP

## Favorites

- Persistent PostgreSQL-backed favorites for authenticated users
- localStorage favorites for unauthenticated users
- Automatic sync from localStorage to backend on login
- Duplicate prevention, ownership isolation

## Admin

- Protected by `X-Admin-Token` header (separate from user authentication)
- `ADMIN_TOKEN` not set → 503; missing header → 401; incorrect → 403; correct → 200
- Overview dashboard with entity counts
- Heritage entity management (view, filter, edit)
- Collection management (CRUD, items, ordering)
- Analytics aggregation

## Chatbot

- 6 languages: English, Gujarati, Hindi, Marathi, Tamil, Punjabi
- Language-aware knowledge retrieval with English fallback
- Romanized input detection (Gujarati, Hindi, Marathi, Tamil, Punjabi)
- Intent detection: greeting, heritage, location, state, craft, person, festival, period, collection
- OpenStreetMap geocoding for location queries
- Rate limited to 30 requests per minute

## Maps

- Leaflet-based interactive map with MapTiler tile provider
- State and period filtering
- Heritage entity markers with popups
- Direct navigation to heritage detail pages

## Database

- **Engine:** Neon PostgreSQL
- **Migrations:** 27 sequential files in `database/migrations/`
- **15 tables:** heritage_entities, media, relationships, historical_periods, locations, sources, chatbot_knowledge, supported_states, collections, collection_items, analytics_events, users, user_favorites, conversations, conversation_messages

## Security

- **JWT authentication** with HttpOnly cookies, bcrypt (10 rounds), 7-day expiry
- **Rate limiting** — in-memory sliding window: auth 10/15min, register 3/hr, login 5/15min, chat 30/min, favorites 30/min
- **Admin auth** via X-Admin-Token with timing-safe comparison
- **API key** server-side only (constant-time comparison, never exposed to browser)
- **CORS** configurable via `ALLOWED_ORIGINS` in production; permissive in development
- **UUID validation** on media, source, location, and favorites endpoints
- **Parameterized SQL** throughout (no injection risk)
- **No stack traces** in production error responses
- **Trust proxy** configured as `loopback` for same-host architecture
- **Body size limit** 1MB

## Known Limitations

- In-memory rate limiting (single-server, resets on restart, not suitable for horizontal scaling)
- No pagination on list endpoints (works for current 74 entities)
- No structured logging
- No CI/CD pipeline
- No password reset or email verification
- No refresh tokens
- `DEMO_API_KEY` should be randomized for production

## Production-Readiness Status

**Demo/staging ready with documented production limitations.**

Not yet ready for public production due to in-memory rate limiting, no structured logging, no CI/CD, and no pagination.

## Future Roadmap

- Pagination for large datasets
- Structured logging
- CI/CD pipeline
- Password reset flow
- Email verification
- Distributed rate limiting (Redis)
- User profiles and social features
- Heritage contribution system
- Offline/PWA support
- Additional Indian states and languages

## License

UNLICENSED — Internal project.
