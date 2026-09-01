-- ============================================
-- Astrova P1.2B — Data Reconciliation Migration
-- ============================================
-- Creates locations and heritage_entities for:
-- 1. Five empty states (RJ, PB, GA, MP, DL)
-- 2. 27 unmatched chatbot_knowledge entries
-- 3. Patola Silk → Patola Weaving alias
-- Run: psql $DATABASE_URL -f database/migrations/007_p1_data_reconciliation.sql
-- ============================================

-- ---- 1. RAJASTHAN ----
-- State location
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000001', 'Rajasthan', 'state', 'Land of kings with magnificent forts, palaces, desert culture, and vibrant folk traditions.', 27.0238, 74.2179, NULL, 'Rajasthan')
ON CONFLICT (id) DO NOTHING;

-- District: Jaipur
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000010', 'Jaipur', 'district', 'Capital of Rajasthan — the Pink City with royal heritage and vibrant bazaars.', 26.9124, 75.7873, 'f0000001-0000-0000-0000-000000000001', 'Rajasthan')
ON CONFLICT (id) DO NOTHING;

-- Heritage entities for Rajasthan
INSERT INTO heritage_entities (id, name, category, description, location_id, period_id) VALUES
('f0000001-0000-0000-0000-000000000020', 'Amber Fort', 'monument', 'Majestic fortress-palace complex built by Raja Man Singh I in 1592. Features the Sheesh Mahal (Mirror Palace), Ganesh Pol gateway, and stunning views of Maota Lake.', 'f0000001-0000-0000-0000-000000000010', NULL),
('f0000001-0000-0000-0000-000000000021', 'Hawa Mahal', 'monument', 'Palace of Winds built by Maharaja Sawai Pratap Singh in 1799. Features 953 small windows (jharokhas) designed to allow royal women to observe street festivals without being seen.', 'f0000001-0000-0000-0000-000000000010', NULL),
('f0000001-0000-0000-0000-000000000022', 'Blue Pottery', 'craft', 'Traditional Jaipur pottery known for its vivid blue glaze. Uses quartz stone powder instead of clay. The technique was introduced during Mughal era and perfected in Jaipur.', 'f0000001-0000-0000-0000-000000000010', NULL),
('f0000001-0000-0000-0000-000000000023', 'Chokhi Dhani', 'tradition', 'Traditional Rajasthani village resort showcasing Rajasthani culture through folk dances, puppet shows, camel rides, and authentic cuisine.', 'f0000001-0000-0000-0000-000000000010', NULL)
ON CONFLICT (id) DO NOTHING;

-- ---- 2. PUNJAB ----
-- State location
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000101', 'Punjab', 'state', 'Land of five rivers with rich Sikh heritage, Mughal architecture, and vibrant cultural traditions.', 31.1471, 75.3412, NULL, 'Punjab')
ON CONFLICT (id) DO NOTHING;

-- District: Amritsar
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000110', 'Amritsar', 'district', 'Spiritual and cultural center of Sikhism — home to the Golden Temple.', 31.6340, 74.8723, 'f0000001-0000-0000-0000-000000000101', 'Punjab')
ON CONFLICT (id) DO NOTHING;

-- Heritage entities for Punjab
INSERT INTO heritage_entities (id, name, category, description, location_id, period_id) VALUES
('f0000001-0000-0000-0000-000000000120', 'Golden Temple', 'monument', 'Also known as Sri Harmandir Sahib. The holiest Gurdwara of Sikhism, built in the 16th century and plated with gold by Maharaja Ranjit Singh. Surrounded by the sacred Amrit Sarovar (Pool of Nectar).', 'f0000001-0000-0000-0000-000000000110', NULL),
('f0000001-0000-0000-0000-000000000121', 'Jallianwala Bagh', 'monument', 'A public garden and memorial site where British troops under General Dyer massacred hundreds of unarmed civilians on April 13, 1919. The bullet marks are still visible on the walls.', 'f0000001-0000-0000-0000-000000000110', NULL),
('f0000001-0000-0000-0000-000000000122', 'Phulkari', 'craft', 'Traditional embroidery art of Punjab. Women create vibrant floral patterns on shawls and dupattas using long darning stitches. Traditionally made by mothers for daughters.', 'f0000001-0000-0000-0000-000000000101', NULL),
('f0000001-0000-0000-0000-000000000123', 'Bhangra', 'tradition', 'Traditional folk dance of Punjab performed during harvest festivals, especially Vaisakhi. Energetic dance with distinctive shoulder movements and music played on the dhol drum.', 'f0000001-0000-0000-0000-000000000101', NULL)
ON CONFLICT (id) DO NOTHING;

-- ---- 3. GOA ----
-- State location
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000201', 'Goa', 'state', 'Former Portuguese colony with unique blend of Indian and European cultural heritage.', 15.2993, 74.1240, NULL, 'Goa')
ON CONFLICT (id) DO NOTHING;

-- District: North Goa
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000210', 'North Goa', 'district', 'Northern district of Goa — home to Old Goa churches and beaches.', 15.5009, 73.9115, 'f0000001-0000-0000-0000-000000000201', 'Goa')
ON CONFLICT (id) DO NOTHING;

