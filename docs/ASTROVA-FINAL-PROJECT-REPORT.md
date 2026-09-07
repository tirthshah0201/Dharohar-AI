# Astrova — Final Project Report

## AI-Powered Multilingual Indian Heritage Exploration Platform

---

## 1. Abstract

Astrova is an AI-powered multilingual Indian cultural heritage exploration platform that unifies fragmented heritage knowledge into a single accessible digital platform. The system provides interactive map-based discovery, curated collections, historical timeline visualization, full-text search, user authentication with persistent favorites, and a comprehensive admin content management system. Built with Next.js, Express.js, and Neon PostgreSQL, Astrova demonstrates modern full-stack architecture with real-time data management across 74 heritage entities spanning 12 Indian states.

---

## 2. Introduction

India possesses one of the world's richest cultural heritages, spanning thousands of years across diverse regions, languages, and traditions. However, this knowledge remains fragmented across physical archives, academic papers, government databases, and informal sources. Astrova addresses this challenge by creating a unified digital platform that makes Indian heritage accessible, explorable, and preservable.

The platform combines interactive mapping technology, curated content organization, multilingual search capabilities, and AI-powered assistance to create an immersive heritage exploration experience. An administrative portal enables content managers to maintain and expand the heritage database through a full-featured content management system.

---

## 3. Problem Statement

Indian cultural heritage knowledge faces several critical challenges:

1. **Fragmentation**: Heritage information is scattered across disparate sources — government archives, academic papers, tourism websites, and oral traditions.

2. **Inaccessibility**: Much of the knowledge exists in regional languages or physical formats, making it inaccessible to global audiences and researchers.

3. **Lack of Context**: Individual heritage items are presented in isolation without historical context, geographic relationships, or cultural connections.

4. **Poor Digitization**: Many significant heritage sites, especially lesser-known ones, lack proper digital documentation.

5. **No Unified Platform**: No single platform provides comprehensive exploration of Indian heritage with map-based discovery, timeline visualization, and curated collections.

---

## 4. Objectives

1. Create a unified digital platform for Indian cultural heritage exploration
2. Implement interactive map-based heritage discovery using Leaflet/OpenStreetMap
3. Build curated heritage collections with editorial descriptions
4. Develop historical period timeline visualization
5. Implement full-text search with multilingual support
6. Build user authentication with persistent favorites
7. Create an admin content management system with full CRUD operations
8. Preserve AI/chatbot infrastructure for future multilingual assistance
9. Ensure responsive design across desktop, tablet, and mobile
10. Implement comprehensive security with JWT, API keys, and rate limiting

---

## 5. Proposed Solution

Astrova provides a comprehensive web-based platform that:

- **Organizes** 74 heritage entities across 12 Indian states with detailed metadata
- **Maps** heritage locations with interactive Leaflet/OpenStreetMap integration
- **Curates** 6 themed collections with editorial descriptions
- **Visualizes** 9 historical periods from Ancient (-3300 BCE) to Modern (1947–present)
- **Searches** across heritage names, descriptions, and categories
- **Authenticates** users with JWT-based authentication and HttpOnly cookies
- **Manages favorites** with per-user isolation and database persistence
- **Administers** content through a full-featured admin portal with 8 management sections
- **Preserves** AI/chatbot infrastructure for future multilingual development

---

## 6. Scope

### In Scope
- Heritage entity management and display
- Interactive map with Leaflet
- Historical period timeline
- Curated collections
- Full-text search
- User authentication and favorites
- Admin content management (Heritage, Media, Locations, Sources, Users, Collections, Periods)
- Responsive design
- Security (API keys, JWT, rate limiting)

### Out of Scope
- Mobile native applications
- Real-time chatbot (deferred — under construction)
- Social sharing features
- E-commerce/ticketing
- Multi-language UI translation (backend supports multilingual data)

---

