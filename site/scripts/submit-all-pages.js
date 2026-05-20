#!/usr/bin/env node

/**
 * IndexNow Complete Site Submission
 * 
 * Submits ALL pages including:
 * - Static pages (home, search, materials, etc.)
 * - All facility pages (from database)
 * - All material pages
 * - All state/region pages
 * - All event pages
 * 
 * This is a comprehensive submission for maximum search visibility.
 * 
 * Usage: node scripts/submit-all-pages.js
 */

const https = require('https');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Configuration
const CONFIG = {
  host: 'www.disposalgrid.com',
  key: '2fd1ad9e7c044fdaab90931cf2a6de09',
  keyLocation: 'https://www.disposalgrid.com/2fd1ad9e7c044fdaab90931cf2a6de09.txt',
  
  // IndexNow main endpoint (notifies all partners including Bing, Yahoo, Yandex)
  endpoint: 'api.indexnow.org',
  
  // Batch size (IndexNow supports up to 10,000 URLs per request)
  batchSize: 10000,
  
  // Delay between batches (milliseconds)
  batchDelay: 2000,
};

// Supabase client
let supabase = null;

/**
 * Initialize Supabase client
 */
function initSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️  Supabase credentials not found. Will skip database URLs.');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Fetch all facility URLs from database
 */
async function getFacilityUrls() {
  if (!supabase) return [];
  
  try {
    console.log('📦 Fetching facilities from database...');
    
    const { data, error } = await supabase
      .from('facilities')
      .select('handler_id')
      .not('handler_id', 'is', null);
    
    if (error) {
      console.error('❌ Error fetching facilities:', error.message);
      return [];
    }
    
    const urls = data.map(f => `/facility/${f.handler_id}`);
    console.log(`   ✅ Found ${urls.length} facilities`);
    return urls;
  } catch (error) {
    console.error('❌ Error fetching facilities:', error.message);
    return [];
  }
}

/**
 * Fetch all event URLs from database
 */
async function getEventUrls() {
  if (!supabase) return [];
  
  try {
    console.log('📅 Fetching events from database...');
    
    const { data, error } = await supabase
      .from('hhw_events')
      .select('id')
      .not('id', 'is', null);
    
    if (error) {
      console.error('❌ Error fetching events:', error.message);
      return [];
    }
    
    const urls = data.map(e => `/events/${e.id}`);
    console.log(`   ✅ Found ${urls.length} events`);
    return urls;
  } catch (error) {
    console.error('❌ Error fetching events:', error.message);
    return [];
  }
}

/**
 * Get all static and important pages
 */
