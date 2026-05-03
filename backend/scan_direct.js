const { Client } = require('pg');

const projects = [
  { ref: 'pqcexuqenjfudrwefnql', host: 'db.pqcexuqenjfudrwefnql.supabase.co' },
  { ref: 'hnfpwbymyfipqdgrctak', host: 'db.hnfpwbymyfipqdgrctak.supabase.co' }
];

const passwords = ['Marts2026Server', 'Afnikaulan754_', 'Afnikaulann754_'];

async function scan() {
  for (const project of projects) {
    for (const password of passwords) {
      const user = `postgres`; // Direct host uses just postgres
      console.log(`Scanning Direct Project: ${project.ref} | User: ${user} | Password: ${password}`);
      
      const client = new Client({
        connectionString: `postgresql://${user}:${password}@${project.host}:5432/postgres?connect_timeout=10000`,
      });
      
      try {
        await client.connect();
        console.log(`[SUCCESS] Connected to ${project.ref}`);
        
        const catRes = await client.query('SELECT count(*) FROM categories');
        console.log(`Categories: ${catRes.rows[0].count}`);
        
        const prodRes = await client.query('SELECT count(*) FROM products');
        console.log(`Products: ${prodRes.rows[0].count}`);
        
        await client.end();
      } catch (err) {
        console.log(`[FAILED] ${err.message}`);
      }
    }
  }
}

scan();
