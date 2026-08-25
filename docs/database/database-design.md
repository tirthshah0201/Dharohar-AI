# Database Design — Dharohar AI

## Overview

Dharohar AI uses two databases:

1. **PostgreSQL** — Primary relational database with pgvector for vector search
2. **Neo4j** — Knowledge graph for relationship queries

## PostgreSQL Schema Design

### Entity Relationship Diagram (Conceptual)

```
users ──────┐
            │
locations ──┼── heritage_entities ──┬── monuments
            │                       ├── people
historical_periods ─────────────────├── crafts
                                    ├── traditions
                                    ├── festivals
                                    ├── events
                                    ├── communities
                                    └── food

heritage_entities ── relationships ── heritage_entities
heritage_entities ── sources
heritage_entities ── media
```

### Table Definitions

#### locations
```sql
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- state, district, city, village, site
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    parent_id UUID REFERENCES locations(id),
    state VARCHAR(100) DEFAULT 'Gujarat',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### historical_periods
```sql
CREATE TABLE historical_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    start_year INTEGER NOT NULL,
    end_year INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### heritage_entities
```sql
CREATE TABLE heritage_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    period_id UUID REFERENCES historical_periods(image_url),
    embedding VECTOR(1536),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### relationships
```sql
CREATE TABLE relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES heritage_entities(id),
    target_id UUID NOT NULL REFERENCES heritage_entities(id),
    type VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### sources
```sql
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    url TEXT,
    publication_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### media
```sql
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID NOT NULL REFERENCES heritage_entities(id),
    type VARCHAR(50) NOT NULL, -- image, document, audio, video
    url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Indexes

```sql
-- Full-text search
CREATE INDEX idx_heritage_name_search ON heritage_entities USING gin(to_tsvector('english', name));
CREATE INDEX idx_heritage_desc_search ON heritage_entities USING gin(to_tsvector('english', description));

-- Vector search (pgvector)
CREATE INDEX idx_heritage_embedding ON heritage_entities USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Foreign key indexes
CREATE INDEX idx_locations_parent ON locations(parent_id);
CREATE INDEX idx_heritage_location ON heritage_entities(location_id);
CREATE INDEX idx_heritage_period ON heritage_entities(period_id);
CREATE INDEX idx_relationships_source ON relationships(source_id);
CREATE INDEX idx_relationships_target ON relationships(target_id);
```

## Neo4j Schema Design

See `database/neo4j/README.md` for the full knowledge graph schema.

### Key Design Decisions

1. **Dual database approach**: PostgreSQL for structured data, Neo4j for graph relationships
2. **Vector embeddings in PostgreSQL**: Using pgvector avoids a separate vector database
3. **UUID primary keys**: Supports distributed generation and API compatibility
4. **Category-based entity model**: Single `heritage_entities` table with category field, plus specialized tables for rich attributes
5. **Soft relationships**: Both PostgreSQL relationships table and Neo4j edges for different query patterns
