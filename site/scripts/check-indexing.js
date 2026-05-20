#!/usr/bin/env node

/**
 * IndexNow Indexing Checker
 * 
 * Checks if your pages are indexed in search engines.
 * Uses the site: operator to verify indexing status.
 * 
 * Usage: node scripts/check-indexing.js
 */

const https = require('https');

// Configuration
const CONFIG = {
  host: 'www.disposalgrid.com',
  
  // Sample pages to check
  samplePages: [
    '/',
    '/search',
    '/materials',
    '/events',
    '/business',
    '/materials/batteries',
    '/materials/electronics',
    '/california',
    '/texas',
    '/california/los-angeles',
  ],
};

/**
 * Display instructions for manual checking
 */
function displayInstructions() {
  console.log('🔍 IndexNow Indexing Checker');
  console.log('═══════════════════════════════════════════════════\n');
  
  console.log('📋 How to Check Your Indexing Status\n');
  
  console.log('1️⃣  Check Total Indexed Pages');
  console.log('─────────────────────────────────────────────────');
  console.log('Search for: site:www.disposalgrid.com\n');
  console.log('In these search engines:');
  console.log('  • Bing:       https://www.bing.com/search?q=site:www.disposalgrid.com');
  console.log('  • Yahoo:      https://search.yahoo.com/search?p=site:www.disposalgrid.com');
  console.log('  • Yandex:     https://yandex.com/search/?text=site:www.disposalgrid.com');
  console.log('  • DuckDuckGo: https://duckduckgo.com/?q=site:www.disposalgrid.com\n');
  
  console.log('2️⃣  Check Specific Pages');
  console.log('─────────────────────────────────────────────────');
  console.log('Search for specific URLs to verify they\'re indexed:\n');
  
  CONFIG.samplePages.forEach(page => {
    const url = `https://${CONFIG.host}${page}`;
    console.log(`  ${url}`);
  });
  
  console.log('\n3️⃣  Check Bing Webmaster Tools');
  console.log('─────────────────────────────────────────────────');
  console.log('For detailed indexing statistics:');
  console.log('  1. Go to: https://www.bing.com/webmasters');
  console.log('  2. Select your site: disposalgrid.com');
  console.log('  3. Check these sections:');
  console.log('     • Reports & Data → IndexNow (submission history)');
  console.log('     • Reports & Data → Page Traffic (indexed pages)');
  console.log('     • URL Inspection (check specific URLs)\n');
  
  console.log('4️⃣  Check Yandex Webmaster');
  console.log('─────────────────────────────────────────────────');
  console.log('For Yandex-specific data:');
  console.log('  1. Go to: https://webmaster.yandex.com/');
  console.log('  2. Select your site');
  console.log('  3. Check indexing status\n');
  
  console.log('📊 What to Look For');
  console.log('─────────────────────────────────────────────────');
  console.log('✅ Good Signs:');
  console.log('  • Pages appear in site: search results');
  console.log('  • Increasing number of indexed pages over time');
  console.log('  • Recent crawl dates in Webmaster Tools');
  console.log('  • No errors in Webmaster Tools\n');
  console.log('⚠️  Warning Signs:');
  console.log('  • No pages found in site: search');
  console.log('  • Decreasing number of indexed pages');
  console.log('  • Crawl errors in Webmaster Tools');
  console.log('  • Old crawl dates (weeks/months old)\n');
  
  console.log('⏱️  Expected Timeline');
  console.log('─────────────────────────────────────────────────');
  console.log('After IndexNow submission:');
  console.log('  • 1-6 hours:   Crawling begins');
  console.log('  • 24-48 hours: Pages appear in search');
  console.log('  • 1 week:      Full indexing complete');
  console.log('  • 2-4 weeks:   Maximum search visibility\n');
  
  console.log('💡 Tips');
  console.log('─────────────────────────────────────────────────');
  console.log('• Check daily for the first week');
  console.log('• Be patient - indexing takes time');
  console.log('• Focus on Bing first (fastest IndexNow partner)');
  console.log('• Use Webmaster Tools for detailed insights');
  console.log('• Re-submit if no results after 1 week\n');
  
  console.log('🔄 Re-submit Pages');
  console.log('─────────────────────────────────────────────────');
  console.log('If pages aren\'t indexed after 1 week:');
  console.log('  cd site');
  console.log('  node scripts/submit-indexnow.js\n');
  
  console.log('📈 Quick Check Commands');
  console.log('─────────────────────────────────────────────────');
  console.log('Copy and paste these into your browser:\n');
  
  console.log('Check homepage:');
  console.log(`  https://www.bing.com/search?q=site:${CONFIG.host}/\n`);
  
  console.log('Check search page:');
  console.log(`  https://www.bing.com/search?q=site:${CONFIG.host}/search\n`);
  
  console.log('Check materials:');
  console.log(`  https://www.bing.com/search?q=site:${CONFIG.host}/materials\n`);
  
  console.log('Check California:');
  console.log(`  https://www.bing.com/search?q=site:${CONFIG.host}/california\n`);
  
  console.log('✨ Done!\n');
}

// Run the checker
displayInstructions();
