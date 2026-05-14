const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createBucket() {
  console.log('Attempting to create bucket "categories"...');
  
  const { data, error } = await supabase.storage.createBucket('categories', {
    public: true,
    fileSizeLimit: 1024 * 1024 * 2, // 2MB
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
  });

  if (error) {
    if (error.message === 'Bucket already exists' || error.error === 'Duplicate') {
      console.log('Bucket "categories" already exists.');
    } else {
      console.error('Failed to create bucket:', error);
    }
  } else {
    console.log('Successfully created bucket "categories"!');
    console.log('Data:', data);
  }
}

createBucket();