## 7. Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js (App Router) | 16.3.2 |
| UI Library | React | 19.2.8 |
| Language | TypeScript | Latest |
| Styling | Tailwind CSS | v4 |
| Animations | Motion (Framer Motion) | ^13.1.1 |
| Maps | Leaflet.js | ^1.9.4 |
| Icons | Lucide React | ^1.34.0 |
| Backend | Express.js | ^4.21.2 |
| Database | Neon PostgreSQL | Serverless |
| DB Client | pg (node-postgres) | ^8.23.0 |
| Authentication | JWT (jsonwebtoken) | ^9.0.3 |
| Password Hashing | bcrypt | ^6.0.0 |
| Cookies | cookie-parser | ^1.4.7 |
| CORS | cors | ^2.8.5 |
| Environment | dotenv | ^16.4.7 |

---

## 8. System Architecture

```
┌─────────────────────────────────────────────┐
│                  User                       │
│               (Browser)                     │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│            Next.js Frontend                  │
│    React Components + App Router + State     │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│          Next.js API Proxy                   │
│    /api/proxy/* — Attaches API key           │
│    Forwards cookies + admin tokens           │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│           Express Backend                    │
│    /api/* — Routes + Middleware + Services   │
│    Auth │ API Key │ Rate Limit │ Admin       │
└─────────────────┬───────────────────────────┘
                  │
┌─────────────────▼───────────────────────────┐
│         Neon PostgreSQL                      │
│    15 tables │ 27 migrations │ JSONB         │
└─────────────────────────────────────────────┘
```

### Architecture Diagram

See `docs/diagrams/SYSTEM-ARCHITECTURE.md` for the complete Mermaid diagram.

---

## 9. Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR-01 | User can browse all heritage entities | ✅ Implemented |
| FR-02 | User can search heritage by name/description | ✅ Implemented |
| FR-03 | User can filter by state, category, period | ✅ Implemented |
| FR-04 | User can view heritage details with story, media, sources | ✅ Implemented |
| FR-05 | User can explore heritage on interactive map | ✅ Implemented |
| FR-06 | User can view historical timeline | ✅ Implemented |
| FR-07 | User can browse curated collections | ✅ Implemented |
| FR-08 | User can register and login | ✅ Implemented |
| FR-09 | Authenticated user can manage favorites | ✅ Implemented |
| FR-10 | Admin can manage heritage (CRUD) | ✅ Implemented |
| FR-11 | Admin can manage media (Image/Video) | ✅ Implemented |
| FR-12 | Admin can manage locations with coordinates | ✅ Implemented |
| FR-13 | Admin can manage sources | ✅ Implemented |
| FR-14 | Admin can manage collections | ✅ Implemented |
| FR-15 | Admin can manage historical periods | ✅ Implemented |
| FR-16 | Admin can view/manage users | ✅ Implemented |
| FR-17 | AI chatbot provides multilingual assistance | 🟡 Under Construction |

---

## 10. Non-Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| NFR-01 | Responsive design (desktop, tablet, mobile) | ✅ Implemented |
| NFR-02 | JWT authentication with HttpOnly cookies | ✅ Implemented |
| NFR-03 | API key protection (server-side) | ✅ Implemented |
| NFR-04 | Rate limiting on sensitive endpoints | ✅ Implemented |
| NFR-05 | CORS configuration | ✅ Implemented |
| NFR-06 | Sanitized production errors | ✅ Implemented |
| NFR-07 | UUID validation on all ID parameters | ✅ Implemented |
| NFR-08 | Timing-safe token comparison | ✅ Implemented |
| NFR-09 | Loading/error/empty states on all pages | ✅ Implemented |
| NFR-10 | Accessibility (semantic HTML, ARIA labels) | ✅ Implemented |

---

## 11. System Modules

### 11.1 Heritage Module
- 74 heritage entities across 12 Indian states
- Categories: monument, craft, tradition, festival, natural_landmark, cuisine, person, architecture, event, food, community
- Full-text search with suggestions
- State, category, and period filtering

### 11.2 Map Module
- Interactive Leaflet map with OpenStreetMap tiles
- Heritage markers with popup details
- State-based filtering with fly-to animation
- Category-based marker filtering

### 11.3 Collections Module
- 6 curated collections with editorial descriptions
- Collection detail with heritage items
- Related collections

### 11.4 Timeline Module
- 9 historical periods from -3300 BCE to present
- Heritage entities grouped by period
- BCE/CE display

