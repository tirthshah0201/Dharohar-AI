# ASTROVA — P1 Implementation Plan

**Date:** August 31, 2026
**Phase:** P1 — Data + Relationships + Sources + Media Foundation
**Status:** PLANNED

---

## P1 Objective

Establish the reliable data foundation required for Astrova's:
- Heritage explorer
- Map
- Chatbot
- Search
- State/region/district filtering
- Images
- Sources
- Future RAG
- Future semantic search
- Future knowledge graph

---

## P1.1 — Database Relationship Audit

**Objective:** Verify current schema relationships and identify gaps.

**Current Schema:**
```
locations (id, name, type, description, lat, lng, parent_id, state)
heritage_entities (id, name, category, description, location_id, period_id)
historical_periods (id, name, start_year, end_year, description)
relationships (id, source_id, target_id, type, description)
sources (id, title, author, url, publication_date, notes)
media (id, entity_id, type, url, caption)
chatbot_knowledge (id, state_code, heritage_name, heritage_type, ...)
conversations (id, session_id, language)
conversation_messages (id, conversation_id, role, content, intent, ...)
supported_states (id, name, code, region, description)
```

**Gaps Identified:**
1. `chatbot_knowledge.source` is VARCHAR(500) — should reference `sources` table
2. No foreign key from `chatbot_knowledge` to `locations` or `heritage_entities`
3. `media` table exists but no records
4. No canonical IDs/slugs for navigation
5. `relationships` only links heritage-to-heritage — should link to locations too

**Actions:**
- Document current relationships
- Identify missing relationships
- Plan schema extensions

---

## P1.2 — State/District/Area Hierarchy

**Objective:** Implement clean geographic hierarchy.

**Current Hierarchy (inferred from data):**
```
India
├── State (type='state')
│   ├── District (type='district')
│   │   ├── City (type='city')
│   │   ├── Village (type='village')
│   │   └── Site (type='site')
```

**Proposed Hierarchy:**
```
India
├── State (type='state', parent_id=NULL)
│   ├── District (type='district', parent_id=state.id)
│   │   ├── Region/Area (type='region', parent_id=district.id)
│   │   │   ├── City (type='city', parent_id=region.id)
│   │   │   ├── Village (type='village', parent_id=region.id)
│   │   │   └── Site (type='site', parent_id=region.id)
│   │   └── Natural Feature (type='river'|'waterfall'|etc., parent_id=district.id)
```

**Actions:**
- Verify `parent_id` chain is correct
- Add region-level entries for required areas:
  - North Malabar (KL)
  - Chettinad (TN)
  - Gurez Valley (JK)
  - Satkosia Gorge (OD)
  - Amboli (MH)
  - Majuli (AS)
- Verify coordinates for all hierarchy levels

---

## P1.3 — Heritage/Entity Relationships

**Objective:** Implement structured relationships between entities.

**Current Relationship Types:**
```
LOCATED_IN, LOCATED_AT, ASSOCIATED_WITH, USED_TECHNIQUE,
PART_OF, OCCURRED_DURING, PRACTICED_BY, INFLUENCED_BY,
BUILT_BY, OCCURRED_IN, FLOWS_THROUGH, FORMS, INHABITED_BY,
PRESERVED_BY, TRADITIONAL_TO, FAMOUS_FOR, CONNECTED_TO
```

**Proposed Relationships:**
```sql
-- Rani ki Vav → located in → Patan
-- Patan → located in → Gujarat
-- Majuli → associated with → Brahmaputra
-- Majuli → associated with → Sattriya
-- Amboli → associated with → Western Ghats
-- Satkosia → associated with → Mahanadi
-- Chettinad → famous for → Architecture
```

**Actions:**
- Create relationship records for key entities
- Verify relationship types are appropriate
- Test relationship queries

---

## P1.4 — Source System

**Objective:** Implement first-class source attribution.

**Current Source Table:**
```sql
sources (
  id UUID PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  author VARCHAR(255),
  url TEXT,
  publication_date DATE,
  notes TEXT,
  created_at TIMESTAMP
)
```

**Proposed Extensions:**
```sql
ALTER TABLE sources ADD COLUMN source_type VARCHAR(50) CHECK (source_type IN (
  'government', 'academic', 'cultural_institution', 'news', 'book', 'website', 'other'
));

ALTER TABLE sources ADD COLUMN verification_status VARCHAR(20) CHECK (verification_status IN (
  'verified', 'unverified', 'disputed', 'outdated'
));

ALTER TABLE sources ADD COLUMN publisher VARCHAR(255);
ALTER TABLE sources ADD COLUMN retrieved_date DATE;
```

**Source Priority:**
1. Ministry of Culture / Government of India
2. Archaeological Survey of India (ASI)
3. UNESCO World Heritage Centre
4. State Tourism Departments
5. Official Cultural Institutions
6. Academic/Institutional Sources
7. Other Reliable Sources

**Actions:**
- Extend `sources` table schema
- Add source records for key heritage entities
- Link `chatbot_knowledge.source` to `sources` table

---

## P1.5 — Media/Image System

**Objective:** Implement database-backed image management.

**Current Media Table:**
```sql
media (
  id UUID PRIMARY KEY,
  entity_id UUID REFERENCES heritage_entities(id),
  type VARCHAR(50) CHECK (type IN ('image', 'document', 'audio', 'video')),
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP
)
```