function getStaticPages() {
  return [
    // Core pages
    '/',
    '/search',
    '/materials',
    '/events',
    '/business',
    '/add-facility',
    
    // Material pages (common disposal items)
    '/materials/batteries',
    '/materials/electronics',
    '/materials/paint',
    '/materials/oil',
    '/materials/motor-oil',
    '/materials/tires',
    '/materials/appliances',
    '/materials/chemicals',
    '/materials/fluorescent-bulbs',
    '/materials/light-bulbs',
    '/materials/medications',
    '/materials/prescription-drugs',
    '/materials/propane-tanks',
    '/materials/refrigerators',
    '/materials/air-conditioners',
    '/materials/computers',
    '/materials/monitors',
    '/materials/televisions',
    '/materials/cell-phones',
    '/materials/printers',
    '/materials/antifreeze',
    '/materials/pesticides',
    '/materials/herbicides',
    '/materials/fertilizers',
    '/materials/pool-chemicals',
    '/materials/automotive-fluids',
    '/materials/brake-fluid',
    '/materials/transmission-fluid',
    '/materials/mercury',
    '/materials/thermometers',
    '/materials/thermostats',
    '/materials/smoke-detectors',
    '/materials/fire-extinguishers',
    '/materials/propane',
    '/materials/gasoline',
    '/materials/diesel',
    '/materials/kerosene',
    '/materials/solvents',
    '/materials/cleaners',
    '/materials/degreasers',
    '/materials/aerosols',
    '/materials/spray-paint',
    '/materials/latex-paint',
    '/materials/oil-based-paint',
    '/materials/stains',
    '/materials/varnish',
    '/materials/wood-preservatives',
    '/materials/asbestos',
    '/materials/lead-paint',
    '/materials/pcbs',
    '/materials/radioactive-materials',
    
    // All 50 US states
    '/alabama', '/alaska', '/arizona', '/arkansas', '/california',
    '/colorado', '/connecticut', '/delaware', '/florida', '/georgia',
    '/hawaii', '/idaho', '/illinois', '/indiana', '/iowa',
    '/kansas', '/kentucky', '/louisiana', '/maine', '/maryland',
    '/massachusetts', '/michigan', '/minnesota', '/mississippi', '/missouri',
    '/montana', '/nebraska', '/nevada', '/new-hampshire', '/new-jersey',
    '/new-mexico', '/new-york', '/north-carolina', '/north-dakota', '/ohio',
    '/oklahoma', '/oregon', '/pennsylvania', '/rhode-island', '/south-carolina',
    '/south-dakota', '/tennessee', '/texas', '/utah', '/vermont',
    '/virginia', '/washington', '/west-virginia', '/wisconsin', '/wyoming',
    
    // Major metropolitan areas (top 100 cities)
    '/california/los-angeles',
    '/california/san-francisco',
    '/california/san-diego',
    '/california/san-jose',
    '/california/sacramento',
    '/california/fresno',
    '/california/long-beach',
    '/california/oakland',
    '/california/bakersfield',
    '/california/anaheim',
    '/california/santa-ana',
    '/california/riverside',
    '/california/stockton',
    '/texas/houston',
    '/texas/dallas',
    '/texas/austin',
    '/texas/san-antonio',
    '/texas/fort-worth',
    '/texas/el-paso',
    '/texas/arlington',
    '/texas/corpus-christi',
    '/texas/plano',
    '/texas/laredo',
    '/florida/miami',
    '/florida/tampa',
    '/florida/orlando',
    '/florida/jacksonville',
    '/florida/st-petersburg',
    '/florida/fort-lauderdale',
    '/florida/hialeah',
    '/florida/port-st-lucie',
    '/florida/cape-coral',
    '/florida/tallahassee',
    '/new-york/new-york-city',
    '/new-york/buffalo',
    '/new-york/rochester',
    '/new-york/yonkers',
    '/new-york/syracuse',
    '/pennsylvania/philadelphia',
    '/pennsylvania/pittsburgh',
    '/pennsylvania/allentown',
    '/pennsylvania/erie',
    '/pennsylvania/reading',
    '/illinois/chicago',
    '/illinois/aurora',
    '/illinois/naperville',
    '/illinois/joliet',
    '/illinois/rockford',
    '/ohio/columbus',
    '/ohio/cleveland',
    '/ohio/cincinnati',
    '/ohio/toledo',
    '/ohio/akron',
    '/ohio/dayton',
    '/georgia/atlanta',
    '/georgia/augusta',
    '/georgia/columbus',
    '/georgia/savannah',
    '/georgia/athens',
    '/north-carolina/charlotte',
    '/north-carolina/raleigh',
    '/north-carolina/greensboro',
    '/north-carolina/durham',
    '/north-carolina/winston-salem',
    '/michigan/detroit',
    '/michigan/grand-rapids',
    '/michigan/warren',
    '/michigan/sterling-heights',
    '/michigan/ann-arbor',
    '/arizona/phoenix',
    '/arizona/tucson',
    '/arizona/mesa',
    '/arizona/chandler',
    '/arizona/scottsdale',
    '/tennessee/nashville',
    '/tennessee/memphis',
    '/tennessee/knoxville',
    '/tennessee/chattanooga',
    '/tennessee/clarksville',
    '/massachusetts/boston',
    '/massachusetts/worcester',
    '/massachusetts/springfield',
    '/massachusetts/cambridge',
    '/massachusetts/lowell',
    '/washington/seattle',
    '/washington/spokane',
    '/washington/tacoma',
    '/washington/vancouver',
    '/washington/bellevue',
    '/colorado/denver',
    '/colorado/colorado-springs',
    '/colorado/aurora',
    '/colorado/fort-collins',
    '/colorado/lakewood',
    '/indiana/indianapolis',
    '/indiana/fort-wayne',
    '/indiana/evansville',
    '/indiana/south-bend',
    '/indiana/carmel',
    '/missouri/kansas-city',
    '/missouri/st-louis',
    '/missouri/springfield',
    '/missouri/columbia',
    '/missouri/independence',
    '/maryland/baltimore',
    '/maryland/frederick',
    '/maryland/rockville',
    '/maryland/gaithersburg',
    '/maryland/bowie',
    '/wisconsin/milwaukee',
    '/wisconsin/madison',
    '/wisconsin/green-bay',
    '/wisconsin/kenosha',
    '/wisconsin/racine',
    '/minnesota/minneapolis',
    '/minnesota/st-paul',
    '/minnesota/rochester',
    '/minnesota/duluth',
    '/minnesota/bloomington',
    '/oregon/portland',
    '/oregon/salem',
    '/oregon/eugene',
    '/oregon/gresham',
    '/oregon/hillsboro',
    '/nevada/las-vegas',
    '/nevada/henderson',
    '/nevada/reno',
    '/nevada/north-las-vegas',
    '/nevada/sparks',
    '/new-mexico/albuquerque',
    '/new-mexico/las-cruces',
    '/new-mexico/rio-rancho',
    '/new-mexico/santa-fe',
    '/new-mexico/roswell',
    '/oklahoma/oklahoma-city',
    '/oklahoma/tulsa',
    '/oklahoma/norman',
    '/oklahoma/broken-arrow',
    '/oklahoma/lawton',
    '/louisiana/new-orleans',
    '/louisiana/baton-rouge',
    '/louisiana/shreveport',
    '/louisiana/lafayette',
    '/louisiana/lake-charles',
    '/kentucky/louisville',
    '/kentucky/lexington',
    '/kentucky/bowling-green',
    '/kentucky/owensboro',
    '/kentucky/covington',
    '/virginia/virginia-beach',
    '/virginia/norfolk',
    '/virginia/chesapeake',
    '/virginia/richmond',
    '/virginia/newport-news',
    '/connecticut/bridgeport',
    '/connecticut/new-haven',
    '/connecticut/stamford',
    '/connecticut/hartford',
    '/connecticut/waterbury',
    '/utah/salt-lake-city',
    '/utah/west-valley-city',
    '/utah/provo',
    '/utah/west-jordan',
    '/utah/orem',
    '/iowa/des-moines',
    '/iowa/cedar-rapids',
    '/iowa/davenport',
    '/iowa/sioux-city',
    '/iowa/iowa-city',
    '/arkansas/little-rock',
    '/arkansas/fort-smith',
    '/arkansas/fayetteville',
    '/arkansas/springdale',
    '/arkansas/jonesboro',
    '/kansas/wichita',
    '/kansas/overland-park',
    '/kansas/kansas-city',
    '/kansas/olathe',
    '/kansas/topeka',
    '/new-jersey/newark',
    '/new-jersey/jersey-city',
    '/new-jersey/paterson',
    '/new-jersey/elizabeth',
    '/new-jersey/edison',
  ];
}

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
function submitToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: CONFIG.host,
      key: CONFIG.key,
      keyLocation: CONFIG.keyLocation,
      urlList: urls,
    });

    const options = {
      hostname: CONFIG.endpoint,
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
            count: urls.length,
          });
        } else {
          resolve({
            success: false,
            statusCode: res.statusCode,
            error: data || res.statusMessage,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({
        success: false,
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
  console.log('🚀 IndexNow Complete Site Submission');
  console.log('═══════════════════════════════════════════════════\n');
  
  // Initialize Supabase
  supabase = initSupabase();
  
  // Collect all URLs
  console.log('📋 Collecting URLs...\n');
  
  const staticPages = getStaticPages();
  console.log(`   ✅ Static pages: ${staticPages.length}`);
  
  const facilityUrls = await getFacilityUrls();
  const eventUrls = await getEventUrls();
  
  // Combine all URLs
  const allPaths = [
    ...staticPages,
    ...facilityUrls,
    ...eventUrls,
  ];
  
  const urls = buildUrls(allPaths);
  
  console.log('\n📊 URL Summary');
  console.log('─────────────────────────────────────────────────');
  console.log(`   Static pages:    ${staticPages.length}`);
  console.log(`   Facility pages:  ${facilityUrls.length}`);
  console.log(`   Event pages:     ${eventUrls.length}`);
  console.log(`   ─────────────────────────────────────────────`);
  console.log(`   TOTAL:           ${urls.length}`);
  
  console.log(`\n🔑 API Key: ${CONFIG.key}`);
  console.log(`🌐 Host: ${CONFIG.host}`);
  console.log(`📡 Endpoint: ${CONFIG.endpoint}\n`);
  
  // Split into batches
  const batches = batchUrls(urls, CONFIG.batchSize);
  console.log(`📦 Batches: ${batches.length} (max ${CONFIG.batchSize} URLs per batch)\n`);
  
  // Submit batches
  console.log('🔄 Submitting to IndexNow...');
  console.log('═══════════════════════════════════════════════════\n');
  
  const results = [];
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`📤 Batch ${i + 1}/${batches.length}: ${batch.length} URLs`);
    
    try {
      const result = await submitToIndexNow(batch);
      results.push(result);
      
      if (result.success) {
        console.log(`   ✅ Success (HTTP ${result.statusCode})`);
      } else {
        console.log(`   ❌ Failed (HTTP ${result.statusCode}): ${result.error}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.error || error.message}`);
      results.push(error);
    }
    
    // Delay between batches to avoid rate limiting
    if (i < batches.length - 1) {
      console.log(`   ⏳ Waiting ${CONFIG.batchDelay / 1000}s before next batch...\n`);
      await new Promise(resolve => setTimeout(resolve, CONFIG.batchDelay));
    }
  }
  
  // Summary
  console.log('\n\n📊 Final Summary');
  console.log('═══════════════════════════════════════════════════');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const totalSubmitted = results
    .filter(r => r.success)
    .reduce((sum, r) => sum + r.count, 0);
  
  console.log(`✅ Successful batches:  ${successful}/${batches.length}`);
  console.log(`❌ Failed batches:      ${failed}/${batches.length}`);
  console.log(`📄 Total URLs submitted: ${totalSubmitted}`);
  
  console.log('\n\n🎯 What happens next?');
  console.log('─────────────────────────────────────────────────');
  console.log('• Search engines (Bing, Yahoo, Yandex) have been notified');
  console.log('• Indexing typically happens within minutes to hours');
  console.log('• Pages will start appearing in search results soon');
  console.log('• Monitor progress in Bing Webmaster Tools');
  
  console.log('\n\n📈 Monitoring & Verification');
  console.log('─────────────────────────────────────────────────');
  console.log('Bing Webmaster Tools:');
  console.log('  https://www.bing.com/webmasters');
  console.log('  → Reports & Data → IndexNow');
  console.log('\nYandex Webmaster:');
  console.log('  https://webmaster.yandex.com/');
  console.log('\nTest indexing (wait 24-48 hours):');
  console.log('  site:www.disposalgrid.com');
  
  console.log('\n\n💡 Tips');
  console.log('─────────────────────────────────────────────────');
  console.log('• Run this script after major content updates');
  console.log('• Don\'t run more than once per day');
  console.log('• Check Bing Webmaster Tools for submission status');
  console.log('• Be patient - indexing can take 24-48 hours');
  
  console.log('\n✨ Done!\n');
  
  // Exit with appropriate code
  process.exit(failed > 0 ? 1 : 0);
}

// Run the script
main().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
