-- ============================================
-- Dharohar AI — Gujarat Heritage Seed Data
-- ============================================
-- Run AFTER migration 001:
--   psql $DATABASE_URL -f database/seeds/001_gujarat_heritage.sql
-- ============================================

-- ---- Historical Periods ----
INSERT INTO historical_periods (id, name, start_year, end_year, description) VALUES
('a0000001-0000-0000-0000-000000000001', 'Ancient Period', -3300, 700, 'Early civilizations and cultural foundations in Gujarat, including the Indus Valley Civilization at Lothal and Dholavira.'),
('a0000001-0000-0000-0000-000000000002', 'Medieval Period', 700, 1300, 'Solanki/Chaulukya dynasty rule, golden age of temple architecture, and the rise of major trading centers.'),
('a0000001-0000-0000-0000-000000000003', 'Sultanate Period', 1300, 1573, 'Rule of Gujarat Sultanate, including Ahmedabad as a major cultural and trade center.'),
('a0000001-0000-0000-0000-000000000004', 'Colonial Period', 1573, 1947, 'Mughal rule followed by British colonial administration and the emergence of the freedom movement.'),
('a0000001-0000-0000-0000-000000000005', 'Modern Period', 1947, NULL, 'Post-independence development of Gujarat, industrialization, and cultural renaissance.')
ON CONFLICT (id) DO NOTHING;

-- ---- Locations ----
INSERT INTO locations (id, name, type, description, latitude, longitude, parent_id, state) VALUES
-- State
('b0000001-0000-0000-0000-000000000001', 'Gujarat', 'state', 'A state in western India known for its rich cultural heritage, diverse communities, and historical significance.', 22.2587, 71.1924, NULL, 'Gujarat'),

-- Districts
('b0000001-0000-0000-0000-000000000010', 'Ahmedabad', 'district', 'Former capital of Gujarat, known for its historic old city, Sabarmati Ashram, and rich textile heritage.', 23.0225, 72.5714, 'b0000001-0000-0000-0000-000000000001', 'Gujarat'),
('b0000001-0000-0000-0000-000000000011', 'Patan', 'district', 'Historical city known for Rani ki Vav, Patola weaving, and as the medieval capital of the Solanki dynasty.', 23.8508, 72.1271, 'b0000001-0000-0000-0000-000000000001', 'Gujarat'),
('b0000001-0000-0000-0000-000000000012', 'Rajkot', 'district', 'Cultural capital of Saurashtra, known for its role in the independence movement and Kathiawadi traditions.', 22.3039, 70.8022, 'b0000001-0000-0000-0000-000000000001', 'Gujarat'),
('b0000001-0000-0000-0000-000000000013', 'Junagadh', 'district', 'Ancient city at the foot of Girnar, with Buddhist caves, Islamic architecture, and proximity to Gir Forest.', 21.5222, 70.4657, 'b0000001-0000-0000-0000-000000000001', 'Gujarat'),
('b0000001-0000-0000-0000-000000000014', 'Surat', 'district', 'Historic port city, known as the gateway to Mecca for pilgrims and a center for diamond and textile trade.', 21.1702, 72.8311, 'b0000001-0000-0000-0000-000000000001', 'Gujarat'),
('b0000001-0000-0000-0000-000000000015', 'Vadodara', 'district', 'Cultural center known for the Laxmi Vilas Palace, Maharaja Sayajirao University, and Gujarati theater.', 22.3072, 73.1812, 'b0000001-0000-0000-0000-000000000001', 'Gujarat'),

