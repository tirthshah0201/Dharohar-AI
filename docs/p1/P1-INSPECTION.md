# ASTROVA — P1 Inspection Report

**Date:** August 31, 2026
**Inspector:** Buffy (Codebuff Agent)
**Status:** INSPECTION COMPLETE — DO NOT IMPLEMENT YET

---

## Executive Summary

Astrova has a working foundation across frontend, backend, database, map, and chatbot. However, the data model has significant gaps that P1 must address before advanced features can work reliably.

**Critical Finding:** The `chatbot_knowledge` table is a completely separate data silo from `heritage_entities` + `locations`. They share no foreign keys. The chatbot cannot answer questions about entities in the main database, and the main database cannot show chatbot-sourced knowledge.

---

## 1. Current Database Structure

### 1.1 Tables (9 tables total)

| Table | Rows (est.) | Purpose | Key Issues |
|-------|-------------|---------|------------|
| `locations` | ~55 | Geographic places | parent_id chain works; `state` is a VARCHAR, not a FK |
| `heritage_entities` | ~60 | Cultural/natural entities | No slug; location_id is nullable |
| `historical_periods` | 9 | Time periods | Clean, no issues |
| `relationships` | ~15 | Entity-to-entity links | **Only heritage-to-heritage** — cannot link to locations |
| `sources` | 0 | Attribution | Empty — never populated |
| `media` | 0 | Images/documents | Empty — never populated |
| `supported_states` | 12 | State definitions | Clean |
| `chatbot_knowledge` | ~55 | Chatbot responses | **Completely separate from main data** — no FK to locations or heritage_entities |
| `conversations` | Growing | Chat sessions | Clean |
| `conversation_messages` | Growing | Chat messages | Clean |

### 1.2 Schema Issues Discovered

**ISSUE-01: chatbot_knowledge is a data silo**
- `chatbot_knowledge.state_code` references `supported_states.code` (FK exists)
- `chatbot_knowledge.source` is VARCHAR(500) — not linked to `sources` table
- **No foreign key** to `locations` or `heritage_entities`
- Entity names are duplicated between `heritage_entities.name` and `chatbot_knowledge.heritage_name`
- Same heritage concept may exist in both tables with different data

**ISSUE-02: relationships table only links heritage-to-heritage**
- `source_id` and `target_id` both reference `heritage_entities(id)`
- Cannot represent: "Rani ki Vav LOCATED_IN Patan" (Patan is a location, not a heritage entity)
- Only heritage-to-heritage relationships are possible

**ISSUE-03: No canonical slugs**
- All navigation uses UUIDs: `/heritage/{uuid}`, `/explore/{uuid}`
- No human-readable slugs anywhere in the database
- Frontend `page.tsx` files use `category.slug` for URL params (hardcoded in frontend, not DB)

**ISSUE-04: `state` field in `locations` is a VARCHAR, not a FK**
- `locations.state VARCHAR(100)` stores state names as text
- No referential integrity to `supported_states`
- Potential for inconsistent state names

**ISSUE-05: sources and media tables are empty**
- Schema exists but zero records
- No data pipeline populates them

**ISSUE-06: heritage_entities.image_url exists but unused**
- Column exists in schema but no data
- Images are managed entirely client-side in `frontend/constants/images.ts`

---

## 2. Existing Geographic Hierarchy

### 2.1 Location Type Hierarchy (from seed data)

```
State (type='state')
├── District (type='district')
│   └── parent_id → State UUID
├── City (type='city')
│   └── parent_id → District/Region UUID
├── Village (type='village')
│   └── parent_id → Region UUID
├── Site (type='site')
│   └── parent_id → District/State UUID
├── Region (type='region')
│   └── parent_id → State UUID
├── River (type='river')
│   └── parent_id → Region/State UUID
├── Waterfall (type='waterfall')
│   └── parent_id → District/Region UUID
├── Beach (type='beach')
│   └── parent_id → District UUID
├── Backwater (type='backwater')
│   └── parent_id → Region UUID
├── Gorge (type='gorge')
│   └── parent_id → State UUID
├── Lake (type='lake')
│   └── parent_id → State UUID
├── Mountain (type='mountain')
│   └── parent_id → Region UUID
└── Wildlife Area (type='wildlife_area')
    └── parent_id → State UUID
```