### 11.5 Authentication Module
- JWT-based authentication
- HttpOnly cookies (SameSite: lax)
- bcrypt password hashing (10 rounds)
- Register, login, logout, session management

### 11.6 Favorites Module
- Per-user isolated favorites
- Backend-enforced user identity from JWT
- Login required for anonymous users
- Database persistence in user_favorites table

### 11.7 Admin Module
- 8-section management dashboard
- Heritage, Media, Locations, Sources, Users, Collections, Periods, Dashboard
- Full CRUD operations
- 15 dynamic statistics
- X-Admin-Token authentication

### 11.8 AI/Chatbot Module
- Multilingual knowledge base (107 records)
- Intent detection and response generation
- **Status: Under Construction** — infrastructure preserved for future development

---

## 12. Database Design

### 12.1 Tables

| Table | Records | Purpose |
|-------|---------|---------|
| heritage_entities | 74 | Cultural heritage records |
| locations | 54 | Geographic locations |
| media | 72 | Images/videos/documents |
| sources | 18 | Reference sources |
| relationships | 49 | Heritage relationships |
| historical_periods | 9 | Time periods |
| collections | 7 | Curated collections |
| collection_items | 98 | Collection-heritage junction |
| supported_states | 12 | Indian states |
| chatbot_knowledge | 107 | Chatbot training data |
| conversations | — | Chat sessions |
| conversation_messages | — | Chat messages |
| analytics_events | 0 | Usage analytics |
| users | 25 | User accounts |
| user_favorites | 4 | User favorites |

### 12.2 E-R Diagram

See `docs/diagrams/ER-DIAGRAM.md` for the complete Mermaid ER diagram.

---

## 13. Data Flow Diagrams

### 13.1 DFD Level 0 (Context)

See `docs/diagrams/DFD.md` — Context Diagram section.

### 13.2 DFD Level 1

See `docs/diagrams/DFD.md` — Level 1 section.

### 13.3 DFD Level 2

See `docs/diagrams/DFD.md` — Level 2 sections (Heritage Discovery and Authentication/Favorites).

---

## 14. Use Case Diagram

See `docs/diagrams/USE-CASE-DIAGRAM.md` for the complete Mermaid use case diagram with actor descriptions and use case details.

---

## 15. Class Diagram

See `docs/diagrams/CLASS-DIAGRAM.md` for the complete Mermaid class diagram showing frontend components, backend modules, and data models.

---

## 16. Activity Diagram

See `docs/diagrams/ACTIVITY-DIAGRAM.md` for the complete Mermaid activity diagrams showing user journeys and admin workflows.

---

## 17. User Flow

See `docs/diagrams/USER-FLOW.md` for detailed user flow documentation covering visitor, registration, login, favorite, discovery, search, map, collection, timeline, and admin journeys.

---

## 18. API Architecture

### 18.1 API Proxy Pattern

All frontend API calls go through the Next.js API proxy (`/api/proxy/*`), which:
1. Attaches `X-API-Key` server-side (never exposed to browser)
2. Forwards `Cookie` header for authentication
3. Forwards `X-Admin-Token` for admin operations
4. Proxies request to Express backend

### 18.2 API Categories

| Category | Endpoints | Auth |
|----------|-----------|------|
| Public | 14 endpoints | X-API-Key |
| Auth | 4 endpoints | None (public) |
| Favorites | 5 endpoints | JWT Cookie |
| Admin | 28 endpoints | X-Admin-Token |

### 18.3 Complete API Inventory

See `docs/PROJECT-SOURCE-OF-TRUTH.md` — Section E for the complete API table.

---

## 19. Authentication & Security

### 19.1 Authentication Flow

1. User submits credentials
2. Backend validates against bcrypt hash
3. JWT token generated (7-day expiry)
4. Token set as HttpOnly cookie (`astrova_session`)
5. Subsequent requests include cookie automatically
6. `requireAuth` middleware verifies JWT and attaches `req.user`

### 19.2 Security Features

- **HttpOnly cookies**: Prevent XSS access to JWT
- **SameSite: lax**: Prevents most CSRF attacks
- **Secure flag**: Enabled in production (HTTPS only)
- **Timing-safe comparison**: Prevents timing attacks on tokens
- **Rate limiting**: Login (5/15min), Register (3/hour), Favorites (30/min)
- **UUID validation**: All ID parameters validated before database queries
- **Sanitized errors**: No stack traces or internal details in production responses
- **API key server-side**: Never exposed to browser

