#!/usr/bin/env node

/**
 * IndexNow Bulk Submission Script
 * 
 * Submits all important pages to IndexNow API for instant indexing on:
 * - Bing
 * - Yahoo
 * - Yandex
 * - Other IndexNow-compatible search engines
 * 
 * Usage: node scripts/submit-indexnow.js
 */

const https = require('https');

// Configuration
const CONFIG = {
  host: 'www.disposalgrid.com',
  key: '2fd1ad9e7c044fdaab90931cf2a6de09',
  keyLocation: 'https://www.disposalgrid.com/2fd1ad9e7c044fdaab90931cf2a6de09.txt',
  
  // IndexNow endpoint (notifies all partners: Bing, Yahoo, Yandex, etc.)
  endpoints: [
    'api.indexnow.org',      // Main endpoint (notifies all partners)
  ],
  
  // Batch size (IndexNow supports up to 10,000 URLs per request)
  batchSize: 10000,
};

// Important pages to submit
const IMPORTANT_PAGES = [
  // Core pages
  '/',
  '/search',
  '/materials',
  '/events',
  '/business',
  '/add-facility',
  
  // Top materials (based on common searches)
  '/materials/batteries',
  '/materials/electronics',
  '/materials/paint',
  '/materials/oil',
  '/materials/tires',
  '/materials/appliances',
  '/materials/chemicals',
  '/materials/fluorescent-bulbs',
  '/materials/medications',
  '/materials/propane-tanks',
  
  // Top states (most populated)
  '/california',
  '/texas',
  '/florida',
  '/new-york',
  '/pennsylvania',
  '/illinois',
  '/ohio',
  '/georgia',
  '/north-carolina',
  '/michigan',
  '/new-jersey',
  '/virginia',
  '/washington',
  '/arizona',
  '/massachusetts',
  '/tennessee',
  '/indiana',
  '/missouri',
  '/maryland',
  '/wisconsin',
  '/colorado',
  '/minnesota',
  '/south-carolina',
  '/alabama',
  '/louisiana',
  '/kentucky',
  '/oregon',
  '/oklahoma',
  '/connecticut',
  '/utah',
  '/iowa',
  '/nevada',
  '/arkansas',
  '/mississippi',
  '/kansas',
  '/new-mexico',
  '/nebraska',
  '/west-virginia',
  '/idaho',
  '/hawaii',
  '/new-hampshire',
  '/maine',
  '/montana',
  '/rhode-island',
  '/delaware',
  '/south-dakota',
  '/north-dakota',
  '/alaska',
  '/vermont',
  '/wyoming',
  
  // Major cities (examples - add more as needed)
  '/california/los-angeles',
  '/california/san-francisco',
  '/california/san-diego',
  '/texas/houston',
  '/texas/dallas',
  '/texas/austin',
  '/florida/miami',
  '/florida/tampa',
  '/florida/orlando',
  '/new-york/new-york-city',
  '/illinois/chicago',
  '/pennsylvania/philadelphia',
  '/arizona/phoenix',
  '/texas/san-antonio',
  '/california/san-jose',
  '/texas/fort-worth',
  '/ohio/columbus',
  '/north-carolina/charlotte',
  '/indiana/indianapolis',
  '/california/sacramento',
  '/washington/seattle',
  '/colorado/denver',
  '/massachusetts/boston',
  '/michigan/detroit',
  '/tennessee/nashville',
  '/oregon/portland',
  '/nevada/las-vegas',
  '/tennessee/memphis',
  '/maryland/baltimore',
  '/wisconsin/milwaukee',
  '/new-mexico/albuquerque',
  '/arizona/tucson',
  '/oklahoma/oklahoma-city',
  '/california/fresno',
  '/california/long-beach',
  '/virginia/virginia-beach',
  '/georgia/atlanta',
  '/missouri/kansas-city',
  '/california/oakland',
  '/florida/miami-beach',
  '/minnesota/minneapolis',
  '/oklahoma/tulsa',
  '/ohio/cleveland',
  '/louisiana/new-orleans',
  '/california/bakersfield',
  '/florida/tampa',
  '/colorado/aurora',
  '/california/anaheim',
  '/california/santa-ana',
  '/california/riverside',
  '/ohio/cincinnati',
  '/florida/st-petersburg',
  '/pennsylvania/pittsburgh',
  '/california/stockton',
  '/ohio/toledo',
  '/new-jersey/newark',
  '/ohio/akron',
  '/north-carolina/raleigh',
  '/florida/fort-lauderdale',
  '/kentucky/lexington',
  '/virginia/norfolk',
  '/north-carolina/greensboro',
  '/florida/jacksonville',
  '/missouri/st-louis',
];

