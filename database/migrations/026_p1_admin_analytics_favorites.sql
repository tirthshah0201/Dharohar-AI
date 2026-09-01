-- P1.29: Admin Analytics + Collection Editorial Controls

-- ============================================================
-- ANALYTICS EVENTS
-- Lightweight event tracking for heritage views, searches,
-- collection views, chatbot queries
-- ============================================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(50) NOT NULL,
  heritage_entity_id UUID REFERENCES heritage_entities(id) ON DELETE SET NULL,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  search_query TEXT,
  language VARCHAR(10),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_events_heritage ON analytics_events(heritage_entity_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_collection ON analytics_events(collection_id);

-- ============================================================
-- COLLECTION EDITORIAL CONTROLS
-- ============================================================

-- Add hero_media_id for editorial hero image control
ALTER TABLE collections ADD COLUMN IF NOT EXISTS hero_media_id UUID REFERENCES media(id) ON DELETE SET NULL;

-- Add display_order to collection_items for editorial ordering
ALTER TABLE collection_items ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Update existing collection_items with display_order from ROW_NUMBER
UPDATE collection_items ci
SET display_order = sub.rn
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY collection_id ORDER BY created_at) AS rn
  FROM collection_items
) sub
WHERE ci.id = sub.id AND ci.display_order = 0;