---

## 20. Admin Portal

### 20.1 Sections

| Section | CRUD | Records |
|---------|------|---------|
| Dashboard | Read | 15 statistics |
| Heritage | Full CRUD | 74 entities |
| Media | Full CRUD | 72 records |
| Locations | Full CRUD | 54 locations |
| Sources | Full CRUD | 18 sources |
| Users | Read + Delete | 25 users |
| Collections | Full CRUD + Items | 7 collections |
| Periods | Full CRUD | 9 periods |

### 20.2 Admin Security

- No token → 401 UNAUTHORIZED
- Wrong token → 403 FORBIDDEN
- Correct token → 200 OK
- Timing-safe comparison via `crypto.timingSafeEqual`

---

## 21. Favorites & User Data Isolation

### 21.1 Architecture

- Favorites are **exclusively per-user**
- Backend derives user identity from JWT (never from client)
- All queries filter by `user_id = authenticatedUser.id`
- Anonymous users see login-required modal (no records created)

### 21.2 Isolation Guarantees

- User A cannot see User B's favorites
- User B cannot delete User A's favorites
- Backend enforces ownership on every operation
- localStorage leakage between users eliminated

---

## 22. Map & Heritage Discovery

- **Technology**: Leaflet.js + OpenStreetMap tiles
- **Markers**: Heritage entities with coordinates from `locations` table
- **State filtering**: Fly-to animation, filtered markers
- **Category filtering**: Marker visibility by heritage category
- **Popups**: Heritage name, category, view detail link
- **Navigation**: Click marker → Heritage detail page

---

## 23. Search & Filtering

- **Full-text search**: PostgreSQL `to_tsvector` / `ILIKE` queries
- **Search suggestions**: Debounced API calls with result previews
- **Multi-filter**: State + Category + Period + Text query
- **Global search modal**: Available from any page via search icon

---

## 24. Collections

- 6 curated collections with editorial descriptions
- Heritage entities grouped by theme (Sacred Architecture, Indian Crafts, etc.)
- Collection detail pages with entity listing
- Related collections based on shared heritage
- Admin management (create, edit, delete, add/remove items)

---

## 25. Timeline

- 9 historical periods from -3300 BCE to present
- Heritage entities grouped by period
- BCE/CE display formatting
- Period descriptions with duration calculation
- Searchable and filterable

---

## 26. AI/Chatbot Architecture

**Status: UNDER CONSTRUCTION**

- Frontend: `/ai` page shows "Under Construction" branded state
- Backend: `routes/ai.ts`, `services/chatbot.ts` preserved
- Database: `chatbot_knowledge` (107 records), `conversations`, `conversation_messages`
- Intent detection: Regex-based fallback with multilingual support
- Script detection: Unicode-based language detection for non-Latin scripts
- **Intentionally deferred** for future dedicated development phase

---

## 27. Testing & Verification

### 27.1 API Regression
- 24/24 endpoints tested and passing

### 27.2 Multi-User Isolation
- 14/14 tests passing (User A/User B isolation verified)

### 27.3 TypeScript
- Backend: PASS
- Frontend: PASS

### 27.4 Build
- Frontend production build: PASS (15 routes)

### 27.5 Security
- Missing API key → 401 ✅
- Invalid API key → 401 ✅
- Missing Admin token → 401 ✅
- Wrong Admin token → 403 ✅
- Unauthenticated favorites → 401 ✅

---

## 28. Bugs Found & Fixed

| ID | Severity | Bug | Fix |
|----|----------|-----|-----|
| BUG-001 | Critical | Heritage Detail NULL source crash | Added `heritage.source.id` guard |
| BUG-002 | High | Auth render-phase router.push() | Moved to useEffect |
| BUG-003 | High | Favorites treats auth user as signed out | Shared auth state in useFavorites |
| BUG-004 | High | Login rate limit blocks registration | Removed global authRateLimit |
| BUG-005 | Medium | Location .toFixed() crash | Number() conversion + isFinite check |
| BUG-006 | Medium | Anonymous users could create favorites | Login-required modal + auth-only hook |
| BUG-007 | Medium | localStorage favorites leaked between users | Removed anonymous localStorage |

