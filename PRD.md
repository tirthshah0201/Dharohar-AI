# Astrova — Product Requirements Document

## Product Overview

Astrova is an AI-powered multilingual platform for discovering and preserving India's cultural heritage. It provides interactive exploration of heritage entities across 12 Indian states through search, maps, timelines, collections, and a multilingual AI chatbot.

## Problem Statement

India's vast cultural heritage is fragmented across static websites, unstructured documents, and inaccessible databases. There is no unified, interactive platform that enables discovery of heritage across states, languages, and cultural categories with AI-powered assistance.

## Target Users

- Heritage enthusiasts and travelers exploring Indian culture
- Students and researchers studying Indian history
- Cultural organizations documenting heritage
- Tourists planning visits to heritage sites
- General public interested in Indian traditions, crafts, and festivals

## Core User Flows

### Heritage Discovery
1. User visits home page → sees featured heritage, states, collections
2. User navigates to Explore → filters by state, category, or period
3. User clicks heritage entity → views detail page with media, relationships, period
4. User adds to favorites (requires account)

### Search
1. User types in search bar → autocomplete suggestions appear
2. User submits search → ranked results with relevance scoring
3. Results include heritage entities, locations, collections
4. User clicks result → navigates to detail page

### AI Chatbot
1. User opens AI page → selects language (6 supported)
2. User types question in any supported language (including romanized)
3. Chatbot detects intent, retrieves knowledge, returns grounded response
4. Response includes suggested follow-up questions and navigation actions

### Collections
1. User browses curated collections from home or collections page
2. User opens collection → sees themed heritage grouping
3. User explores individual entities within collection
4. Chatbot suggests relevant collections based on queries

### Timeline
1. User opens timeline → sees 9 historical periods
2. User clicks period → sees heritage entities from that era
3. User navigates between periods to explore chronological heritage

### Map Exploration
1. User opens explore page → interactive map loads
2. User filters by state or period → markers update
3. User clicks marker → popup with heritage summary
4. User navigates to heritage detail from popup

### Authentication & Favorites
1. User registers / logs in → JWT cookie set
2. User browses heritage → clicks heart to favorite
3. Favorites persist across devices via PostgreSQL
4. localStorage favorites sync to backend on login

### Admin
1. Admin accesses /admin with X-Admin-Token
2. Admin views dashboard with entity counts
3. Admin manages heritage entities and collections
4. Admin views analytics aggregation

## Feature Specifications

### Heritage Discovery
- 74 heritage entities across 12 states
- Categories: monument, craft, person, festival, architecture, event, food, community, tradition
- Detail pages with media gallery, relationships, period, location
- Related heritage based on relationship graph

### Search
- Full-text search with CASE-based relevance ranking
- Exact match > prefix match > contains match > description match
- Search suggestions with debounced autocomplete
- Collection suggestions in autocomplete
- Category, state, period, and type filters

### Collections
- 6 curated collections with editorial content
- Hero media support (editorial or fallback to primary media)
- Entity count and display ordering
- Related collections based on shared entities
- Collection discovery through chatbot

### Timeline
- 9 historical periods from ancient to modern
- Heritage entities grouped by period
- Entity counts per period

### AI Chatbot
- 6 languages: English, Gujarati, Hindi, Marathi, Tamil, Punjabi
- Language-aware knowledge retrieval with English fallback
- Romanized input detection (Gujarati, Hindi, Marathi, Tamil, Punjabi)
- Intent detection: greeting, heritage, location, state, craft, person, festival, period, collection
- Structured navigation actions
- Context-aware suggestions
- OpenStreetMap geocoding for location queries
- Rate limited to 30 requests per minute

### Authentication
- JWT-based with HttpOnly cookies
- bcrypt password hashing (10 rounds)
- 7-day token expiry
- Server-side session verification on every request
- Fail-safe: refuses token operations if JWT_SECRET not configured

### Favorites
- Persistent PostgreSQL-backed for authenticated users
- localStorage for unauthenticated users
- Automatic sync on login
- Duplicate prevention
- Ownership isolation (user can only see own favorites)

### Admin Dashboard
- Overview with entity counts
- Heritage entity management (view, filter, edit)
- Collection management (CRUD, items, ordering)
- Analytics aggregation
- Protected by X-Admin-Token (separate from user auth)

### Analytics
- Event tracking: heritage_view, search, collection_view, chatbot_query, favorite_add/remove
- Admin-only aggregation endpoints
- Privacy-conscious (no PII collection)

## Technical Architecture

```
Browser → Next.js Frontend (:3000) → API Proxy → Express Backend (:3001) → Neon PostgreSQL
```

### Frontend
- Next.js 16 App Router
- React 19, TypeScript, Tailwind CSS 4
- Motion/react animations
- Leaflet/MapTiler for maps
- Custom Astrova design system (terracotta palette, Playfair Display, Manrope)

### Backend
- Express.js with TypeScript
- JWT authentication with HttpOnly cookies
- Rate limiting (in-memory sliding window)
- Parameterized SQL queries
- CORS with configurable origins

