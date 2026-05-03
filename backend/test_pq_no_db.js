const { Client } = require('pg');

const host = 'pqcexuqenjfudrwefnql.supabase.co'; // No 'db.' prefix
const user = 'postgres';
const password = 'Marts2026Server';

async function test() {
  console.log('Testing host:', host);
  const client = new Client({
    connectionString: `postgresql://${user}:${password}@${host}:5432/postgres`,
  });
  try {
    await client.connect();
    console.log('SUCCESS!');
    const res = await client.query('SELECT count(*) FROM categories');
    console.log('Categories:', res.rows[0].count);
    await client.end();
  } catch (err) {
    console.log('Failed:', err.message);
  }
}

test();
