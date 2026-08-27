const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function run() {
  const client = await pool.connect();
  try {
    const migrationFile = path.join(__dirname, 'migrations', '002_multistate_chatbot.sql');
    const seedFile = path.join(__dirname, 'seeds', '002_multistate_heritage.sql');
    
    console.log('Running migration 002...');
    const migration = fs.readFileSync(migrationFile, 'utf8');
    await client.query(migration);
    console.log('Migration 002 complete.');
    
    console.log('Running seed 002...');
    const seed = fs.readFileSync(seedFile, 'utf8');
    await client.query(seed);
    console.log('Seed 002 complete.');
    
    // Verify counts
    const states = await client.query('SELECT count(*) FROM supported_states');
    const knowledge = await client.query('SELECT count(*) FROM chatbot_knowledge');
    console.log('States:', states.rows[0].count);
    console.log('Knowledge entries:', knowledge.rows[0].count);
    
    // Count by state
    const byState = await client.query('SELECT state_code, count(*) as cnt FROM chatbot_knowledge GROUP BY state_code ORDER BY state_code');
    console.log('\nBy state:');
    for (const row of byState.rows) {
      console.log('  ' + row.state_code + ': ' + row.cnt);
    }
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}
run();
