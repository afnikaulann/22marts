const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.PROJECT_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testUpload() {
  console.log('Testing upload to Supabase...');
  console.log('Project URL:', process.env.PROJECT_URL);
  
  const testFile = Buffer.from('test');
  const { data, error } = await supabase.storage
    .from('categories')
    .upload('test-connection.txt', testFile, {
      contentType: 'text/plain',
      upsert: true
    });

  if (error) {
    console.error('Upload failed!');
    console.error('Error details:', error);
    if (error.message === 'bucket_not_found' || error.error === 'Bucket not found') {
      console.log('REASON: The bucket "categories" does not exist in your Supabase project.');
    }
  } else {
    console.log('Upload successful!');
    console.log('File path:', data.path);
  }
}

testUpload();
