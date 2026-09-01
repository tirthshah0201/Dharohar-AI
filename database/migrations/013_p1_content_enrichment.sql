-- ========================================
-- Migration 013: P1 Content Enrichment
-- Enriches heritage entity descriptions and adds more media
-- ========================================

-- ========================================
-- PART A: ENRICH HERITAGE DESCRIPTIONS
-- ========================================

-- Dard-Shina Culture
UPDATE heritage_entities
SET description = 'The Dard-Shina culture represents the traditional way of life of the Dard and Shina peoples inhabiting the remote valleys of Gurez, Dras, and surrounding regions in Jammu and Kashmir. This ancient cultural tradition encompasses distinctive wooden architecture, pastoral practices, traditional music, oral storytelling, and seasonal migration patterns shaped by the Himalayan landscape. The community maintains strong ties to their mountain environment, with customs reflecting centuries of adaptation to high-altitude living.'
WHERE slug = 'dard-shina-culture' AND LENGTH(description) < 150;

-- Majuli
UPDATE heritage_entities
SET description = 'Majuli is the world''s largest river island, situated in the Brahmaputra River in Assam. Spanning approximately 880 square kilometers, this cultural haven is home to numerous Vaishnavite monasteries (sattras) established by the 15th-century saint Srimanta Sankaradeva. The island is renowned for its mask-making tradition, Sattriya dance, and the annual Raas Leela festival. Majuli faces environmental challenges from river erosion but remains a living center of Assamese cultural heritage.'
WHERE slug = 'majuli' AND LENGTH(description) < 150;

-- Gurez Valley
UPDATE heritage_entities
SET description = 'Gurez Valley is a picturesque Himalayan valley located in the Bandipora district of Jammu and Kashmir, at an altitude of approximately 2,400 meters. The valley is home to the Dard and Shina communities, who maintain centuries-old traditions including distinctive wooden architecture, pastoral practices, and seasonal festivals. Known for its pristine beauty, alpine meadows, and the flowing Kishanganga River, Gurez offers trekking, cultural immersion, and a glimpse into traditional Himalayan life.'
WHERE slug = 'gurez-valley' AND LENGTH(description) < 150;

-- Feni
UPDATE heritage_entities
SET description = 'Feni is a traditional Goan alcoholic beverage made from cashew apples, distilled using methods passed down through generations. This distinctive drink reflects Goa''s Portuguese colonial heritage and local agricultural traditions. The cashew fruit is pressed to extract juice, which undergoes fermentation and distillation to produce the characteristic spirit. Feni holds cultural significance in Goan celebrations and social gatherings, representing the region''s unique culinary identity.'
WHERE slug = 'feni' AND LENGTH(description) < 150;

-- Kite Festival (Uttarayan)
UPDATE heritage_entities
SET description = 'The Kite Festival, known as Uttarayan, is Gujarat''s most vibrant celebration held annually on January 14-15 to mark the transition of the sun into the zodiac sign of Capricorn (Makar). The sky fills with thousands of colorful kites as people of all ages participate in friendly kite-flying competitions. The festival represents the harvest season and the end of winter, with traditional foods, music, and community gatherings accompanying the aerial celebrations.'
WHERE slug = 'kite-festival-uttarayan' AND LENGTH(description) < 150;

-- Theyyam
UPDATE heritage_entities
SET description = 'Theyyam is a sacred ritual art form native to North Kerala, combining dance, music, and elaborate costumes to embody divine entities during temple festivals. With over 400 distinct forms, each Theyyam performance involves elaborate makeup, towering headdresses, and fire rituals. The performer undergoes spiritual preparation before becoming the deity during the ceremony. This ancient tradition represents one of India''s most spectacular living ritual performance arts.'
WHERE slug = 'theyyam' AND LENGTH(description) < 150;

-- Salvi Community
UPDATE heritage_entities
SET description = 'The Salvi community is a traditional weaving community of Gujarat renowned for their mastery of Patola double ikat textile art. For generations, Salvi artisans have practiced the complex technique of resist-dyeing both warp and weft threads before weaving, creating intricate geometric and figurative patterns. Patola textiles hold ceremonial importance and are considered auspicious, with some designs taking months to complete. The community maintains this demanding craft as a vital part of Gujarat''s textile heritage.'
WHERE slug = 'salvi-community' AND LENGTH(description) < 150;

