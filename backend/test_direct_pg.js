const { Client } = require('pg');
require('dotenv').config();

// Try direct connection first
const directUrl = process.env.DIRECT_URL.replace('aws-1-ap-southeast-1.pooler.supabase.com', 'db.pqcexuqenjfudrwefnql.supabase.co').replace('postgres.pqcexuqenjfudrwefnql', 'postgres');

console.log('Testing direct connection to:', directUrl);

const client = new Client({
  connectionString: directUrl,
});

async function test() {
  try {
    await client.connect();
    console.log('Successfully connected to the database directly!');
    const res = await client.query('SELECT NOW()');
    console.log('Current time from DB:', res.rows[0].now);
  } catch (err) {
    console.error('Direct connection failed:', err.message);
    
    console.log('\nTesting pooler connection...');
    const poolerClient = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    try {
      await poolerClient.connect();
      console.log('Successfully connected via pooler!');
      await poolerClient.end();
    } catch (poolErr) {
      console.error('Pooler connection also failed:', poolErr.message);
    }
  } finally {
    await client.end();
  }
}

test();
