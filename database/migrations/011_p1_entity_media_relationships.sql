-- ========================================
-- Migration 011: P1 Entity-Location Linking + Relationships + Media
-- Links physical orphan entities, adds relationships, populates media
-- ========================================

-- ========================================
-- PART A: LINK PHYSICAL ORPHAN ENTITIES
-- ========================================

-- Create location for Ajanta Caves if not exists
INSERT INTO locations (id, name, slug, type, state, description, latitude, longitude)
VALUES (
  'd0000001-0000-0000-0000-000000000001',
  'Ajanta Caves',
  'ajanta-caves',
  'site',
  'MH',
  'The Ajanta Caves are 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE in the Aurangabad district of Maharashtra.',
  20.5519,
  75.7033
)
ON CONFLICT (id) DO NOTHING;

-- Create location for Ellora Caves if not exists
INSERT INTO locations (id, name, slug, type, state, description, latitude, longitude)
VALUES (
  'd0000001-0000-0000-0000-000000000002',
  'Ellora Caves',
  'ellora-caves',
  'site',
  'MH',
  'The Ellora Caves are a complex of 34 monasteries and temples extending over 2 km, built between the 6th and 11th centuries CE.',
  20.0267,
  75.1792
)
ON CONFLICT (id) DO NOTHING;

-- Create location for Meenakshi Amman Temple if not exists
INSERT INTO locations (id, name, slug, type, state, description, latitude, longitude)
VALUES (
  'd0000001-0000-0000-0000-000000000003',
  'Madurai',
  'madurai',
  'city',
  'TN',
  'Madurai is a major city in Tamil Nadu, known as the cultural capital of the state.',
  9.9252,
  78.1198
)
ON CONFLICT (id) DO NOTHING;

-- Link physical orphan entities to their locations
UPDATE heritage_entities SET location_id = 'd0000001-0000-0000-0000-000000000001' WHERE slug = 'ajanta-caves';
UPDATE heritage_entities SET location_id = 'd0000001-0000-0000-0000-000000000002' WHERE slug = 'ellora-caves';
UPDATE heritage_entities SET location_id = 'd0000001-0000-0000-0000-000000000003' WHERE slug = 'meenakshi-amman-temple';

-- ========================================
-- PART B: ADD MEANINGFUL RELATIONSHIPS
-- ========================================

-- Garba ↔ Navratri (associated with)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'garba'),
  (SELECT id FROM heritage_entities WHERE slug = 'navratri'),
  'ASSOCIATED_WITH',
  'Garba is a traditional dance performed during Navratri festival'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'garba')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'navratri')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'garba') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'navratri') IS NOT NULL;

-- Kutch Embroidery ↔ Rabari Community (practiced_by)
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

-- Bandhani ↔ Gujarati Thali (associated_with)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'bandhani'),
  (SELECT id FROM heritage_entities WHERE slug = 'gujarati-thali'),
  'ASSOCIATED_WITH',
  'Bandhani textiles are part of Gujarati cultural heritage alongside traditional cuisine'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'bandhani')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'gujarati-thali')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'bandhani') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'gujarati-thali') IS NOT NULL;

-- Ajanta Caves ↔ Ellora Caves (related_to)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'ajanta-caves'),
  (SELECT id FROM heritage_entities WHERE slug = 'ellora-caves'),
  'RELATED_TO',
  'Ajanta and Ellora are sister archaeological sites in Maharashtra'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'ajanta-caves')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'ellora-caves')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'ajanta-caves') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'ellora-caves') IS NOT NULL;

-- Bharatanatyam ↔ Chola Bronzes (associated_with)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'bharatanatyam'),
  (SELECT id FROM heritage_entities WHERE slug = 'chola-bronzes'),
  'ASSOCIATED_WITH',
  'Bharatanatyam dance poses are inspired by Chola bronze sculptures'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'bharatanatyam')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'chola-bronzes')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'bharatanatyam') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'chola-bronzes') IS NOT NULL;