-- Sabarmati Ashram
UPDATE heritage_entities
SET description = 'Sabarmati Ashram, also known as Gandhi Ashram, was established by Mahatma Gandhi in 1917 on the banks of the Sabarmati River in Ahmedabad. This historic site served as the headquarters of India''s freedom struggle and housed Gandhi''s living quarters, prayer hall, and spinning workshop. Today, the ashram preserves Gandhi''s legacy through museums, archives, and exhibits documenting his philosophy of non-violence and self-reliance.'
WHERE slug = 'sabarmati-ashram' AND LENGTH(description) < 150;

-- Goa Carnival
UPDATE heritage_entities
SET description = 'The Goa Carnival is a vibrant three-day celebration held annually in February, reflecting Goa''s Portuguese colonial heritage and multicultural identity. The festival features colorful parades with elaborate floats, music, dance, and street performances through the streets of Panaji. Originating from Portuguese Catholic traditions, the carnival blends European festivities with Indian cultural elements, attracting visitors from around the world.'
WHERE slug = 'goa-carnival' AND LENGTH(description) < 150;

-- Narsinh Mehta
UPDATE heritage_entities
SET description = 'Narsinh Mehta (1414-1481) was a revered Gujarati poet-saint whose devotional hymns (bhajans) continue to inspire spiritual practice across India. Born in Talaja, Gujarat, he composed over 1,000 bhajans including the famous Vaishnava Jan To, which Mahatma Gandhi adopted as his favorite hymn. His poetry emphasizes devotion, humility, and social equality, making him one of Gujarat''s most cherished literary and spiritual figures.'
WHERE slug = 'narsinh-mehta' AND LENGTH(description) < 150;

-- Chokhi Dhani
UPDATE heritage_entities
SET description = 'Chokhi Dhani is an ethnic village resort near Jaipur that recreates the atmosphere of a traditional Rajasthani village. Visitors experience authentic Rajasthani culture through folk performances, puppet shows, camel rides, traditional music, and regional cuisine. The village showcases traditional architecture, handicrafts, and customs, offering a comprehensive cultural immersion into Rajasthan''s rural heritage and artistic traditions.'
WHERE slug = 'chokhi-dhani' AND LENGTH(description) < 150;

-- Gond Art
UPDATE heritage_entities
SET description = 'Gond Art is a traditional tribal art form practiced by the Gond community of Madhya Pradesh, characterized by intricate patterns of dots and lines that fill natural forms. Using natural pigments and dyes, Gond artists depict animals, birds, trees, and mythological scenes with distinctive decorative patterns. This ancient art form represents the community''s deep connection to nature and spiritual beliefs, with each pattern carrying symbolic meaning.'
WHERE slug = 'gond-art' AND LENGTH(description) < 150;

-- Basilica of Bom Jesus
UPDATE heritage_entities
SET description = 'The Basilica of Bom Jesus is a UNESCO World Heritage Site located in Old Goa, completed in 1605. This baroque-style church houses the mortal remains of St. Francis Xavier and represents one of the finest examples of Portuguese colonial architecture in India. The basilica features ornate gilded altars, marble flooring, and elaborate religious artwork, attracting pilgrims and tourists from around the world.'
WHERE slug = 'basilica-of-bom-jesus' AND LENGTH(description) < 150;

-- Qutub Minar
UPDATE heritage_entities
SET description = 'Qutub Minar is the tallest brick minaret in the world, standing at 72.5 meters in Delhi. Construction began in 1192 under Qutb-ud-din Aibak and was completed by his successor Iltutmish. The tower features five stories with intricate carvings and inscriptions, showcasing Indo-Islamic architecture. The surrounding complex includes the Iron Pillar, Quwwat-ul-Islam Mosque, and other historical structures dating from the Delhi Sultanate period.'
WHERE slug = 'qutub-minar' AND LENGTH(description) < 150;

-- Red Fort
UPDATE heritage_entities
SET description = 'The Red Fort (Lal Qila) is a UNESCO World Heritage Site in Delhi, built by Mughal Emperor Shah Jahan in 1638 as the palace of his new capital Shahjahanabad. The massive red sandstone fortress encompasses palaces, audience halls, gardens, and mosques, representing the zenith of Mughal architecture. Every Independence Day, the Prime Minister of India addresses the nation from its ramparts, making it a symbol of both historical grandeur and modern democratic India.'
WHERE slug = 'red-fort' AND LENGTH(description) < 150;

