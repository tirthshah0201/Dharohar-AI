-- ============================================
-- Dharohar AI — Initial Schema Migration
-- ============================================
-- Run against Neon PostgreSQL:
--   psql $DATABASE_URL -f database/migrations/001_initial_schema.sql
-- ============================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---- Locations ----
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('state', 'district', 'city', 'village', 'site')),
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    parent_id UUID REFERENCES locations(id),
    state VARCHAR(100) DEFAULT 'Gujarat',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_locations_type ON locations(type);
CREATE INDEX IF NOT EXISTS idx_locations_parent ON locations(parent_id);
CREATE INDEX IF NOT EXISTS idx_locations_state ON locations(state);

-- ---- Historical Periods ----
CREATE TABLE IF NOT EXISTS historical_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    start_year INTEGER NOT NULL,
    end_year INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ---- Heritage Entities ----
CREATE TABLE IF NOT EXISTS heritage_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'monument', 'person', 'craft', 'tradition', 'festival',
        'architecture', 'event', 'food', 'community'
    )),
    description TEXT NOT NULL,
    location_id UUID REFERENCES locations(id),
    period_id UUID REFERENCES historical_periods(id),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_heritage_category ON heritage_entities(category);
CREATE INDEX IF NOT EXISTS idx_heritage_location ON heritage_entities(location_id);
CREATE INDEX IF NOT EXISTS idx_heritage_period ON heritage_entities(period_id);

-- Full-text search indexes
CREATE INDEX IF NOT EXISTS idx_heritage_name_search
    ON heritage_entities USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_heritage_desc_search
    ON heritage_entities USING gin(to_tsvector('english', description));

-- ---- Relationships ----
CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID NOT NULL REFERENCES heritage_entities(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES heritage_entities(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL CHECK (type IN (
        'LOCATED_IN', 'LOCATED_AT', 'ASSOCIATED_WITH', 'USED_TECHNIQUE',
        'PART_OF', 'OCCURRED_DURING', 'PRACTICED_BY', 'INFLUENCED_BY',
        'BUILT_BY', 'OCCURRED_IN'
    )),
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_relationships_source ON relationships(source_id);
CREATE INDEX IF NOT EXISTS idx_relationships_target ON relationships(target_id);

-- ---- Sources ----
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500) NOT NULL,
    author VARCHAR(255),
    url TEXT,
    publication_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ---- Media ----
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID NOT NULL REFERENCES heritage_entities(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('image', 'document', 'audio', 'video')),
    url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_entity ON media(entity_id);
