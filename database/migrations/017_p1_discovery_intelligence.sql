-- ============================================
-- P1.14: Discovery Intelligence — Relationships + Content Improvements
-- ============================================
-- Adds meaningful heritage relationships for better discovery flow.
-- Preserves all existing relationships and data.

-- Add new meaningful relationships (ON CONFLICT DO NOTHING for safety)

-- Ajanta Caves ↔ Ellora Caves: both are UNESCO World Heritage cave temples in Maharashtra
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Ajanta Caves' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Ellora Caves' LIMIT 1),
  'ASSOCIATED_WITH',
  'Ajanta and Ellora are twin UNESCO World Heritage cave temple complexes in Maharashtra, representing centuries of Buddhist, Hindu, and Jain rock-cut architecture'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Ajanta Caves' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Ellora Caves' LIMIT 1)
);

-- Khajuraho ↔ Solanki Temple Architecture: temple architectural traditions
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Khajuraho Temples' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Solanki Temple Architecture' LIMIT 1),
  'ASSOCIATED_WITH',
  'Khajuraho and Solanki temples represent two of India''s most significant medieval temple architectural traditions'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Khajuraho Temples' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Solanki Temple Architecture' LIMIT 1)
);

-- Bharatanatyam ↔ Meenakshi Amman Temple: dance depicted in temple sculptures
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Bharatanatyam' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Meenakshi Amman Temple' LIMIT 1),
  'ASSOCIATED_WITH',
  'Classical dance forms like Bharatanatyam are deeply connected to South Indian temple traditions and sculptures'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Bharatanatyam' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Meenakshi Amman Temple' LIMIT 1)
);

-- Majuli ↔ Mishing Community: indigenous island community
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Majuli' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Mishing Community' LIMIT 1),
  'ASSOCIATED_WITH',
  'The Mishing community is one of the indigenous communities preserving traditional culture on Majuli island'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Majuli' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Mishing Community' LIMIT 1)
);

-- Majuli ↔ Mask Making of Majuli: traditional craft of the island
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Majuli' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Mask Making of Majuli' LIMIT 1),
  'ASSOCIATED_WITH',
  'Mask making is a distinctive traditional craft of Majuli island, practiced by artisans of the Vaishnavite Satras'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Majuli' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Mask Making of Majuli' LIMIT 1)
);

-- Sattriya Dance ↔ Satras of Majuli: dance originated in Majuli monasteries
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Sattriya Dance' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Satras of Majuli' LIMIT 1),
  'PRACTICED_BY',
  'Sattriya dance originated in the Vaishnavite Satras of Majuli as a devotional performing art'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Sattriya Dance' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Satras of Majuli' LIMIT 1)
);

-- Bhangra ↔ Phulkari: both are iconic Punjabi cultural traditions
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Bhangra' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Phulkari' LIMIT 1),
  'ASSOCIATED_WITH',
  'Bhangra and Phulkari are iconic Punjabi cultural traditions, with Phulkari embroidered textiles often worn during Bhangra celebrations'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Bhangra' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Phulkari' LIMIT 1)
);

-- Chettinad Mansions ↔ Chettinad Cuisine: cultural complex of the Chettiar community
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Chettinad Mansions' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Chettinad Cuisine' LIMIT 1),
  'ASSOCIATED_WITH',
  'Chettinad Mansions and Cuisine are both expressions of the wealthy Chettiar merchant community''s cultural heritage in Tamil Nadu'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Chettinad Mansions' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Chettinad Cuisine' LIMIT 1)
);

-- Chettinad Cuisine ↔ Chettiar Community: community that created the cuisine
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Chettinad Cuisine' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Chettiar Community' LIMIT 1),
  'PRACTICED_BY',
  'Chettinad cuisine is a distinctive culinary tradition created and preserved by the Chettiar merchant community of Tamil Nadu'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Chettinad Cuisine' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Chettiar Community' LIMIT 1)
);