---

## 29. Database Statistics

| Table | Records |
|-------|---------|
| heritage_entities | 74 |
| media | 72 |
| relationships | 49 |
| locations | 54 |
| sources | 18 |
| historical_periods | 9 |
| collections | 7 |
| collection_items | 98 |
| supported_states | 12 |
| chatbot_knowledge | 107 |
| users | 25 |
| user_favorites | 4 |
| analytics_events | 0 |
| **Total tables** | **15** |
| **Total migrations** | **27** |

---

## 30. Limitations

1. **Chatbot**: Under construction — not production-ready
2. **Rate limiting**: In-memory (resets on server restart)
3. **Media storage**: URL-based only (no file upload)
4. **Pagination**: Limited to 200 records per query
5. **No real-time updates**: Admin changes require page refresh
6. **No image upload**: Media managed via URL only

---

## 31. Future Scope

1. **Chatbot Development**: Full multilingual AI assistant
2. **Image Upload**: Cloud storage integration for media
3. **Pagination**: Server-side pagination for large datasets
4. **Real-time Updates**: WebSocket-based live updates
5. **Mobile App**: React Native or Flutter mobile application
6. **Advanced Analytics**: User behavior tracking and insights
7. **Social Features**: Sharing, comments, community contributions
8. **Multi-language UI**: Interface translation support

---

## 32. Conclusion

Astrova successfully demonstrates a modern full-stack web application for Indian cultural heritage exploration. The platform provides:

- **74 heritage entities** across 12 Indian states
- **Interactive map-based discovery** with Leaflet/OpenStreetMap
- **6 curated collections** with editorial descriptions
- **9 historical periods** from -3300 BCE to present
- **Full-text search** with multilingual support
- **User authentication** with JWT and HttpOnly cookies
- **Per-user isolated favorites** with database persistence
- **Complete admin portal** with 8 management sections
- **Comprehensive security** with API keys, JWT, and rate limiting

The project demonstrates proper software engineering practices including:
- Type-safe codebase (TypeScript throughout)
- Clean architecture (separation of concerns)
- Security-first design (no secrets exposed)
- Database integrity (proper foreign keys and constraints)
- Responsive design (mobile-friendly)
- Comprehensive testing and documentation

---

## 33. References

1. Next.js Documentation — https://nextjs.org/docs
2. Express.js Documentation — https://expressjs.com/
3. Leaflet.js — https://leafletjs.com/
4. OpenStreetMap — https://www.openstreetmap.org/
5. Neon PostgreSQL — https://neon.tech/
6. JWT Specification — https://jwt.io/
7. bcrypt — https://www.npmjs.com/package/bcrypt
8. Tailwind CSS — https://tailwindcss.com/
9. Lucide Icons — https://lucide.dev/
10. Motion (Framer Motion) — https://www.framer.com/motion/

---

## Appendix A: Project Files

### Frontend Routes (15)
- `/` — Homepage
- `/heritage` — Heritage listing
- `/heritage/[id]` — Heritage detail
- `/explore` — Map exploration
- `/explore/[id]` — State exploration
- `/collections` — Collections listing
- `/collections/[slug]` — Collection detail
- `/timeline` — Historical timeline
- `/favorites` — User favorites
- `/auth` — Login/Register
- `/admin` — Admin portal
- `/ai` — AI Chatbot (Under Construction)
- `/about` — About page
- `/api/proxy/[...path]` — API proxy

### Backend Routes (14)
- `/api/health` — Health check
- `/api/heritage` — Heritage CRUD
- `/api/search` — Full-text search
- `/api/locations` — Location queries
- `/api/media` — Media records
- `/api/sources` — Source records
- `/api/periods` — Historical periods
- `/api/timeline` — Timeline data
- `/api/collections` — Collection queries
- `/api/auth` — Authentication
- `/api/favorites` — User favorites
- `/api/admin` — Admin management
- `/api/ai` — AI/Chatbot
- `/api/system` — System info
