-- ============================================
-- P1.17: Period Filtering + Additional Period Assignments
-- ============================================
-- Adds period references to entities with clear historical basis.
-- All operations are idempotent (use WHERE period_id IS NULL).

-- Ellora Caves: 6th–10th century CE → Medieval Period (700-1300)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000002'
WHERE slug = 'ellora-caves' AND period_id IS NULL;

-- Chettinad Mansions: 19th century → Colonial Period (1573-1947)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000004'
WHERE slug = 'chettinad-mansions' AND period_id IS NULL;

-- Chettiar Community: merchant community prominent in Colonial era → Colonial Period
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000004'
WHERE slug = 'chettiar-community' AND period_id IS NULL;

-- Chokhi Dhani: established 1989 → Modern Period (1947-present)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000005'
WHERE slug = 'chokhi-dhani' AND period_id IS NULL;

-- Navratri: ancient Hindu festival with Vedic roots → Ancient Period (-3300-700)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000001'
WHERE slug = 'navratri' AND period_id IS NULL;

-- Garba: traditional Gujarati dance with medieval roots → Medieval Period (700-1300)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000002'
WHERE slug = 'garba' AND period_id IS NULL;

-- Kutch Embroidery: centuries-old craft tradition → Medieval Period (700-1300)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000002'
WHERE slug = 'kutch-embroidery' AND period_id IS NULL;

-- Warli Art: ancient tribal art form dating back centuries → Ancient Period
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000001'
WHERE slug = 'warli-art' AND period_id IS NULL;

-- Raas Leela Festival: ancient Krishna-related dance-drama → Medieval Period
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000002'
WHERE slug = 'raas-leela-festival' AND period_id IS NULL;

-- Bandhani: centuries-old tie-dye technique → Medieval Period (700-1300)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000002'
WHERE slug = 'bandhani' AND period_id IS NULL;

-- Mishing Community: riverine tribe with Ahom-era roots → Ahom Period (1228-1826)
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000008'
WHERE slug = 'mishing-community' AND period_id IS NULL;

-- Gurez Valley: historical settlement with Sultanate/Kashmir roots → Sultanate/Kashmir Period
UPDATE heritage_entities SET period_id = 'a0000001-0000-0000-0000-000000000007'
WHERE slug = 'gurez-valley' AND period_id IS NULL;