-- Heritage entities for Goa
INSERT INTO heritage_entities (id, name, category, description, location_id, period_id) VALUES
('f0000001-0000-0000-0000-000000000220', 'Basilica of Bom Jesus', 'monument', 'UNESCO World Heritage Church in Old Goa. Built in 1594. Houses the mortal remains of St. Francis Xavier. Exemplifies Baroque architecture in India.', 'f0000001-0000-0000-0000-000000000210', NULL),
('f0000001-0000-0000-0000-000000000221', 'Feni', 'food', 'Traditional Goan spirit distilled from cashew apples or coconut. A protected Geographical Indication product of Goa.', 'f0000001-0000-0000-0000-000000000201', NULL),
('f0000001-0000-0000-0000-000000000222', 'Goa Carnival', 'festival', 'Annual carnival celebration introduced by the Portuguese. Features colorful parades, music, dance, and float processions led by King Momo.', 'f0000001-0000-0000-0000-000000000201', NULL)
ON CONFLICT (id) DO NOTHING;

-- ---- 4. MADHYA PRADESH ----
-- State location
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000301', 'Madhya Pradesh', 'state', 'Heart of India with UNESCO World Heritage sites, tribal art, and ancient temple architecture.', 23.2599, 77.4126, NULL, 'Madhya Pradesh')
ON CONFLICT (id) DO NOTHING;

-- District: Chhatarpur (Khajuraho)
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000310', 'Chhatarpur', 'district', 'District housing the Khajuraho temple complex.', 24.9177, 79.5790, 'f0000001-0000-0000-0000-000000000301', 'Madhya Pradesh')
ON CONFLICT (id) DO NOTHING;

-- District: Raisen (Sanchi)
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000311', 'Raisen', 'district', 'District housing the Sanchi Stupa complex.', 23.4793, 77.7397, 'f0000001-0000-0000-0000-000000000301', 'Madhya Pradesh')
ON CONFLICT (id) DO NOTHING;

-- Heritage entities for Madhya Pradesh
INSERT INTO heritage_entities (id, name, category, description, location_id, period_id) VALUES
('f0000001-0000-0000-0000-000000000320', 'Khajuraho Temples', 'monument', 'UNESCO World Heritage group of Hindu and Jain temples famous for their Nagara-style architecture and intricate sculptures. Built by the Chandela dynasty.', 'f0000001-0000-0000-0000-000000000310', NULL),
('f0000001-0000-0000-0000-000000000321', 'Sanchi Stupa', 'monument', 'UNESCO World Heritage Buddhist monument. The Great Stupa was commissioned by Emperor Ashoka in the 3rd century BCE and is one of the oldest stone structures in India.', 'f0000001-0000-0000-0000-000000000311', NULL),
('f0000001-0000-0000-0000-000000000322', 'Gond Art', 'craft', 'Traditional art form of the Gond tribal community. Uses vibrant colors and intricate dot patterns to depict nature, mythology, and daily life.', 'f0000001-0000-0000-0000-000000000301', NULL)
ON CONFLICT (id) DO NOTHING;

-- ---- 5. DELHI ----
-- State location
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000401', 'Delhi', 'state', 'Capital territory with layers of history from Delhi Sultanate to Mughal Empire to modern India.', 28.6139, 77.2090, NULL, 'Delhi')
ON CONFLICT (id) DO NOTHING;

-- Area: New Delhi
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
('f0000001-0000-0000-0000-000000000410', 'New Delhi', 'city', 'Capital of India — seven cities, centuries of history.', 28.6139, 77.2090, 'f0000001-0000-0000-0000-000000000401', 'Delhi')
ON CONFLICT (id) DO NOTHING;

-- Heritage entities for Delhi
INSERT INTO heritage_entities (id, name, category, description, location_id, period_id) VALUES
('f0000001-0000-0000-0000-000000000420', 'Red Fort', 'monument', 'UNESCO World Heritage Mughal fortress-palace built by Emperor Shah Jahan in 1638. Served as the main residence of Mughal emperors for nearly 200 years.', 'f0000001-0000-0000-0000-000000000410', NULL),
('f0000001-0000-0000-0000-000000000421', 'Qutub Minar', 'monument', 'UNESCO World Heritage minaret standing 72.5 meters tall. Construction began in 1192 by Qutb-ud-Din Aibak and was completed by his successor Iltutmish.', 'f0000001-0000-0000-0000-000000000410', NULL),
('f0000001-0000-0000-0000-000000000422', 'Chandni Chowk', 'tradition', 'One of the oldest and busiest markets in Old Delhi, built by Mughal Emperor Shah Jahan. Famous for street food, spices, textiles, and traditional bazaars.', 'f0000001-0000-0000-0000-000000000410', NULL)
ON CONFLICT (id) DO NOTHING;

-- ---- 6. ADDITIONAL UNMATCHED HERITAGE ENTITIES ----
-- These are chatbot_knowledge entries that need heritage_entities

