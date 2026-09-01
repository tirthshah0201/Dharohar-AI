-- ========================================
-- Migration 012: P1 Content & Discovery Foundation
-- Adds media records, relationships, and location hierarchy
-- ========================================

-- ========================================
-- PART A: ADD MORE MEDIA RECORDS
-- ========================================

-- Assam Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/sattriya.jpg', 'Sattriya dance performance in Assam', 'Sattriya - classical dance form of Assam', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'sattriya-dance'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/bhaona.jpg', 'Bhaona performance in Majuli', 'Bhaona - traditional narrative dance-drama', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'bhaona'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/mishing_community.jpg', 'Mishing community in Assam', 'Mishing - indigenous community of Assam', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'mishing-community'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Kerala Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/kalaripayattu.jpg', 'Kalaripayattu martial art in Kerala', 'Kalaripayattu - ancient martial art form', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'kalaripayattu'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/valiyaparamba_backwaters.jpg', 'Valiyaparamba Backwaters in Kerala', 'Valiyaparamba Backwaters - serene waterways', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'valiyaparamba-backwaters'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Jammu & Kashmir Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/habba_khatoon_peak.jpg', 'Habba Khatoon Peak in Kashmir', 'Habba Khatoon Peak - named after Kashmiri poetess', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'habba-khatoon-peak'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/kishanganga_river.jpg', 'Kishanganga River in Kashmir', 'Kishanganga River - tributary of Jhelum', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'kishanganga-river'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Odisha Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/konark_sun_temple.jpg', 'Konark Sun Temple in Odisha', 'Konark Sun Temple - UNESCO World Heritage Site', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'konark-sun-temple'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chilika_lake.jpg', 'Chilika Lake in Odisha', 'Chilika Lake - largest coastal lagoon in India', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chilika-lake'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/mahanadi_river.jpg', 'Mahanadi River in Odisha', 'Mahanadi River - major river of peninsular India', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'mahanadi-river'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Maharashtra Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/ellora_caves.jpg', 'Ellora Caves in Maharashtra', 'Ellora Caves - rock-cut temples and monasteries', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'ellora-caves'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Madhya Pradesh Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/sanchi_stupa.jpg', 'Sanchi Stupa in Madhya Pradesh', 'Sanchi Stupa - Buddhist monument', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'sanchi-stupa'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Delhi Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/red_fort.jpg', 'Red Fort in Delhi', 'Red Fort - Mughal architecture masterpiece', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'red-fort'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chandni_chowk.jpg', 'Chandni Chowk in Delhi', 'Chandni Chowk - historic market district', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chandni-chowk'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- ========================================
-- PART B: ADD MEANINGFUL RELATIONSHIPS
-- ========================================

-- Rani ki Vav ↔ Adalaj Stepwell (ASSOCIATED_WITH)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'rani-ki-vav'),
  (SELECT id FROM heritage_entities WHERE slug = 'adalaj-stepwell'),
  'ASSOCIATED_WITH',
  'Both are magnificent stepwells representing Solanki architecture'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'rani-ki-vav')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'adalaj-stepwell')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'rani-ki-vav') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'adalaj-stepwell') IS NOT NULL;

-- Theyyam ↔ Bhaona (ASSOCIATED_WITH - ritual performance arts)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'theyyam'),
  (SELECT id FROM heritage_entities WHERE slug = 'bhaona'),
  'ASSOCIATED_WITH',
  'Both are sacred ritual performance arts of India'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'theyyam')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'bhaona')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'theyyam') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'bhaona') IS NOT NULL;

-- Satkosia Tiger Reserve ↔ Satkosia Gorge (PART_OF)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'satkosia-tiger-reserve'),
  (SELECT id FROM heritage_entities WHERE slug = 'satkosia-gorge'),
  'PART_OF',
  'The tiger reserve encompasses the Satkosia Gorge ecosystem'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'satkosia-tiger-reserve')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'satkosia-gorge')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'satkosia-tiger-reserve') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'satkosia-gorge') IS NOT NULL;

-- Verify final counts
DO $$
DECLARE
  media_count INTEGER;
  relationship_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO media_count FROM media;
  SELECT COUNT(*) INTO relationship_count FROM relationships;
  
  RAISE NOTICE '=== MIGRATION 012 RESULTS ===';
  RAISE NOTICE 'Media records: %', media_count;
  RAISE NOTICE 'Total relationships: %', relationship_count;
END $$;