### Database
- Neon PostgreSQL
- 27 sequential migrations
- 15 tables: heritage_entities, media, relationships, historical_periods, locations, sources, chatbot_knowledge, supported_states, collections, collection_items, analytics_events, users, user_favorites, conversations, conversation_messages

## Security Requirements

- JWT_SECRET must be configured (server refuses token operations without it)
- API key server-side only (never exposed to browser)
- Admin token separate from user authentication
- Rate limiting on auth, chat, and favorites endpoints
- UUID validation on all mutation endpoints
- Parameterized SQL (no injection)
- No stack traces in error responses
- HttpOnly, Secure (production), SameSite=Lax cookies

## Current Limitations

- In-memory rate limiting (single-server only)
- No pagination on list endpoints
- No structured logging
- No CI/CD pipeline
- No password reset or email verification
- No refresh tokens (JWT is stateless)
- Browser verification unavailable in current environment

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

---

## P1.33 Product Experience Findings

### Current Observations (September 3, 2026)

A comprehensive UX audit was performed across all 13 frontend pages, shared components, map, chatbot, search, and data presentation.

**What works well:**
- Homepage communicates purpose clearly ("Explore India. Discover Its Stories.")
- Interactive map with state filtering and heritage markers
- Multilingual chatbot with context-aware suggestions
- Timeline with 9 periods and entity grouping
- Search with keyboard navigation and relevance ranking
- Favorites with localStorage sync for unauthenticated users
- Consistent terracotta visual identity
- Responsive design across pages

**Key issues identified:**
1. Homepage "Explore Heritage" CTA uses blue (`#1a237e`) instead of terracotta — breaks visual identity
2. AI chatbot page shows "52 Heritage Records" (hardcoded) when actual count is 74
3. Homepage hero is text-only — no heritage imagery above the fold
4. Sources data (18 records) exists in API but is not displayed to users
5. Map preview on homepage shows a static icon instead of actual map
6. Heritage detail page shows description twice (truncated in hero + full in editorial)
7. Search modal doesn't return collection results
8. `categoryIcons` mapping duplicated across 5+ files

### Proposed Future Improvements

**High Priority (P1.34 candidates):**
- Fix blue CTA → terracotta (5 min)
- Fix "52 Heritage Records" → 74 (2 min)
- Add heritage hero imagery to homepage (1-2 hours)
- Add source attribution to heritage detail (30 min)
- Extract shared category constants (20 min)
- Fix description duplication on heritage detail (5 min)
- Add collection search to search modal (30 min)

**Medium Priority:**
- Add "Related Heritage" prominence on detail pages
- Add favorite count to navbar
- Add collection editorial storytelling
- Add heritage entity cards in chatbot responses
- Improve mobile timeline experience

**Low Priority / Future:**
- Pagination for large datasets
- Heritage image carousel on homepage
- Map marker clustering
- Offline PWA support
- Share functionality
- "Heritage of the day" feature

---

## P1.34 Visual Polish & Demo Readiness (Implemented)

### Changes Implemented

1. **Homepage CTA color** — Blue replaced with heritage-gold (terracotta palette)
2. **Dynamic statistics** — AI page count computed from live API data
3. **Homepage hero imagery** — Atmospheric heritage background with parallax
4. **Homepage map preview** — Stylized India silhouette with animated dots
5. **Sources & References** — Verified source attribution on heritage detail
6. **Description deduplication** — Hero excerpt vs. full editorial content
7. **Related Heritage images** — Media and hover effects on related cards
8. **Collection search** — Collections in global search modal (Cmd+K)
9. **Shared category constants** — Centralized icons, colors, labels
10. **Chatbot heritage cards** — Structured entity cards in chat responses
11. **Chatbot action link fix** — Correct heritage entity slugs (was broken)

### Remaining Improvements

- Favorites batch endpoint for server-side filtering
- Chatbot image cards (media URL enrichment)
- Heritage entity clustering on map
- PWA/offline support
- Pagination for heritage lists
- Heritage of the Day feature
- Advanced sharing capabilities

---

## P1.35 Comprehensive Testing & Bug Resolution (Implemented)

### Bugs Discovered & Fixed

1. **BUG-001 (Critical)**: Heritage detail API missing `LEFT JOIN locations` — all detail pages showed `location: null`, no coordinates, no state
2. **BUG-002 (High)**: Chatbot `getStateOverview()` missing `id` in SELECT — state exploration returned `knowledge_ids: [null, null, ...]` and no heritage cards
3. **BUG-003 (Medium)**: Chatbot intent detection missing "vav" (Gujarati for stepwell) — "Rani ki Vav" fell through to `unknown` intent

### Verification Results
- 13/13 API endpoints: PASS
- 5/5 Security checks: PASS
- Auth & Favorites full cycle: PASS
- Chatbot 6 languages: PASS
- Field-level data correctness verified for Adalaj Stepwell, Amber Fort
- Cross-module consistency verified (DB → API → Frontend → UI)
- All 53 heritage images + 12 state images present
- No destructive data modifications

### Remaining Minor Items
- Search modal uses UUIDs in URLs (works, slugs would be prettier)
- Heritage list doesn't include media URLs (uses static image mapping)
- Favorites page fetches all entities client-side (acceptable at 74)
