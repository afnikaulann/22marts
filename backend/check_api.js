const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hnfpwbymyfipqdgrctak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuZnB3YnlteWZpcHFkZ3JjdGFrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDk3NzQxNiwiZXhwIjoyMDkyNTM3NDE2fQ.gaKTlgl6zQsqXwUbfAY7OhTmcSnF2cOmRnw3xuFdn0Q'; // Service Role Key from .env

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Checking project hnfpwbymyfipqdgrctak via API...');
  const { data, error } = await supabase.from('categories').select('*');
  
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Categories found:', data.length);
    if (data.length > 0) {
      console.log('Sample data:', data.map(c => c.name).join(', '));
    }
  }
}

check();
