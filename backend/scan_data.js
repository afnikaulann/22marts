const { Client } = require('pg');

const projects = [
  { ref: 'pqcexuqenjfudrwefnql', host: 'aws-1-ap-southeast-1.pooler.supabase.com' },
  { ref: 'hnfpwbymyfipqdgrctak', host: 'aws-1-ap-southeast-1.pooler.supabase.com' } // Assuming same region
];

const passwords = ['Marts2026Server', 'Afnikaulan754_', 'Afnikaulann754_'];

async function scan() {
  for (const project of projects) {
    for (const password of passwords) {
      const user = `postgres.${project.ref}`;
      console.log(`Scanning Project: ${project.ref} | User: ${user} | Password: ${password}`);
      
      const client = new Client({
        connectionString: `postgresql://${user}:${password}@${project.host}:6543/postgres?pgbouncer=true`,
      });
      
      try {
        await client.connect();
        console.log(`[SUCCESS] Connected to ${project.ref}`);
        
        const catRes = await client.query('SELECT count(*) FROM categories');
        console.log(`Categories: ${catRes.rows[0].count}`);
        
        const prodRes = await client.query('SELECT count(*) FROM products');
        console.log(`Products: ${prodRes.rows[0].count}`);
        
        if (parseInt(catRes.rows[0].count) > 0) {
            console.log('!!! DATA FOUND HERE !!!');
            // List some categories to be sure
            const list = await client.query('SELECT name FROM categories LIMIT 5');
            console.log('Sample Categories:', list.rows.map(r => r.name).join(', '));
        }

        await client.end();
      } catch (err) {
        console.log(`[FAILED] ${err.message}`);
      }
    }
  }
}

scan();
