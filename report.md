# Astrova — Project Status Report

## Current Phase

P1.37 — Favorites Authentication & User Isolation Fix (COMPLETE)

**Status: PASS**

Fixed serious Favorites module bug: anonymous users could create favorites and user data was not properly isolated between authenticated users. Favorites are now exclusively per-user, authenticated-only, with login-required prompt for anonymous users.

## Architecture

```
Browser → Next.js Frontend → API Proxy → Express Backend → Neon PostgreSQL
```

## Key Features

- **74 Heritage Entities** across 12 Indian states
- **Interactive Map** with Leaflet + OpenStreetMap
- **6 Curated Collections** with editorial descriptions
- **9 Historical Periods** from Ancient to Modern
- **Full-text Search** with suggestions
- **Authentication** — JWT with HttpOnly cookies, bcrypt
- **Favorites** — persistent for authenticated users only (login required)
- **Admin Portal** — 8-section management dashboard with full CRUD
- **Chatbot** — Under Construction (infrastructure preserved)
- **Responsive Design** — mobile-friendly across all pages

## Bugs Fixed

### Favorites Auth/Isolation (P1.37)
1. **Anonymous favorites**: FavoriteButton now shows login modal instead of creating records
2. **User data isolation**: useFavorites uses shared auth state, no desync
3. **localStorage leakage**: Removed anonymous localStorage favorites — backend is sole source of truth
4. **Cross-user deletion**: Backend enforces user_id ownership on all operations

### Previous P1.37 Fixes
5. Location `.toFixed()` crash — PostgreSQL decimal as string
6. Historical Periods read-only → full CRUD
7. Media type restriction — Image/Video only in Admin
8. Heritage video not muted — added `<video muted playsInline>`

## Admin Portal — 8 Sections

| Section | CRUD | Verified |
|---------|------|----------|
| Dashboard | Read (15 dynamic stats) | ✅ |
| Heritage | Create, Read, Update, Delete | ✅ |
| Media | Create, Read, Update, Delete (Image/Video) | ✅ |
| Locations | Create, Read, Update, Delete | ✅ |
| Sources | Create, Read, Update, Delete | ✅ |
| Users | Read, Delete (safe cascade) | ✅ |
| Collections | Create, Read, Update, Delete | ✅ |
| Periods | Create, Read, Update, Delete | ✅ |

## Database

- **15 tables**, **27 sequential migrations**
- Neon PostgreSQL

## Security

- X-API-Key (server-side via proxy)
- X-Admin-Token for admin routes (timing-safe comparison)
- JWT with HttpOnly cookies
- Route-specific rate limiting
- CORS, UUID validation, sanitized errors
- Favorites: requireAuth on all endpoints, user_id from JWT

## GitHub

Current checkpoint: `567afbf` (main)
Remote: https://github.com/tirthshah0201/Dharohar-AI.git

GitHub push completed: `567afbf` (main → origin/main)
