const { Client } = require('pg');

// Try connecting to the other project found in MIDTRANX_URL
const otherHost = 'aws-1-ap-southeast-1.pooler.supabase.com'; // Same regional pooler host usually
const otherUser = 'postgres.hnfpwbymyfipqdgrctak';
const password = 'Marts2026Server'; // Try the newer password first

const connectionString = `postgresql://${otherUser}:${password}@${otherHost}:6543/postgres?pgbouncer=true`;

console.log('Testing connection to OTHER project:', otherUser);

const client = new Client({
  connectionString,
});

async function test() {
  try {
    await client.connect();
    console.log('Successfully connected to project hnfpwbymyfipqdgrctak!');
    const res = await client.query('SELECT count(*) FROM categories');
    console.log('Categories count:', res.rows[0].count);
    const prodRes = await client.query('SELECT count(*) FROM products');
    console.log('Products count:', prodRes.rows[0].count);
  } catch (err) {
    console.error('Connection failed:', err.message);
  } finally {
    await client.end();
  }
}

test();
