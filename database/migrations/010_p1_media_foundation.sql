-- ========================================
-- Migration 010: P1 Media Foundation + Related Heritage
-- Enhances media table and adds relationship queries
-- ========================================

-- Enhance media table with additional metadata columns
DO $$ BEGIN
  ALTER TABLE media ADD COLUMN IF NOT EXISTS alt_text TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE media ADD COLUMN IF NOT EXISTS credit TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE media ADD COLUMN IF NOT EXISTS source_id UUID REFERENCES sources(id);
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE media ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE media ADD COLUMN IF NOT EXISTS is_primary BOOLEAN DEFAULT FALSE;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE media ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) DEFAULT 'UNVERIFIED';
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Add indexes for media queries
CREATE INDEX IF NOT EXISTS idx_media_entity ON media(entity_id);
CREATE INDEX IF NOT EXISTS idx_media_primary ON media(is_primary) WHERE is_primary = TRUE;

-- Create a view for heritage entities with their primary media
CREATE OR REPLACE VIEW heritage_with_media AS
SELECT 
  he.id,
  he.name,
  he.slug,
  he.category,
  he.description,
  he.location_id,
  he.period_id,
  he.image_url,
  he.source_id,
  he.created_at,
  m.url as media_url,
  m.alt_text as media_alt,
  m.caption as media_caption,
  m.credit as media_credit
FROM heritage_entities he
LEFT JOIN media m ON m.entity_id = he.id AND m.is_primary = TRUE;

-- Add helpful indexes for relationship queries
CREATE INDEX IF NOT EXISTS idx_relationships_source ON relationships(source_id);
CREATE INDEX IF NOT EXISTS idx_relationships_target ON relationships(target_id);
CREATE INDEX IF NOT EXISTS idx_relationships_type ON relationships(type);
