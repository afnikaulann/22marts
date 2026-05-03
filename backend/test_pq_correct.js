const { Client } = require('pg');

const host = 'aws-1-ap-southeast-1.pooler.supabase.com';
const user = 'postgres.pqcexuqenjfudrwefnql';
const passwords = ['Marts2026Server', 'Afnikaulan754_', 'Afnikaulann754_'];

async function testAll() {
  for (const password of passwords) {
    console.log(`Testing password: ${password}`);
    const client = new Client({
      connectionString: `postgresql://${user}:${password}@${host}:6543/postgres?pgbouncer=true`,
    });
    try {
      await client.connect();
      console.log('SUCCESS with password:', password);
      const res = await client.query('SELECT count(*) FROM categories');
      console.log('Categories count:', res.rows[0].count);
      await client.end();
      return;
    } catch (err) {
      console.error('Failed:', err.message);
    }
  }
}

testAll();
