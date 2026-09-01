-- P1.27: Heritage Collections System
-- Creates curated collections of heritage entities for discovery

-- Collections table
CREATE TABLE IF NOT EXISTS collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collection items (junction table)
CREATE TABLE IF NOT EXISTS collection_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  heritage_entity_id UUID NOT NULL REFERENCES heritage_entities(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, heritage_entity_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_collections_slug ON collections(slug);
CREATE INDEX IF NOT EXISTS idx_collections_active ON collections(is_active);
CREATE INDEX IF NOT EXISTS idx_collection_items_collection ON collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_entity ON collection_items(heritage_entity_id);

-- ============================================================
-- CURATED COLLECTIONS
-- Based on actual 74 heritage entities and their categories
-- ============================================================

-- 1. Sacred Architecture (monuments + architecture = 21 entities)
INSERT INTO collections (name, slug, description, display_order) VALUES
('Sacred Architecture', 'sacred-architecture', 'Temples, stepwells, mosques, and architectural masterpieces that define India''s spiritual and cultural landscape.', 1)
ON CONFLICT (slug) DO NOTHING;

-- 2. Indian Crafts (craft = 11 entities)
INSERT INTO collections (name, slug, description, display_order) VALUES
('Indian Crafts', 'indian-crafts', 'Traditional arts and crafts passed down through generations — from Kutch embroidery to Madhubani painting.', 2)
ON CONFLICT (slug) DO NOTHING;

-- 3. Living Traditions (tradition + community + festival + food = ~23 entities)
INSERT INTO collections (name, slug, description, display_order) VALUES
('Living Traditions', 'living-traditions', 'Cultural practices, festivals, communities, and food traditions that keep India''s heritage alive today.', 3)
ON CONFLICT (slug) DO NOTHING;

-- 4. Natural Heritage (natural_landmark + waterfall + lake + river + mountain + gorge + beach + backwater + eco_tourism + adventure + wildlife = ~14 entities)
INSERT INTO collections (name, slug, description, display_order) VALUES
('Natural Heritage', 'natural-heritage', 'India''s breathtaking natural landscapes — from the Western Ghats to the Himalayan valleys.', 4)
ON CONFLICT (slug) DO NOTHING;

-- 5. Ancient India (periods: Ancient + Chera/Chola + Kalinga = ~12 entities)
INSERT INTO collections (name, slug, description, display_order) VALUES
('Ancient India', 'ancient-india', 'Heritage from India''s earliest civilizations through classical dynasties — the Indus Valley, Cholas, and Kalinga.', 5)
ON CONFLICT (slug) DO NOTHING;

-- 6. Heritage for First-Time Explorers (mix of iconic monuments + crafts + food = ~12 entities)
INSERT INTO collections (name, slug, description, display_order) VALUES
('First-Time Explorer''s Guide', 'first-time-explorers', 'The essential Indian heritage experience — iconic monuments, signature crafts, and culinary traditions.', 6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- COLLECTION ITEMS — Populated from actual entity categories
-- ============================================================

-- Sacred Architecture: monuments + architecture
INSERT INTO collection_items (collection_id, heritage_entity_id, display_order)
SELECT c.id, he.id, ROW_NUMBER() OVER (ORDER BY he.name)
FROM collections c, heritage_entities he
WHERE c.slug = 'sacred-architecture'
  AND he.category IN ('monument', 'architecture')
ON CONFLICT (collection_id, heritage_entity_id) DO NOTHING;

-- Indian Crafts: craft category
INSERT INTO collection_items (collection_id, heritage_entity_id, display_order)
SELECT c.id, he.id, ROW_NUMBER() OVER (ORDER BY he.name)
FROM collections c, heritage_entities he
WHERE c.slug = 'indian-crafts'
  AND he.category = 'craft'
ON CONFLICT (collection_id, heritage_entity_id) DO NOTHING;

-- Living Traditions: tradition + community + festival + food
INSERT INTO collection_items (collection_id, heritage_entity_id, display_order)
SELECT c.id, he.id, ROW_NUMBER() OVER (ORDER BY he.name)
FROM collections c, heritage_entities he
WHERE c.slug = 'living-traditions'
  AND he.category IN ('tradition', 'community', 'festival', 'food')
ON CONFLICT (collection_id, heritage_entity_id) DO NOTHING;

-- Natural Heritage: natural categories
INSERT INTO collection_items (collection_id, heritage_entity_id, display_order)
SELECT c.id, he.id, ROW_NUMBER() OVER (ORDER BY he.name)
FROM collections c, heritage_entities he
WHERE c.slug = 'natural-heritage'
  AND he.category IN ('natural_landmark', 'waterfall', 'lake', 'river', 'mountain', 'gorge', 'beach', 'backwater', 'eco_tourism', 'adventure', 'wildlife')
ON CONFLICT (collection_id, heritage_entity_id) DO NOTHING;

-- Ancient India: entities from Ancient, Chera/Chola, and Kalinga periods
INSERT INTO collection_items (collection_id, heritage_entity_id, display_order)
SELECT c.id, he.id, ROW_NUMBER() OVER (ORDER BY he.name)
FROM collections c, heritage_entities he
JOIN historical_periods hp ON he.period_id = hp.id
WHERE c.slug = 'ancient-india'
  AND hp.name IN ('Ancient Period', 'Chera/Chola Period', 'Kalinga Period')
ON CONFLICT (collection_id, heritage_entity_id) DO NOTHING;

-- First-Time Explorer's Guide: iconic monuments + crafts + food + key traditions
INSERT INTO collection_items (collection_id, heritage_entity_id, display_order)
SELECT c.id, he.id, ROW_NUMBER() OVER (ORDER BY he.name)
FROM collections c, heritage_entities he
WHERE c.slug = 'first-time-explorers'
  AND (
    (he.category = 'monument' AND he.name IN (
      'Rani ki Vav', 'Golden Temple', 'Taj Mahal', 'Red Fort',
      'Ajanta Caves', 'Ellora Caves', 'Amber Fort', 'Hawa Mahal',
      'Adalaj Stepwell', 'Basilica of Bom Jesus'
    ))
    OR (he.category = 'craft' AND he.name IN (
      'Kutch Embroidery', 'Blue Pottery', 'Madhubani Painting', 'Phulkari Embroidery'
    ))
    OR (he.category = 'food' AND he.name IN (
      'Gujarati Thali', 'Malabar Cuisine'
    ))
    OR (he.name IN ('Garba', 'Navratri', 'Bharatanatyam'))
  )
ON CONFLICT (collection_id, heritage_entity_id) DO NOTHING;
