/**
 * Script to notify search engines about deleted URLs using IndexNow
 * This helps deindex removed pages faster
 */

const https = require('https');

// Your IndexNow API key (should match the file in /public/)
const API_KEY = 'YOUR_INDEXNOW_KEY'; // Replace with your actual key

// List of deleted URLs that need to be deindexed
const DELETED_URLS = [
  'https://disposalgrid.com/old-page-1',
  'https://disposalgrid.com/old-page-2',
  // Add all your deleted URLs here
];

const HOST = 'disposalgrid.com';

/**
 * Submit deleted URLs to IndexNow
 * Note: IndexNow doesn't have a specific "delete" endpoint,
 * but submitting URLs that return 404/410 signals removal
 */
function submitDeletedUrls(urls) {
  const data = JSON.stringify({
    host: HOST,
    key: API_KEY,
    keyLocation: `https://${HOST}/${API_KEY}.txt`,
    urlList: urls
  });

  const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/indexnow',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    
    if (res.statusCode === 200) {
      console.log('✅ Successfully notified search engines about deleted URLs');
      console.log(`📊 Submitted ${urls.length} URLs for deindexing`);
    } else if (res.statusCode === 202) {
      console.log('✅ URLs received and will be processed');
    } else {
      console.log('⚠️ Unexpected response');
    }

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error:', error);
  });

  req.write(data);
  req.end();
}

// Run the script
if (DELETED_URLS.length > 0) {
  console.log(`🚀 Submitting ${DELETED_URLS.length} deleted URLs to IndexNow...`);
  submitDeletedUrls(DELETED_URLS);
} else {
  console.log('⚠️ No URLs to submit. Add deleted URLs to the DELETED_URLS array.');
}