-- Warli Art ↔ Tribal Heritage of Odisha (related_to)
INSERT INTO relationships (source_id, target_id, type, description)
SELECT 
  (SELECT id FROM heritage_entities WHERE slug = 'warli-art'),
  (SELECT id FROM heritage_entities WHERE slug = 'tribal-heritage-of-odisha'),
  'RELATED_TO',
  'Warli and Odisha tribal art represent indigenous artistic traditions of India'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships 
  WHERE source_id = (SELECT id FROM heritage_entities WHERE slug = 'warli-art')
  AND target_id = (SELECT id FROM heritage_entities WHERE slug = 'tribal-heritage-of-odisha')
)
AND (SELECT id FROM heritage_entities WHERE slug = 'warli-art') IS NOT NULL
AND (SELECT id FROM heritage_entities WHERE slug = 'tribal-heritage-of-odisha') IS NOT NULL;

-- ========================================
-- PART C: POPULATE MEDIA TABLE
-- ========================================

-- Gujarat Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/rani_ki_vav.jpg',
  'Rani ki Vav stepwell in Patan, Gujarat',
  'Rani ki Vav - a UNESCO World Heritage stepwell',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'rani-ki-vav'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/modhera_sun_temple.jpg',
  'Modhera Sun Temple in Gujarat',
  'Modhera Sun Temple - Solanki era architecture',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'modhera-sun-temple'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/sabarmati_ashram.jpg',
  'Sabarmati Ashram in Ahmedabad',
  'Sabarmati Ashram - Mahatma Gandhi''s residence',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'sabarmati-ashram'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/dholavira.jpg',
  'Dholavira archaeological site in Gujarat',
  'Dholavira - Indus Valley Civilization site',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'dholavira'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Rajasthan Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/amber_fort.jpg',
  'Amber Fort in Jaipur, Rajasthan',
  'Amber Fort - a magnificent hilltop fortress',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'amber-fort'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/hawa_mahal.jpg',
  'Hawa Mahal in Jaipur, Rajasthan',
  'Hawa Mahal - the Palace of Winds',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'hawa-mahal'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Punjab Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/golden_temple.jpg',
  'Golden Temple in Amritsar, Punjab',
  'Golden Temple - holiest shrine of Sikhism',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'golden-temple'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Goa Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/basilica_of_bom_jesus.jpg',
  'Basilica of Bom Jesus in Goa',
  'Basilica of Bom Jesus - UNESCO World Heritage Site',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'basilica-of-bom-jesus'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Kerala Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/theyyam.jpg',
  'Theyyam ritual art form in Kerala',
  'Theyyam - sacred ritual art of North Kerala',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'theyyam'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Jammu & Kashmir Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/gurez_valley.jpg',
  'Gurez Valley in Jammu and Kashmir',
  'Gurez Valley - pristine Himalayan landscape',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'gurez-valley'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Assam Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/majuli.jpg',
  'Majuli island in Assam',
  'Majuli - world''s largest river island',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'majuli'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Odisha Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/pattachitra.jpg',
  'Pattachitra scroll painting from Odisha',
  'Pattachitra - traditional scroll painting art',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'pattachitra'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Maharashtra Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/ajanta_caves.jpg',
  'Ajanta Caves in Maharashtra',
  'Ajanta Caves - ancient Buddhist rock-cut monuments',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'ajanta-caves'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Tamil Nadu Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/meenakshi_temple.jpg',
  'Meenakshi Amman Temple in Madurai, Tamil Nadu',
  'Meenakshi Amman Temple - iconic Dravidian architecture',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'meenakshi-amman-temple'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Madhya Pradesh Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/khajuraho_temples.jpg',
  'Khajuraho Temples in Madhya Pradesh',
  'Khajuraho Temples - UNESCO World Heritage Site',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'khajuraho-temples'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Delhi Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT 
  he.id,
  'image',
  '/assets/heritage/qutub_minar.jpg',
  'Qutub Minar in Delhi',
  'Qutub Minar - tallest brick minaret in the world',
  1,
  TRUE,
  'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'qutub-minar'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Verify final counts
DO $$
DECLARE
  orphan_count INTEGER;
  media_count INTEGER;
  relationship_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO orphan_count FROM heritage_entities WHERE location_id IS NULL;
  SELECT COUNT(*) INTO media_count FROM media;
  SELECT COUNT(*) INTO relationship_count FROM relationships;
  
  RAISE NOTICE '=== MIGRATION 011 RESULTS ===';
  RAISE NOTICE 'Orphan entities remaining: %', orphan_count;
  RAISE NOTICE 'Media records created: %', media_count;
  RAISE NOTICE 'Total relationships: %', relationship_count;
END $$;