/**
 * Convert relative paths to full URLs
 */
function buildUrls(paths) {
  return paths.map(path => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `https://${CONFIG.host}${cleanPath}`;
  });
}

/**
 * Submit URLs to IndexNow API
 */
function submitToIndexNow(urls, endpoint) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: CONFIG.host,
      key: CONFIG.key,
      keyLocation: CONFIG.keyLocation,
      urlList: urls,
    });

    const options = {
      hostname: endpoint,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 202) {
          resolve({
            success: true,
            statusCode: res.statusCode,
            endpoint,
            count: urls.length,
          });
        } else {
          resolve({
            success: false,
            statusCode: res.statusCode,
            endpoint,
            error: data || res.statusMessage,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        success: false,
        endpoint,
        error: error.message,
      });
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Split URLs into batches
 */
function batchUrls(urls, batchSize) {
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  return batches;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 IndexNow Bulk Submission');
  console.log('═══════════════════════════════════════════════════\n');
  
  // Build full URLs
  const urls = buildUrls(IMPORTANT_PAGES);
  console.log(`📄 Total URLs to submit: ${urls.length}`);
  console.log(`🔑 API Key: ${CONFIG.key}`);
  console.log(`🌐 Host: ${CONFIG.host}\n`);
  
  // Split into batches if needed
  const batches = batchUrls(urls, CONFIG.batchSize);
  console.log(`📦 Batches: ${batches.length}\n`);
  
  // Submit to each endpoint
  const results = [];
  
  for (const endpoint of CONFIG.endpoints) {
    console.log(`\n🔄 Submitting to ${endpoint}...`);
    console.log('─────────────────────────────────────────────────');
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`   Batch ${i + 1}/${batches.length}: ${batch.length} URLs`);
      
      try {
        const result = await submitToIndexNow(batch, endpoint);
        results.push(result);
        
        if (result.success) {
          console.log(`   ✅ Success (${result.statusCode})`);
        } else {
          console.log(`   ❌ Failed (${result.statusCode}): ${result.error}`);
        }
      } catch (error) {
        console.log(`   ❌ Error: ${error.error || error.message}`);
        results.push(error);
      }
      
      // Small delay between batches to avoid rate limiting
      if (i < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  
  // Summary
  console.log('\n\n📊 Summary');
  console.log('═══════════════════════════════════════════════════');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Successful submissions: ${successful}`);
  console.log(`❌ Failed submissions: ${failed}`);
  console.log(`📄 Total URLs submitted: ${urls.length}`);
  console.log(`🔍 Search engines notified: ${CONFIG.endpoints.length}`);
  
  console.log('\n\n🎯 What happens next?');
  console.log('─────────────────────────────────────────────────');
  console.log('• Search engines have been notified of your pages');
  console.log('• Indexing typically happens within minutes to hours');
  console.log('• Check Bing Webmaster Tools for submission status');
  console.log('• Monitor search results over the next 24-48 hours');
  
  console.log('\n\n📈 Monitoring');
  console.log('─────────────────────────────────────────────────');
  console.log('Bing Webmaster Tools:');
  console.log('  https://www.bing.com/webmasters');
  console.log('  → Reports & Data → IndexNow');
  console.log('\nYandex Webmaster:');
  console.log('  https://webmaster.yandex.com/');
  
  console.log('\n✨ Done!\n');
  
  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

// Run the script
main().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