-- Chandni Chowk
UPDATE heritage_entities
SET description = 'Chandni Chowk is one of Delhi''s oldest and busiest markets, established in the 17th century during the Mughal era. The bustling bazaar stretches through the heart of Old Delhi, offering everything from spices and textiles to electronics and street food. The market embodies centuries of Delhi''s commercial and cultural history, with narrow lanes leading to temples, mosques, havelis, and some of the city''s most famous food establishments.'
WHERE slug = 'chandni-chowk' AND LENGTH(description) < 150;

-- Solanki Temple Architecture
UPDATE heritage_entities
SET description = 'Solanki Temple Architecture represents the distinctive architectural style of the Solanki dynasty that ruled Gujarat and Rajasthan from the 10th to 13th centuries. Characterized by intricate stone carvings, elaborate stepwells, and ornate temple complexes, this style produced masterpieces like Rani ki Vav and Modhera Sun Temple. The architecture emphasizes geometric precision, naturalistic sculptures, and a harmonious blend of Hindu and Jain artistic traditions.'
WHERE slug = 'solanki-temple-architecture' AND LENGTH(description) < 150;

-- Chola Bronzes
UPDATE heritage_entities
SET description = 'The Chola Bronzes are exquisite cast metal sculptures created during the Chola dynasty (9th-13th centuries) in Tamil Nadu. Using the lost-wax casting technique, artisans produced highly refined bronze images of Hindu deities, particularly Shiva as Nataraja (Lord of the Dance). These sculptures are celebrated for their graceful proportions, dynamic poses, and technical mastery, representing one of the highest achievements in Indian sculptural art.'
WHERE slug = 'chola-bronzes' AND LENGTH(description) < 150;

-- ========================================
-- PART B: ADD MORE MEDIA RECORDS
-- ========================================

-- Gujarat Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/adalaj_stepwell.jpg', 'Adalaj Stepwell in Gujarat', 'Adalaj Stepwell - intricate Solanki architecture', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'adalaj-stepwell'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/narsinh_mehta.jpg', 'Narsinh Mehta - Gujarati poet-saint', 'Narsinh Mehta - devotional poet', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'narsinh-mehta'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/kite_festival.jpg', 'Kite Festival in Gujarat', 'Kite Festival - vibrant celebration of Uttarayan', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'kite-festival-uttarayan'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Rajasthan Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chokhi_dhani.jpg', 'Chokhi Dhani in Rajasthan', 'Chokhi Dhani - traditional Rajasthani village', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chokhi-dhani'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Goa Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/goa_carnival.jpg', 'Goa Carnival celebration', 'Goa Carnival - vibrant street festival', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'goa-carnival'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Madhya Pradesh Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/gond_art.jpg', 'Gond Art from Madhya Pradesh', 'Gond Art - tribal art with dot patterns', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'gond-art'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Delhi Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/qutub_minar.jpg', 'Qutub Minar in Delhi', 'Qutub Minar - tallest brick minaret', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'qutub-minar'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/red_fort.jpg', 'Red Fort in Delhi', 'Red Fort - Mughal architecture masterpiece', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'red-fort'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Tamil Nadu Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/chola_bronzes.jpg', 'Chola Bronze sculptures', 'Chola Bronzes - exquisite Hindu sculptures', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'chola-bronzes'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Kerala Heritage Media
INSERT INTO media (entity_id, type, url, alt_text, caption, display_order, is_primary, verification_status)
SELECT he.id, 'image', '/assets/heritage/theyyam.jpg', 'Theyyam ritual art in Kerala', 'Theyyam - sacred ritual performance', 1, TRUE, 'VERIFIED'
FROM heritage_entities he WHERE he.slug = 'theyyam'
AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id);

-- Verify final counts
DO $$
DECLARE
  media_count INTEGER;
  desc_complete INTEGER;
  desc_adequate INTEGER;
BEGIN
  SELECT COUNT(*) INTO media_count FROM media;
  SELECT COUNT(*) INTO desc_complete FROM heritage_entities WHERE LENGTH(description) >= 200;
  SELECT COUNT(*) INTO desc_adequate FROM heritage_entities WHERE LENGTH(description) >= 100 AND LENGTH(description) < 200;
  
  RAISE NOTICE '=== MIGRATION 013 RESULTS ===';
  RAISE NOTICE 'Media records: %', media_count;
  RAISE NOTICE 'Complete descriptions (200+): %', desc_complete;
  RAISE NOTICE 'Adequate descriptions (100-199): %', desc_adequate;
END $$;
