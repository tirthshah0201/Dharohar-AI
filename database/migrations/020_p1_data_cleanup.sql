-- ============================================
-- P1.20: Data Cleanup — Fix State Name Inconsistencies
-- ============================================
-- Fixes locations that use abbreviated state codes instead of full names.
-- Idempotent: only updates rows that don't already match.

UPDATE locations SET state = 'Maharashtra' WHERE state = 'MH';
UPDATE locations SET state = 'Tamil Nadu' WHERE state = 'TN';
UPDATE locations SET state = 'Madhya Pradesh' WHERE state = 'MP';
UPDATE locations SET state = 'Jammu & Kashmir' WHERE state = 'JK';
UPDATE locations SET state = 'Kerala' WHERE state = 'KL';
UPDATE locations SET state = 'Odisha' WHERE state = 'OD';
UPDATE locations SET state = 'Assam' WHERE state = 'AS';
UPDATE locations SET state = 'Gujarat' WHERE state = 'GJ';
UPDATE locations SET state = 'Rajasthan' WHERE state = 'RJ';
UPDATE locations SET state = 'Punjab' WHERE state = 'PB';
UPDATE locations SET state = 'Goa' WHERE state = 'GA';
UPDATE locations SET state = 'Delhi' WHERE state = 'DL';