**Proposed Extensions:**
```sql
ALTER TABLE media ADD COLUMN filename VARCHAR(255);
ALTER TABLE media ADD COLUMN alt_text TEXT;
ALTER TABLE media ADD COLUMN source_id UUID REFERENCES sources(id);
ALTER TABLE media ADD COLUMN verification_status VARCHAR(20);
ALTER TABLE media ADD COLUMN is_primary BOOLEAN DEFAULT FALSE;
ALTER TABLE media ADD COLUMN image_category VARCHAR(50) CHECK (image_category IN (
  'hero', 'thumbnail', 'gallery', 'map_popup', 'category_fallback'
));
```

**Actions:**
- Extend `media` table schema
- Populate media records for existing heritage entities
- Link images to correct entities
- Verify image-entity mappings

---

## P1.6 — Map/GeoJSON Data Model

**Objective:** Enhance map data with geographic hierarchy.

**Current Map Data Flow:**
```
API /locations → MapFeature[] → Markers
API /heritage → MapFeature[] → Markers (via location coordinates)
```

**Proposed Enhanced Flow:**
```
API /locations → MapFeature[] → Markers (with hierarchy)
API /regions → GeoJSON → Region boundaries
API /states → GeoJSON → State boundaries
```

**Actions:**
- Verify GeoJSON boundaries are accurate
- Add region-level API endpoints
- Enhance marker data with hierarchy info
- Test zoom behavior

---

## P1.7 — Search/Navigation Identifiers

**Objective:** Implement canonical IDs for stable navigation.

**Current Navigation:**
```
/explore/[location-uuid]
/heritage/[heritage-uuid]
/timeline
/ai?question=...
```

**Proposed Enhanced Navigation:**
```
/explore/kerala
/explore/malabar/north-malabar
/heritage/rani-ki-vav
/heritage/golden-temple
/timeline?period=medieval
/ai?question=...&state=KL
```

**Actions:**
- Add `slug` field to `locations` table
- Add `slug` field to `heritage_entities` table
- Create slug generation utility
- Update routes to support slugs
- Maintain UUID fallback for backwards compatibility

---

## P1.8 — Chatbot Knowledge Relationships

**Objective:** Enhance chatbot knowledge with structured relationships.

**Current Knowledge Retrieval:**
```sql
SELECT * FROM chatbot_knowledge
WHERE to_tsvector('english', heritage_name || ' ' || description) @@ plainto_tsquery('english', $1)
```

**Proposed Enhanced Retrieval:**
```sql
-- Join with locations for geographic context
-- Join with heritage_entities for structured data
-- Join with sources for attribution
-- Join with relationships for related entities
```

**Actions:**
- Add foreign keys to `chatbot_knowledge`
- Create views for common queries
- Enhance search ranking
- Test retrieval accuracy

---

## P1.9 — Data Validation

**Objective:** Ensure data integrity across all tables.

**Validation Rules:**
1. All UUIDs are valid format
2. All foreign keys reference existing records
3. All coordinates are within valid bounds
4. All slugs are unique and URL-safe
5. All required fields are non-null
6. No duplicate entities (by name + type + location)

**Actions:**
- Create validation queries
- Run data integrity checks
- Fix any violations
- Document validation rules

---

## P1.10 — Seed/Import Pipeline

**Objective:** Create repeatable data import process.

**Current State:**
- Migrations create schema
- Seed data in `database/seeds/` (if exists)
- Manual SQL inserts

**Proposed Pipeline:**
```
1. Run migrations (004, 005, 006)
2. Import/update source records
3. Import/update location hierarchy
4. Import/update heritage entities
5. Import/update relationships
6. Import/update media records
7. Import/update chatbot knowledge
8. Run validation
```

**Actions:**
- Create seed scripts
- Document import process
- Test repeatable imports

---

## P1.11 — UI Integration

**Objective:** Update frontend to use enhanced data.

**Changes Required:**
1. Heritage detail page — show relationships, sources, media
2. Explore detail page — show hierarchy, related entities
3. Map — show region boundaries, enhanced popups
4. Search — use canonical slugs
5. Chatbot — enhanced knowledge retrieval

**Actions:**
- Update page components
- Add new UI elements
- Test responsive layouts
- Verify accessibility

---

## P1.12 — Testing

**Objective:** Verify all P1 changes work correctly.

**Test Matrix:**
| Test | Expected Result | Status |
|------|-----------------|--------|
| Frontend build | Passes | Pending |
| Backend build | Passes | Pending |
| TypeScript clean | No errors | Pending |
| Database migrations | Run successfully | Pending |
| API endpoints | Return correct data | Pending |
| Map markers | Load correctly | Pending |
| Map popups | Show correct info | Pending |
| Chatbot responses | Use enhanced knowledge | Pending |
| Search results | Use canonical slugs | Pending |
| Responsive layout | Works on all devices | Pending |
| Console errors | None | Pending |

---

## P1 Success Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Database relationships | 100% of key entities linked | Query verification |
| Source attribution | 80% of heritage has sources | Count check |
| Media records | 100% of heritage has media | Count check |
| Canonical slugs | All entities have slugs | Query verification |
| Build passes | TypeScript clean | `npm run build` |
| No breaking changes | All existing functionality works | Manual testing |
| Responsive | Works on mobile/tablet/desktop | Browser testing |

---

## P1 Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Migration fails | Test on separate branch first |
| Data inconsistency | Backup before migration |
| Breaking changes | Run full test suite |
| Performance regression | Benchmark API response times |
| Image errors | Manual verification |

---

**Next Step:** Begin P1.1 — Database Relationship Audit