### 2.2 Hierarchy Verification by State

| State | State Record | Districts | Regions | Sites | Natural Features |
|-------|-------------|-----------|---------|-------|-----------------|
| Gujarat | ✅ | 5 | 0 | 5 | 0 |
| Rajasthan | ❌ No locations | 0 | 0 | 0 | 0 |
| Punjab | ❌ No locations | 0 | 0 | 0 | 0 |
| Goa | ❌ No locations | 0 | 0 | 0 | 0 |
| Tamil Nadu | ✅ | 0 | 1 (Chettinad) | 0 | 0 |
| Maharashtra | ✅ | 0 | 1 (Amboli) | 0 | 1 (Amboli Falls) |
| Madhya Pradesh | ❌ No locations | 0 | 0 | 0 | 0 |
| Delhi | ❌ No locations | 0 | 0 | 0 | 0 |
| Kerala | ✅ | 2 | 1 (North Malabar) | 0 | 3 |
| Jammu & Kashmir | ✅ | 0 | 1 (Gurez Valley) | 0 | 3 |
| Assam | ✅ | 0 | 1 (Majuli) | 1 (Samaguri) | 1 |
| Odisha | ✅ | 0 | 0 | 1 (Konark) | 4 |

**CRITICAL:** Only 8 of 12 states have any `locations` records. Rajasthan, Punjab, Goa, MP, and Delhi have **zero** location records — their heritage entities exist only in `chatbot_knowledge`.

---

## 3. Existing Relationships

### 3.1 Relationship Types (from seed 001)

| Type | Count | Example |
|------|-------|---------|
| PRACTICED_BY | 2 | Patola Weaving → Salvi Community |
| ASSOCIATED_WITH | 5 | Sabarmati Ashram → Mahatma Gandhi |
| INFLUENCED_BY | 1 | Patola Weaving → Bandhani |

**Total relationships: ~15** (all Gujarat seed data only)

### 3.2 Relationship Gap

No relationships exist for:
- Kerala entities
- Jammu & Kashmir entities
- Assam entities
- Odisha entities
- Maharashtra entities
- Tamil Nadu entities
- Any state other than Gujarat

---

## 3.3 Relationship Limitation

The `relationships` table schema only allows heritage-entity-to-heritage-entity links:

```sql
source_id UUID REFERENCES heritage_entities(id),
target_id UUID REFERENCES heritage_entities(id)
```

It **cannot** represent:
- Heritage entity → Location (e.g., "Rani ki Vav LOCATED_IN Patan")
- Location → Location (e.g., "North Malabar WITHIN Kerala")
- Heritage entity → State
- Any entity → source

---

## 4. Existing Source System

**Status: EMPTY**

- `sources` table exists with schema: id, title, author, url, publication_date, notes, created_at
- Zero records in the table
- `chatbot_knowledge.source` is a VARCHAR(500) field with text like "UNESCO", "ASI", "Kerala Tourism" — not linked to `sources` table

---

## 5. Existing Image/Media System

### 5.1 Client-Side Image Mapping

Images are managed entirely in `frontend/constants/images.ts`:

| System | Records | Mechanism |
|--------|---------|-----------|
| `STATE_IMAGES` | 12 | State code → image object |
| `HERITAGE_IMAGES` | ~50 | Normalized name → image object |
| `CATEGORY_IMAGES` | 9 | Category → fallback image |
| `LOCATION_IMAGES` | ~10 | Location name → image object |
| `getHeritageImage()` | — | Exact → partial → category fallback |
| `getLocationImage()` | — | Location → heritage → state fallback |

### 5.2 Database Media System

**Status: EMPTY**

- `media` table exists with schema: id, entity_id, type, url, caption, created_at
- Zero records
- `heritage_entities.image_url` column exists but is always NULL

### 5.3 Missing Images (from docs/data/missing-images.md)