-- Amboli Hills ↔ Amboli Waterfalls: same geographic area
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Amboli Hills' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Amboli Waterfalls' LIMIT 1),
  'PART_OF',
  'Amboli Waterfalls are a natural feature within the Amboli Hills region of the Western Ghats in Maharashtra'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Amboli Hills' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Amboli Waterfalls' LIMIT 1)
);

-- Kalaripayattu ↔ Theyyam: both are ancient Kerala performing arts
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Kalaripayattu' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Theyyam' LIMIT 1),
  'ASSOCIATED_WITH',
  'Kalaripayattu martial arts and Theyyam ritual dance are both ancient Kerala performing traditions with shared cultural roots'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Kalaripayattu' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Theyyam' LIMIT 1)
);

-- Garba ↔ Navratri: Garba is danced during Navratri
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Garba' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Navratri' LIMIT 1),
  'ASSOCIATED_WITH',
  'Garba is the traditional circular dance performed during the nine nights of Navratri, primarily in Gujarat'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Garba' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Navratri' LIMIT 1)
);

-- Sanchi Stupa ↔ Khajuraho Temples: both represent ancient Indian stone architecture
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Sanchi Stupa' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Khajuraho Temples' LIMIT 1),
  'ASSOCIATED_WITH',
  'Sanchi and Khajuraho represent distinct yet complementary traditions of ancient Indian stone architecture and religious art'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Sanchi Stupa' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Khajuraho Temples' LIMIT 1)
);

-- Red Fort ↔ Qutub Minar: iconic Delhi monuments
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Red Fort' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Qutub Minar' LIMIT 1),
  'ASSOCIATED_WITH',
  'The Red Fort and Qutub Minar are two of Delhi''s most iconic historical monuments spanning different eras of Indian history'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Red Fort' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Qutub Minar' LIMIT 1)
);

-- Adalaj Stepwell ↔ Rani ki Vav swap direction (ensure bidirectional discoverability)
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Adalaj Stepwell' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Rani ki Vav' LIMIT 1),
  'ASSOCIATED_WITH',
  'Adalaj and Rani ki Vav are masterpieces of Gujarati stepwell architecture, showcasing the region''s hydraulic engineering heritage'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Adalaj Stepwell' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Rani ki Vav' LIMIT 1)
);

-- Chilika Lake ↔ Satkosia Gorge: both are Odisha natural heritage sites
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Chilika Lake' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Satkosia Gorge' LIMIT 1),
  'ASSOCIATED_WITH',
  'Chilika Lake and Satkosia Gorge are two of Odisha''s most significant natural heritage landmarks'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Chilika Lake' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Satkosia Gorge' LIMIT 1)
);

-- Pattachitra ↔ Tribal Heritage of Odisha: traditional art forms of Odisha
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Pattachitra' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Tribal Heritage of Odisha' LIMIT 1),
  'ASSOCIATED_WITH',
  'Pattachitra painting and Tribal Heritage represent the rich artistic and cultural traditions of Odisha'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Pattachitra' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Tribal Heritage of Odisha' LIMIT 1)
);

-- Golden Temple ↔ Jallianwala Bagh: both are in Amritsar, Punjab
INSERT INTO relationships (id, source_id, target_id, type, description)
SELECT gen_random_uuid(),
  (SELECT id FROM heritage_entities WHERE name = 'Golden Temple' LIMIT 1),
  (SELECT id FROM heritage_entities WHERE name = 'Jallianwala Bagh' LIMIT 1),
  'ASSOCIATED_WITH',
  'The Golden Temple and Jallianwala Bagh are both located in Amritsar and represent different chapters of India''s heritage'
WHERE NOT EXISTS (
  SELECT 1 FROM relationships r
  WHERE r.source_id = (SELECT id FROM heritage_entities WHERE name = 'Golden Temple' LIMIT 1)
  AND r.target_id = (SELECT id FROM heritage_entities WHERE name = 'Jallianwala Bagh' LIMIT 1)
);