-- Sites
('b0000001-0000-0000-0000-000000000020', 'Rani ki Vav', 'site', 'A UNESCO World Heritage stepwell in Patan, built in the 11th century during the Solanki dynasty.', 23.8571, 72.1330, 'b0000001-0000-0000-0000-000000000011', 'Gujarat'),
('b0000001-0000-0000-0000-000000000021', 'Sabarmati Ashram', 'site', 'Mahatma Gandhi''s residence on the banks of the Sabarmati River in Ahmedabad.', 23.0609, 72.5797, 'b0000001-0000-0000-0000-000000000010', 'Gujarat'),
('b0000001-0000-0000-0000-000000000022', 'Dholavira', 'site', 'UNESCO World Heritage Indus Valley Civilization site in Kutch district.', 23.8858, 70.2172, 'b0000001-0000-0000-0000-000000000001', 'Gujarat'),
('b0000001-0000-0000-0000-000000000023', 'Lothal', 'site', 'Indus Valley Civilization port city in Ahmedabad district, one of the earliest known dockyards.', 22.5240, 72.2455, 'b0000001-0000-0000-0000-000000000010', 'Gujarat'),
('b0000001-0000-0000-0000-000000000024', 'Modhera Sun Temple', 'site', '11th-century Sun Temple built during the Solanki dynasty in Mehsana district.', 23.5866, 72.2317, 'b0000001-0000-0000-0000-000000000001', 'Gujarat')

ON CONFLICT (id) DO NOTHING;

-- ---- Heritage Entities ----
INSERT INTO heritage_entities (id, name, category, description, location_id, period_id) VALUES
-- Monuments
('c0000001-0000-0000-0000-000000000001', 'Rani ki Vav', 'monument', 'UNESCO World Heritage Stepwell in Patan. Built by Queen Udayamati in memory of her husband Bhimdev I. Features intricate sculptures and elaborate architectural design with seven levels of stairs.', 'b0000001-0000-0000-0000-000000000020', 'a0000001-0000-0000-0000-000000000002'),
('c0000001-0000-0000-0000-000000000002', 'Modhera Sun Temple', 'monument', 'A magnificently carved Sun Temple from the Solanki period. Known for its stepped tank, assembly hall, and main shrine aligned with equinox sunrise.', 'b0000001-0000-0000-0000-000000000024', 'a0000001-0000-0000-0000-000000000002'),
('c0000001-0000-0000-0000-000000000003', 'Dholavira', 'monument', 'UNESCO World Heritage Indus Valley Civilization archaeological site. Features sophisticated water management system, 16-hatchet signboard, and advanced urban planning.', 'b0000001-0000-0000-0000-000000000022', 'a0000001-0000-0000-0000-000000000001'),
('c0000001-0000-0000-0000-000000000004', 'Sabarmati Ashram', 'monument', 'Historic ashram of Mahatma Gandhi on the banks of Sabarmati River. Center of the Indian independence movement and Gandhian philosophy.', 'b0000001-0000-0000-0000-000000000021', 'a0000001-0000-0000-0000-000000000005'),

-- Crafts
('c0000001-0000-0000-0000-000000000010', 'Patola Weaving', 'craft', 'Double Ikat silk weaving tradition from Patan. One of the most complex textile arts in India, requiring months of work for a single sari. Traditionally practiced by the Salvi community.', 'b0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000002'),
('c0000001-0000-0000-0000-000000000011', 'Kutch Embroidery', 'craft', 'Intricate hand embroidery tradition from the Kutch region, practiced by various communities including the Rabari, Ahir, and Jat communities.', NULL, NULL),
('c0000001-0000-0000-0000-000000000012', 'Bandhani', 'craft', 'Traditional tie-dye textile technique practiced across Gujarat, creating intricate patterns through hand-tied dots.', NULL, NULL),

-- People
('c0000001-0000-0000-0000-000000000020', 'Mahatma Gandhi', 'person', 'Father of the Indian Nation. Lived and worked from Sabarmati Ashram in Ahmedabad. Led India''s independence movement through non-violent civil disobedience.', 'b0000001-0000-0000-0000-000000000010', 'a0000001-0000-0000-0000-000000000005'),
('c0000001-0000-0000-0000-000000000021', 'Narsinh Mehta', 'person', 'Premier poet-saint of Gujarat from Junagadh. Author of the bhajan "Vaishnav Jan To" which became Mahatma Gandhi''s favorite devotional song.', 'b0000001-0000-0000-0000-000000000013', 'a0000001-0000-0000-0000-000000000003'),