20 images needed for new states/areas. Some have since been provided (developer-supplied).

---

## 6. Existing Map Architecture

### 6.1 Data Flow

```
API /locations → MapFeature[] ─┐
                               ├→ merged → filtered → Markers → Leaflet
API /heritage  → MapFeature[] ─┘
```

### 6.2 Dual Data Source Problem

The map merges data from TWO sources:
1. **Database** via API: `locations` + `heritage_entities` (via `location_id` FK)
2. **Frontend constants**: `FAMOUS_HERITAGE_MARKERS` (766 lines, ~60 markers)

The `famousMarkers.ts` file contains markers that may duplicate database entries. Example: "Rani ki Vav" exists in both the database (via seed 001) AND in famousMarkers.

### 6.3 Marker Identity

Markers use `${feature.source}-${feature.id}` as React key:
- Database markers: `database-{uuid}`
- Famous markers: `famous-{custom-id}` (e.g., `fm-gj-patan-ranikivav`)

No canonical unified identity exists.

### 6.4 GeoJSON Data

| Data | Source | File |
|------|--------|------|
| State boundaries | Frontend constant | `data/geojson/states/index.ts` (209 lines) |
| Region boundaries | Frontend constant | `data/geojson/regions/index.ts` (163 lines) |
| Region polygons | Approximate centroids | 6 regions with buffer areas |

Region GeoJSON uses `stateCode: "OR"` for Odisha in one place but `stateCode: "OD"` elsewhere — **inconsistency detected**.

---

## 7. Chatbot Knowledge Architecture

### 7.1 Knowledge Retrieval Flow

```
User message
  → detectRomanizedLanguage()
  → predictIntentWithML() [AI Service, 2s timeout]
  → detectIntent() [regex fallback]
  → detectState() [keyword matching]
  → searchKnowledge(message, stateCode)
    → ILIKE search on chatbot_knowledge
    → tsvector full-text search
    → fallback ILIKE
  → formatHeritageResponse()
  → buildActions()
```

### 7.2 Knowledge-Entity Disconnect

The chatbot searches `chatbot_knowledge` (separate table) but:
- Cannot reference `heritage_entities` (no FK)
- Cannot reference `locations` (no FK)
- Cannot return map coordinates (no lat/lng in chatbot_knowledge)
- Cannot link to detail pages (no UUID from heritage_entities)

The `buildActions()` function generates `/heritage/{knowledgeId}` links, but `knowledgeId` is the `chatbot_knowledge.id`, which is NOT the same as `heritage_entities.id` for the same concept.

---

## 8. Search System

### 8.1 Search Implementation

The search endpoint (`/api/search`) performs a UNION query:

```sql
(heritage_entities: name ILIKE, description ILIKE)
UNION ALL
(locations: name ILIKE, description ILIKE)
```

Results include a `source` field ("heritage" or "location") and a `relevance` score.

### 8.2 Search Limitations

