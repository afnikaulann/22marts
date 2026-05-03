const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pqcexuqenjfudrwefnql.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxY2V4dXFlbmpmdWRyd2VmbnFsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Njc4MzIxMiwiZXhwIjoyMDkyMzU5MjEyfQ.t622_CVnoxpA2b3F-CBT3b_16dHrH9qQHj5JAoJOJPI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Checking project pqcexuqenjfudrwefnql via API...');
  const { data, error } = await supabase.from('categories').select('*');
  
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Categories found:', data ? data.length : 0);
    if (data && data.length > 0) {
      console.log('Sample data:', data.map(c => c.name).join(', '));
    }
  }
}

check();