-- Festivals
('c0000001-0000-0000-0000-000000000030', 'Navratri', 'festival', 'Nine-night festival celebrated with traditional Garba and Dandiya dances. Gujarat''s most vibrant cultural celebration, drawing participants from across the state.', NULL, NULL),
('c0000001-0000-0000-0000-000000000031', 'Kite Festival (Uttarayan)', 'festival', 'International kite festival held on January 14-15, marking Makar Sankranti. Ahmedabad hosts a major international event.', 'b0000001-0000-0000-0000-000000000010', NULL),

-- Communities
('c0000001-0000-0000-0000-000000000040', 'Salvi Community', 'community', 'Traditional weavers of Patola saris in Patan. Guardians of the double ikat weaving technique passed down through generations.', 'b0000001-0000-0000-0000-000000000011', NULL),
('c0000001-0000-0000-0000-000000000041', 'Rabari Community', 'community', 'Nomadic pastoral community of Kutch known for distinctive white attire, mirror-work embroidery, and rich oral traditions.', NULL, NULL),

-- Food
('c0000001-0000-0000-0000-000000000050', 'Gujarati Thali', 'food', 'Traditional Gujarati meal served on a thali (plate) featuring dal, rice, rotli, vegetables, pickles, papad, and sweet. Known for its balance of sweet, salty, sour, and spicy flavors.', NULL, NULL),

-- Architecture
('c0000001-0000-0000-0000-000000000060', 'Solanki Temple Architecture', 'architecture', 'Distinctive architectural style of the Solanki/Chaulukya dynasty period. Characterized by intricate carvings, stepped wells, and elaborate temple complexes.', 'b0000001-0000-0000-0000-000000000011', 'a0000001-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- ---- Relationships (heritage-entity to heritage-entity only) ----
INSERT INTO relationships (source_id, target_id, type, description) VALUES
-- Patola Weaving practiced by Salvi Community
('c0000001-0000-0000-0000-000000000010', 'c0000001-0000-0000-0000-000000000040', 'PRACTICED_BY', 'Patola weaving is practiced by the Salvi community'),
-- Kutch Embroidery practiced by Rabari Community
('c0000001-0000-0000-0000-000000000011', 'c0000001-0000-0000-0000-000000000041', 'PRACTICED_BY', 'Kutch embroidery is practiced by the Rabari community'),
-- Sabarmati Ashram associated with Mahatma Gandhi
('c0000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000020', 'ASSOCIATED_WITH', 'Sabarmati Ashram is associated with Mahatma Gandhi'),
-- Rani ki Vav exemplifies Solanki Architecture
('c0000001-0000-0000-0000-000000000001', 'c0000001-0000-0000-0000-000000000060', 'ASSOCIATED_WITH', 'Rani ki Vav exemplifies Solanki temple architecture'),
-- Modhera Sun Temple also exemplifies Solanki Architecture
('c0000001-0000-0000-0000-000000000002', 'c0000001-0000-0000-0000-000000000060', 'ASSOCIATED_WITH', 'Modhera Sun Temple exemplifies Solanki temple architecture'),
-- Narsinh Mehta associated with Mahatma Gandhi (Vaishnav Jan To)
('c0000001-0000-0000-0000-000000000021', 'c0000001-0000-0000-0000-000000000020', 'ASSOCIATED_WITH', 'Narsinh Mehta bhajan Vaishnav Jan To was Gandhi''s favorite'),
-- Navratri associated with Gujarat culture
('c0000001-0000-0000-0000-000000000030', 'c0000001-0000-0000-0000-000000000041', 'ASSOCIATED_WITH', 'Navratri Garba is celebrated across Kutch and Gujarat'),
-- Patola Weaving influences Bandhani
('c0000001-0000-0000-0000-000000000010', 'c0000001-0000-0000-0000-000000000012', 'INFLUENCED_BY', 'Patola and Bandhani are related textile traditions'),
-- Sabarmati Ashram linked to Modern Period events
('c0000001-0000-0000-0000-000000000004', 'c0000001-0000-0000-0000-000000000031', 'ASSOCIATED_WITH', 'Sabarmati Ashram is in Ahmedabad where Uttarayan is celebrated')
ON CONFLICT DO NOTHING;
