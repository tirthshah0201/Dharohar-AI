-- ============================================
-- P1.16: Cultural Media + Historical Period Expansion
-- ============================================
-- Adds verified media for cultural entities with local images.
-- Expands historical period references to more heritage entities.
-- Preserves all existing data.

-- ============================================
-- PART 1: Cultural Entity Media
-- ============================================
-- Only entities with verified local images in frontend/public/assets/heritage/

INSERT INTO media (id, entity_id, type, url, caption, alt_text, credit, display_order, is_primary, verification_status, created_at)
SELECT gen_random_uuid(), he.id, 'image', m.url, m.caption, m.alt_text, 'Astrova', 1, true, 'VERIFIED', NOW()
FROM heritage_entities he
CROSS JOIN (VALUES
  ('bandhani', '/assets/heritage/bandhani.jpg', 'Bandhani — traditional tie-dye textile technique of Gujarat', 'Bandhani tie-dye textile pattern from Gujarat, India'),
  ('garba', '/assets/heritage/garba.jpg', 'Garba dance performed during Navratri in Gujarat', 'Traditional Garba circle dance performed during Navratri festival in Gujarat'),
  ('gujarati-thali', '/assets/heritage/gujarati_thali.jpg', 'Gujarati Thali — traditional Gujarati meal', 'Traditional Gujarati Thali with dal, rice, rotli, vegetables, and sweets'),
  ('kutch-embroidery', '/assets/heritage/kutch_embroidery.png', 'Kutch embroidery with mirror work from Gujarat', 'Vibrant Kutch embroidery featuring mirror work and colorful thread patterns'),
  ('navratri', '/assets/heritage/navratri.jpeg', 'Navratri — nine nights of Garba and Dandiya Raas', 'Navratri festival celebrations with traditional Garba and Dandiya Raas dance'),
  ('rabari-community', '/assets/heritage/rabari_community.jpg', 'Rabari community — pastoral nomads of Gujarat', 'Rabari community in traditional attire, pastoral nomads of Gujarat and Rajasthan')
) AS m(slug, url, caption, alt_text)
WHERE he.slug = m.slug
  AND NOT EXISTS (SELECT 1 FROM media WHERE entity_id = he.id)
ON CONFLICT DO NOTHING;

-- ============================================
-- PART 2: Historical Period Expansion
-- ============================================
-- Assigns period_id to heritage entities with reasonable historical confidence.
-- Only uses existing historical_periods records.
-- Uses ON CONFLICT-safe UPDATE.

-- Ancient Period (-3300 to 700)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000001'
WHERE slug IN ('ajanta-caves', 'sanchi-stupa', 'kalaripayattu', 'theyyam', 'kite-festival-uttarayan')
  AND period_id IS NULL;

-- Chera/Chola Period (-300 to 1200)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000006'
WHERE slug IN ('bharatanatyam', 'chola-bronzes', 'meenakshi-amman-temple')
  AND period_id IS NULL;

-- Medieval Period (700 to 1300)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000002'
WHERE slug IN ('khajuraho-temples', 'konark-sun-temple', 'pattachitra', 'phulkari', 'gond-art', 'bhangra')
  AND period_id IS NULL;

-- Ahom Period (1228 to 1826)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000008'
WHERE slug IN ('majuli', 'sattriya-dance', 'bhaona', 'mask-making-of-majuli', 'satras-of-majuli')
  AND period_id IS NULL;

-- Sultanate Period (1300 to 1573)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000003'
WHERE slug IN ('adalaj-stepwell', 'qutub-minar', 'blue-pottery')
  AND period_id IS NULL;

-- Sultanate/Kashmir Period (1300 to 1586)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000007'
WHERE slug IN ('dard-shina-culture')
  AND period_id IS NULL;

-- Colonial Period (1573 to 1947)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000004'
WHERE slug IN ('amber-fort', 'hawa-mahal', 'red-fort', 'golden-temple', 'basilica-of-bom-jesus', 'se-cathedral', 'jallianwala-bagh', 'goa-carnival', 'chandni-chowk')
  AND period_id IS NULL;

-- Kalinga Period (-261 to 1500)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000009'
WHERE slug IN ('tribal-heritage-of-odisha')
  AND period_id IS NULL;
