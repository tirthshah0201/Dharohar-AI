# Astrova — Project Status Report

## Current Phase

P1.37 — Admin Portal Final Completion (COMPLETE)

**Status: PASS**

Complete Admin Portal with full CRUD for Heritage, Media, Locations, Sources, Users, Collections, and Historical Periods. Location .toFixed crash fixed. Period CRUD implemented. Media restricted to Image/Video. Muted video support added. 29/29 API tests pass.

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
- **Favorites** — persistent for authenticated users, localStorage for anonymous
- **Admin Portal** — 8-section management dashboard with full CRUD
- **Chatbot** — Under Construction (infrastructure preserved)
- **Responsive Design** — mobile-friendly across all pages

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

## Bugs Fixed in P1.37

1. Location `.toFixed()` crash — PostgreSQL decimal as string
2. Historical Periods read-only → full CRUD
3. Media type restriction — Image/Video only in Admin
4. Heritage video not muted — added `<video muted playsInline>`

## Database

- **15 tables**, **27 sequential migrations**
- Neon PostgreSQL

## Security

- X-API-Key (server-side via proxy)
- X-Admin-Token for admin routes (timing-safe comparison)
- JWT with HttpOnly cookies
- Route-specific rate limiting
- CORS, UUID validation, sanitized errors

## GitHub

Current checkpoint: `0f1b285` (main)
Remote: https://github.com/tirthshah0201/Dharohar-AI.git

GitHub push completed: `5cbce57` (main → origin/main)
