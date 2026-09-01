-- ========================================
-- Migration 016: P1.13 Media Completion + Discovery Enhancement
-- Adds relationships and media for remaining entities
-- ========================================

-- ========================================
-- PART A: ADD MEANINGFUL RELATIONSHIPS
-- ========================================

-- Kutch Embroidery ↔ Bandhani (ASSOCIATED_WITH - textile traditions)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'kutch-embroidery'),
  (SELECT id FROM heritage_entities WHERE slug = 'bandhani'),
  'ASSOCIATED_WITH',
  'Both are traditional Gujarati textile arts with distinct regional characteristics'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'kutch-embroidery')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'bandhani')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'kutch-embroidery') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'bandhani') IS NOT NULL;

-- Bharatanatyam ↔ Chola Bronzes (INFLUENCED_BY)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'bharatanatyam'),
  (SELECT id FROM heritage_entities WHERE slug = 'chola-bronzes'),
  'INFLUENCED_BY',
  'Bharatanatyam dance poses are depicted in Chola bronze sculptures'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'bharatanatyam')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'chola-bronzes')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'bharatanatyam') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'chola-bronzes') IS NOT NULL;

-- Warli Art ↔ Tribal Heritage of Odisha (ASSOCIATED_WITH - tribal art traditions)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'warli-art'),
  (SELECT id FROM heritage_entities WHERE slug = 'tribal-heritage-of-odisha'),
  'ASSOCIATED_WITH',
  'Both represent indigenous tribal artistic traditions of India'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'warli-art')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'tribal-heritage-of-odisha')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'warli-art') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'tribal-heritage-of-odisha') IS NOT NULL;

-- Rabari Community ↔ Kutch Embroidery (PRACTICED_BY)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'kutch-embroidery'),
  (SELECT id FROM heritage_entities WHERE slug = 'rabari-community'),
  'PRACTICED_BY',
  'Kutch embroidery is traditionally practiced by the Rabari community'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'kutch-embroidery')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'rabari-community')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'kutch-embroidery') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'rabari-community') IS NOT NULL;

-- ========================================
-- PART B: ADD MEDIA FOR REMAINING ENTITIES
-- ========================================

-- Eco-tourism at Satkosia
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/eco_tourism_satkosia.jpg', 'Eco-tourism activities at Satkosia Gorge', 'Eco-tourism at Satkosia - nature experience', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'eco-tourism-at-satkosia'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Monsoon Experience at Amboli
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/monsoon_amboli.jpg', 'Monsoon season in Amboli Hills', 'Monsoon Experience at Amboli - lush green landscapes', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'monsoon-experience-at-amboli'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Verify final counts
DO $$
DECLARE
  media_count INTEGER;
  relationship_count INTEGER;
  with_media INTEGER;
  without_media INTEGER;
BEGIN
  SELECT COUNT(*) INTO media_count FROM media;
  SELECT COUNT(*) INTO relationship_count FROM relationships;
  SELECT COUNT(*) INTO with_media FROM heritage_entities WHERE id IN (SELECT DISTINCT entity_id FROM media);
  SELECT COUNT(*) INTO without_media FROM heritage_entities WHERE id NOT IN (SELECT DISTINCT entity_id FROM media);
  
  RAISE NOTICE '=== MIGRATION 016 RESULTS ===';
  RAISE NOTICE 'Media records: %', media_count;
  RAISE NOTICE 'Relationships: %', relationship_count;
  RAISE NOTICE 'Heritage with media: %', with_media;
  RAISE NOTICE 'Heritage without media: %', without_media;
END $$;