- No fuzzy/approximate matching
- No romanized language search support in the search endpoint (only chatbot has this)
- No ranking by state/region proximity
- Results use raw UUIDs for navigation
- `l.parent_id AS location_id` in the search result is semantically incorrect (parent_id is NOT the entity's own location)

---

## 9. Frontend Route Parameters

| Route | Parameter | Source | Notes |
|-------|-----------|--------|-------|
| `/` | — | — | Home page |
| `/explore` | `?state=` | URL | State name (string, not code) |
| `/explore` | `?focus=` | URL | Location UUID |
| `/explore/[id]` | UUID | Path | Location detail |
| `/heritage` | `?category=` | URL | Category slug |
| `/heritage/[id]` | UUID | Path | Heritage detail |
| `/timeline` | `?period=` | URL | Period UUID |
| `/ai` | `?question=` | URL | Pre-filled question |
| `/about` | — | — | About page |

All detail routes use UUIDs. No slug-based routing exists.

---

## 10. Problems Discovered

### 10.1 Critical

| ID | Problem | Impact |
|----|---------|--------|
| PROB-01 | chatbot_knowledge is disconnected from heritage_entities | Chatbot cannot reference main DB entities; duplicate data |
| PROB-02 | relationships only link heritage-to-heritage | Cannot model geographic containment (entity IN location) |
| PROB-03 | 4 states have zero locations (RJ, PB, GA, MP, DL) | Map shows no markers for these states from DB |

### 10.2 High

| ID | Problem | Impact |
|----|---------|--------|
| PROB-04 | No canonical slugs | Poor SEO, unfriendly URLs, no stable human-readable IDs |
| PROB-05 | sources and media tables empty | No source attribution, no media management |
| PROB-06 | State field in locations is VARCHAR not FK | No referential integrity for state references |
| PROB-07 | famousMarkers duplicates database markers | Inconsistent marker data, possible duplicate popups |
| PROB-08 | GeoJSON region stateCode inconsistency ("OR" vs "OD") | Possible broken region filtering |

### 10.3 Medium

| ID | Problem | Impact |
|----|---------|--------|
| PROB-09 | Search parent_id used as location_id | Semantically incorrect search results |
| PROB-10 | heritage_entities.image_url unused | Dead column |
| PROB-11 | Ellora Caves image uses Ajanta image | Wrong visual representation |
| PROB-12 | Sanchi Stupa image uses Khajuraho image | Wrong visual representation |
| PROB-13 | No pagination on API endpoints | Performance risk at scale |

### 10.4 Low

| ID | Problem | Impact |
|----|---------|--------|
| PROB-14 | database-design.md references Neo4j and pgvector (not implemented) | Documentation out of sync |
| PROB-15 | ML training data has 17 CSV files (5 versions) | Artifact clutter |
| PROB-16 | AI page hardcodes "52 Heritage Records" | Will become stale |

---

## 11. Proposed P1 Architecture

### 11.1 Canonical Identity System

```
locations.slug        — unique, URL-safe, human-readable
heritage_entities.slug — unique, URL-safe, human-readable
```

Routes become:
- `/heritage/rani-ki-vav` instead of `/heritage/{uuid}`
- `/explore/gujarat` instead of `/explore/{uuid}`
- UUID still accepted as fallback

### 11.2 Unified Entity Model

```
chatbot_knowledge.entity_id → heritage_entities.id (NEW FK)
chatbot_knowledge.location_id → locations.id (NEW FK)
```

Or: eliminate chatbot_knowledge as a separate table and instead:
- Store chatbot-specific fields on heritage_entities directly
- Or: create a proper bridge table

### 11.3 Relationship Model Extension

Option A (recommended): Make relationships polymorphic
```sql
source_type VARCHAR(50),  -- 'heritage' | 'location'
source_id UUID,
target_type VARCHAR(50),
target_id UUID
```

Option B: Separate relationship tables per entity type

Option C: Use a single `entities` supertype table (too invasive for P1)

### 11.4 Source System

```sql
ALTER TABLE sources ADD COLUMN source_type VARCHAR(50);
ALTER TABLE sources ADD COLUMN verification_status VARCHAR(20);
ALTER TABLE sources ADD COLUMN publisher VARCHAR(255);

-- Connect heritage_entities to sources
ALTER TABLE heritage_entities ADD COLUMN source_id UUID REFERENCES sources(id);

-- Connect chatbot_knowledge to sources (migrate existing VARCHAR data)
-- chatbot_knowledge.source → sources.title mapping
```

### 11.5 Media System

```sql
ALTER TABLE media ADD COLUMN filename VARCHAR(255);
ALTER TABLE media ADD COLUMN alt_text TEXT;
ALTER TABLE media ADD COLUMN source_id UUID REFERENCES sources(id);
ALTER TABLE media ADD COLUMN verification_status VARCHAR(20);
ALTER TABLE media ADD COLUMN is_primary BOOLEAN DEFAULT FALSE;
ALTER TABLE media ADD COLUMN image_category VARCHAR(50);
```

### 11.6 Map Data Unification

- Database becomes single source of truth for markers
- `famousMarkers.ts` entries migrated to database as location/heritage records
- API returns canonical markers with slugs
- Frontend consumes unified API response

---

## 12. Migration Plan

| Migration | Purpose | Tables Affected |
|-----------|---------|-----------------|
| 004_p1_canonical_ids | Add slugs to locations + heritage_entities | locations, heritage_entities |
| 005_p1_relationships | Make relationships polymorphic (source_type/target_type) | relationships |
| 006_p1_sources_media | Extend sources + media schemas | sources, media |
| 007_p1_chatbot_bridge | Add FKs from chatbot_knowledge to main entities | chatbot_knowledge |
| 008_p1_state_fk | Add state_code FK to locations (optional, risky) | locations |

**IMPORTANT:** Migration 008 is risky because it requires updating all existing `state` VARCHAR values to match `supported_states.code`. This may be deferred.

---

## 13. API Changes

| Endpoint | Change |
|----------|--------|
| GET /api/locations | Add slug to response; add hierarchy depth param |
| GET /api/locations/:id | Accept slug OR UUID |
| GET /api/heritage | Add slug to response |
| GET /api/heritage/:id | Accept slug OR UUID |
| GET /api/search | Fix parent_id semantics; add state/region filtering |
| GET /api/relationships | **NEW** — return relationships for entity |
| GET /api/sources | **NEW** — list sources |
| GET /api/media | **NEW** — list media for entity |

---

## 14. Frontend Changes

| Page | Change |
|------|--------|
| Heritage detail | Show location hierarchy, related entities, sources, media |
| Explore detail | Show sub-locations, related heritage |
| Map markers | Use slugs in popup links |
| Search results | Show entity type badges; correct parent_id display |
| Chatbot | Link responses to canonical entity pages |

---

## 15. Map Changes

| Area | Change |
|------|--------|
| Marker loading | Use unified API instead of famousMarkers |
| Popup links | Use slugs instead of UUIDs |
| GeoJSON regions | Fix "OR" → "OD" inconsistency |
| Detail panel | Show hierarchy breadcrumb |

---

## 16. Search Changes

| Area | Change |
|------|--------|
| Result identity | Use canonical slug + type |
| Result display | Show entity type, state, hierarchy |
| Relevance scoring | Improve with state/region boosting |
| Romanized search | Extend to search endpoint |

---

## 17. Chatbot Changes

| Area | Change |
|------|--------|
| Knowledge links | Link to canonical entity pages |
| Actions | Use slugs in action targets |
| Knowledge retrieval | Join with heritage_entities when possible |

---

## 18. Testing Plan

| Test | Method |
|------|--------|
| Frontend build | `npm run build` |
| Backend build | `npm run build` |
| TypeScript | No errors |
| Migration | Run against test DB |
| API endpoints | Manual verification |
| Map markers | Visual check |
| Search | Query verification |
| Chatbot | Ask + verify links |
| Slug routing | Navigate via slug URLs |

---

## 19. Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Migration breaks existing data | LOW | HIGH | Test on branch; backup first |
| Slug collisions | LOW | MEDIUM | Unique constraint + generation logic |
| famousMarkers migration incomplete | MEDIUM | LOW | Keep as fallback initially |
| chatbot_knowledge bridge migration | MEDIUM | HIGH | Careful FK addition; nullable first |
| Performance regression | LOW | MEDIUM | Benchmark before/after |

---

## 20. Exact Implementation Order

1. **004_p1_canonical_ids.sql** — Add slug columns + generation
2. **Fix GeoJSON "OR" → "OD"** — Quick data fix
3. **005_p1_relationships.sql** — Polymorphic relationships
4. **006_p1_sources_media.sql** — Extend source + media schemas
5. **007_p1_chatbot_bridge.sql** — Link chatbot_knowledge to main entities
6. **Backend API updates** — Accept slugs, return slugs, new endpoints
7. **Frontend slug routing** — Update routes to use slugs
8. **Image mapping fixes** — Ellora, Sanchi
9. **Data migration** — Populate sources, media from existing data
10. **famousMarkers migration** — Move to database
11. **Testing and verification**

---

**STATUS: INSPECTION COMPLETE**
**NEXT: Await user review before proceeding to implementation**
