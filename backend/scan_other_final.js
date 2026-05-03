const { Client } = require('pg');

const projectRef = 'hnfpwbymyfipqdgrctak';
const host = 'aws-1-ap-southeast-1.pooler.supabase.com';
const user = `postgres.${projectRef}`;
const passwords = ['Afnikaulan754_', 'Afnikaulann754_', 'Marts2026Server'];

async function scan() {
  for (const password of passwords) {
    console.log(`Testing ${projectRef} with password: ${password}`);
    const client = new Client({
      connectionString: `postgresql://${user}:${password}@${host}:6543/postgres?pgbouncer=true`,
    });
    try {
      await client.connect();
      console.log('SUCCESS!');
      const res = await client.query('SELECT count(*) FROM categories');
      console.log('Categories:', res.rows[0].count);
      await client.end();
      return;
    } catch (err) {
      console.log('Failed:', err.message);
    }
  }
}

scan();
