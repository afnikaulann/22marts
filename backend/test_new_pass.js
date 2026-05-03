const { Client } = require('pg');

const host = 'aws-1-ap-southeast-1.pooler.supabase.com';
const user = 'postgres.pqcexuqenjfudrwefnql';
const password = '22Marts2026';

async function test() {
  console.log('Testing password:', password);
  const client = new Client({
    connectionString: `postgresql://${user}:${password}@${host}:6543/postgres?pgbouncer=true`,
  });
  try {
    await client.connect();
    console.log('SUCCESS!');
    const res = await client.query('SELECT count(*) FROM categories');
    console.log('Categories count:', res.rows[0].count);
    const prodRes = await client.query('SELECT count(*) FROM products');
    console.log('Products count:', prodRes.rows[0].count);
    await client.end();
  } catch (err) {
    console.log('Failed:', err.message);
  }
}

test();