-- Gujarat: Adalaj Stepwell (already has a location in seed 001)
INSERT INTO heritage_entities (id, name, category, description, location_id, period_id) VALUES
('f0000001-0000-0000-0000-000000000501', 'Adalaj Stepwell', 'monument', 'An intricately carved five-story stepwell built in 1498 by Queen Rudabai, wife of Vaghela chief Mahamandaleshwar. Features Indo-Islamic architecture with Hindu and Jain motifs.', 'b0000001-0000-0000-0000-000000000001', NULL),
-- Gujarat: Garba (tradition, no specific location)
('f0000001-0000-0000-0000-000000000502', 'Garba', 'tradition', 'Traditional devotional dance performed during Navratri festival. Dancers move in concentric circles around a central lamp (Garbi) representing the divine feminine.', NULL, NULL),
-- Gujarat: Patola Silk → use existing Patola Weaving entity (do not create duplicate)
-- Maharashtra: Ajanta Caves
('f0000001-0000-0000-0000-000000000510', 'Ajanta Caves', 'monument', 'UNESCO World Heritage Buddhist cave complex featuring 30 rock-cut caves with exquisite paintings and sculptures. The paintings depict Jataka tales and Buddhist teachings.', NULL, NULL),
-- Maharashtra: Ellora Caves
('f0000001-0000-0000-0000-000000000511', 'Ellora Caves', 'monument', 'UNESCO World Heritage site with 34 rock-cut caves representing Buddhist, Hindu, and Jain traditions. The Kailasa Temple (Cave 16) is the largest monolithic rock excavation in the world.', NULL, NULL),
-- Maharashtra: Warli Art
('f0000001-0000-0000-0000-000000000512', 'Warli Art', 'craft', 'Tribal art form of the Warli people of the Sahyadri mountains. Uses white rice paste on mud walls to create geometric patterns depicting daily life, nature, and festivals.', NULL, NULL),
-- Tamil Nadu: Bharatanatyam
('f0000001-0000-0000-0000-000000000520', 'Bharatanatyam', 'tradition', 'Classical dance form originating in Tamil Nadu, one of the oldest classical dance traditions in India. Performed as a solo dance with elaborate hand gestures (mudras) and facial expressions.', NULL, NULL),
-- Tamil Nadu: Chola Bronzes
('f0000001-0000-0000-0000-000000000521', 'Chola Bronzes', 'craft', 'Masterpiece bronze casting tradition of the Chola dynasty. The Nataraja (Dancing Shiva) bronze is considered one of the greatest achievements of Indian art.', NULL, NULL),
-- Tamil Nadu: Meenakshi Amman Temple
('f0000001-0000-0000-0000-000000000522', 'Meenakshi Amman Temple', 'monument', 'Historic Hindu temple dedicated to Goddess Meenakshi (Parvati) and Lord Sundareshwar (Shiva). Features 14 gopurams (gateway towers) adorned with thousands of colorful sculptures.', NULL, NULL),
-- Punjab: Bhangra
('f0000001-0000-0000-0000-000000000530', 'Bhangra', 'tradition', 'Traditional folk dance of Punjab performed during harvest festivals, especially Vaisakhi. Energetic dance with distinctive shoulder movements and music played on the dhol drum.', 'f0000001-0000-0000-0000-000000000101', NULL)
ON CONFLICT (id) DO NOTHING;

-- ---- 7. UPDATE CHATBOT KNOWLEDGE BRIDGE ----
-- Link newly created heritage_entities to chatbot_knowledge

UPDATE chatbot_knowledge ck
SET heritage_entity_id = he.id
FROM heritage_entities he
WHERE LOWER(ck.heritage_name) = LOWER(he.name)
  AND ck.heritage_entity_id IS NULL;

-- Link Patola Silk → Patola Weaving (name mismatch)
UPDATE chatbot_knowledge
SET heritage_entity_id = (SELECT id FROM heritage_entities WHERE LOWER(name) = 'patola weaving' LIMIT 1)
WHERE LOWER(heritage_name) = 'patola silk'
  AND heritage_entity_id IS NULL;

-- ---- 8. VERIFY ----
DO $$
DECLARE
  loc_total INTEGER;
  her_total INTEGER;
  chat_linked INTEGER;
  chat_total INTEGER;
BEGIN
  SELECT COUNT(*) INTO loc_total FROM locations;
  SELECT COUNT(*) INTO her_total FROM heritage_entities;
  SELECT COUNT(*) INTO chat_total FROM chatbot_knowledge;
  SELECT COUNT(*) INTO chat_linked FROM chatbot_knowledge WHERE heritage_entity_id IS NOT NULL;

  RAISE NOTICE '=== P1.2B RECONCILIATION RESULTS ===';
  RAISE NOTICE 'Total locations: %', loc_total;
  RAISE NOTICE 'Total heritage entities: %', her_total;
  RAISE NOTICE 'Total chatbot knowledge: %', chat_total;
  RAISE NOTICE 'Chatbot entries linked to heritage: % (% of %)', chat_linked, chat_linked, chat_total;
END $$;
