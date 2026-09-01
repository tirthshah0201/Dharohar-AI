-- ========================================
-- Migration 015: P1.11 Advanced Discovery
-- Adds media records for heritage entities
-- ========================================

-- Gujarat Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/patola_weaving.jpg', 'Patola weaving traditional craft in Gujarat', 'Patola - double ikat textile art', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'patola-weaving'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/mahatma_gandhi.jpg', 'Mahatma Gandhi portrait', 'Mahatma Gandhi - father of the nation', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'mahatma-gandhi'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/solanki_temple.jpg', 'Solanki temple architecture in Gujarat', 'Solanki Temple Architecture - intricate stone carvings', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'solanki-temple-architecture'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/salvi_community.jpg', 'Salvi community traditional weavers', 'Salvi Community - Patola weavers of Gujarat', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'salvi-community'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Rajasthan Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/amber_fort.jpg', 'Amber Fort in Jaipur, Rajasthan', 'Amber Fort - magnificent hilltop fortress', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'amber-fort'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/hawa_mahal.jpg', 'Hawa Mahal in Jaipur, Rajasthan', 'Hawa Mahal - Palace of Winds', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'hawa-mahal'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/blue_pottery.jpg', 'Blue Pottery craft in Jaipur', 'Blue Pottery - distinctive Jaipur craft', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'blue-pottery'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Punjab Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/golden_temple.jpg', 'Golden Temple in Amritsar, Punjab', 'Golden Temple - holiest shrine of Sikhism', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'golden-temple'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/jallianwala_bagh.jpg', 'Jallianwala Bagh memorial in Amritsar', 'Jallianwala Bagh - historic memorial', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'jallianwala-bagh'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/phulkari.jpg', 'Phulkari embroidery from Punjab', 'Phulkari - traditional Punjabi embroidery', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'phulkari'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/bhangra.jpg', 'Bhangra dance performance', 'Bhangra - energetic Punjabi folk dance', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'bhangra'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Madhya Pradesh Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/khajuraho_temples.jpg', 'Khajuraho Temples in Madhya Pradesh', 'Khajuraho Temples - UNESCO World Heritage Site', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'khajuraho-temples'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/sanchi_stupa.jpg', 'Sanchi Stupa in Madhya Pradesh', 'Sanchi Stupa - Buddhist monument', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'sanchi-stupa'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Tamil Nadu Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/meenakshi_temple.jpg', 'Meenakshi Amman Temple in Madurai', 'Meenakshi Amman Temple - Dravidian architecture', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'meenakshi-amman-temple'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chola_bronzes.jpg', 'Chola Bronze sculptures', 'Chola Bronzes - exquisite Hindu sculptures', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chola-bronzes'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chettinad_mansions.jpg', 'Chettinad Mansions in Tamil Nadu', 'Chettinad Mansions - grand ancestral homes', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chettinad-mansions'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/athangudi_tiles.jpg', 'Athangudi Tiles traditional craft', 'Athangudi Tiles - handmade floor tiles', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'athangudi-tiles'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chettinad_cuisine.jpg', 'Chettinad Cuisine traditional food', 'Chettinad Cuisine - spicy Tamil Nadu food', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chettinad-cuisine'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chettiar_community.jpg', 'Chettiar Community traditional traders', 'Chettiar Community - merchant heritage', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chettiar-community'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Kerala Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/malabar_cuisine.jpg', 'Malabar Cuisine traditional food', 'Malabar Cuisine - distinctive Kerala food', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'malabar-cuisine'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/muzhappilangad_beach.jpg', 'Muzhappilangad Beach in Kerala', 'Muzhappilangad Beach - scenic Kerala coastline', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'muzhappilangad-beach'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/meenmutty_falls.jpg', 'Meenmutty Falls in Kerala', 'Meenmutty Falls - spectacular waterfall', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'meenmutty-falls'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Goa Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/basilica_of_bom_jesus.jpg', 'Basilica of Bom Jesus in Goa', 'Basilica of Bom Jesus - UNESCO World Heritage Site', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'basilica-of-bom-jesus'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/feni.jpg', 'Feni traditional Goan beverage', 'Feni - traditional cashew spirit of Goa', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'feni'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Assam Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/mask_making_majuli.jpg', 'Mask Making tradition in Majuli', 'Mask Making of Majuli - traditional craft', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'mask-making-of-majuli'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/satras_of_majuli.jpg', 'Satras monasteries in Majuli', 'Satras of Majuli - Vaishnavite monasteries', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'satras-of-majuli'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/raas_leela_festival.jpg', 'Raas Leela Festival in Majuli', 'Raas Leela Festival - sacred dance festival', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'raas-leela-festival'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Odisha Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/satkosia_gorge.jpg', 'Satkosia Gorge in Odisha', 'Satkosia Gorge - Mahanadi River gorge', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'satkosia-gorge'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/satkosia_tiger_reserve.jpg', 'Satkosia Tiger Reserve in Odisha', 'Satkosia Tiger Reserve - wildlife sanctuary', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'satkosia-tiger-reserve'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/tribal_heritage_odisha.jpg', 'Tribal Heritage of Odisha', 'Tribal Heritage - indigenous cultures of Odisha', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'tribal-heritage-of-odisha'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Maharashtra Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/ajanta_caves.jpg', 'Ajanta Caves in Maharashtra', 'Ajanta Caves - Buddhist rock-cut monuments', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'ajanta-caves'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/amboli_hills.jpg', 'Amboli Hills in Maharashtra', 'Amboli Hills - scenic hill station', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'amboli-hills'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/amboli_waterfalls.jpg', 'Amboli Waterfalls in Maharashtra', 'Amboli Waterfalls - cascading waterfalls', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'amboli-waterfalls'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/western_ghats.jpg', 'Western Ghats biodiversity region', 'Western Ghats - biodiversity hotspot', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'western-ghats-biodiversity'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Jammu & Kashmir Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/dard_shina_culture.jpg', 'Dard-Shina Culture in Kashmir', 'Dard-Shina Culture - Himalayan community', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'dard-shina-culture'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/trekking_gurez.jpg', 'Trekking in Gurez Valley', 'Trekking in Gurez - Himalayan adventure', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'trekking-in-gurez'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Verify final count
DO $$
DECLARE
  media_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO media_count FROM media;
  RAISE NOTICE '=== MIGRATION 015 RESULTS ===';
  RAISE NOTICE 'Total media records: %', media_count;
END $$;
