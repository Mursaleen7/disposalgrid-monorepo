import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BASE_URL = 'https://www.disposalgrid.com';
const INDEXNOW_API_KEY = '2fd1ad9e7c044fdaab90931cf2a6de09'; 
const INDEXNOW_HOST = 'api.indexnow.org';

const csvPath = '/Users/mursaleensakoskar/Downloads/disposalgrid.com_SubmittedUrls_4_28_2026-2.csv';

// Read existing CSV
let csvData = '';
try {
  csvData = fs.readFileSync(csvPath, 'utf8');
} catch (err) {
  console.error('Error reading CSV:', err);
  process.exit(1);
}

// Parse already submitted URLs
const submittedUrls = new Set();
const lines = csvData.trim().split('\n');
// Skip header
for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line) continue;
  const match = line.match(/^"([^"]+)"/);
  if (match) {
    submittedUrls.add(match[1]);
  }
}

// Generate URLs
async function generateUrls() {
  const urls = [];

  urls.push({ url: BASE_URL, priority: 1.0 });
  urls.push({ url: `${BASE_URL}/materials`, priority: 0.9 });
  urls.push({ url: `${BASE_URL}/search`, priority: 0.8 });
  urls.push({ url: `${BASE_URL}/events`, priority: 0.8 });
  urls.push({ url: `${BASE_URL}/business`, priority: 0.7 });

  const materials = [
    'electronics', 'paint-solvents', 'mattresses', 'batteries', 'motor-oil',
    'tires', 'prescription-drugs', 'propane-tanks', 'medical-sharps', 'appliances',
    'chemicals', 'fire-extinguishers'
  ];
  for (const slug of materials) {
    urls.push({ url: `${BASE_URL}/dispose-of/${slug}`, priority: 0.8 });
  }

  // Material/State/County pages
  try {
    const { data: countyData, error: countyError } = await supabase
      .from('facilities')
      .select('state, county')
      .not('county', 'is', null);

    if (countyData && !countyError) {
      const counts = new Map();
      for (const row of countyData) {
        const key = `${row.state}||${row.county}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }

      for (const [key, count] of Array.from(counts.entries())) {
        if (count < 2) continue;
        const [state, county] = key.split("||");
        const countySlug = county.toLowerCase().replace(/\s+/g, "-");
        
        for (const slug of materials) {
          urls.push({
            url: `${BASE_URL}/dispose-of/${slug}/${state.toLowerCase()}/${countySlug}`,
            priority: 0.8,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error fetching counties for IndexNow:', error);
  }

  // Facilities
  try {
    const pageSize = 1000;
    let page = 0;
    let hasMore = true;

    while (hasMore) {
      const { data, error } = await supabase
        .from('facilities')
        .select('handler_id')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error || !data || data.length === 0) {
        hasMore = false;
        break;
      }

      for (const fac of data) {
        urls.push({
          url: `${BASE_URL}/facility/${fac.handler_id}`,
          priority: 0.7,
        });
      }

      hasMore = data.length === pageSize;
      page++;
    }
  } catch (error) {
    console.error('Error fetching facilities for IndexNow:', error);
  }

  // Events
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('event_id')
      .limit(500);

    if (events && !error) {
      for (const evt of events) {
        urls.push({
          url: `${BASE_URL}/events/${evt.event_id}`,
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching events for IndexNow:', error);
  }

  return urls;
}

(async () => {
  const allUrls = await generateUrls();
  
  // Filter out already submitted
  const unsubmittedUrls = allUrls
    .filter(item => !submittedUrls.has(item.url))
    .sort((a, b) => b.priority - a.priority);

  if (unsubmittedUrls.length === 0) {
    console.log('No new URLs to index.');
    process.exit(0);
  }

  // Limit to 74 as requested
  const batch = unsubmittedUrls.slice(0, 74);
  const urlList = batch.map(item => item.url);

  console.log('Submitting the following 74 URLs to IndexNow:');
  urlList.forEach(url => console.log(url));

  const requestBody = {
    host: 'www.disposalgrid.com',
    key: INDEXNOW_API_KEY,
    keyLocation: `${BASE_URL}/${INDEXNOW_API_KEY}.txt`,
    urlList: urlList
  };

  const response = await fetch(`https://${INDEXNOW_HOST}/indexnow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (response.ok || response.status === 202) {
    console.log('\n✅ Successfully submitted to IndexNow!');
    
    // Append to CSV
    const now = new Date();
    // Example format: "04/27/2026T22:21:00-07:00"
    const timestampStr = '04/27/2026T23:30:00-07:00'; 
    
    let appendStr = '';
    for (const url of urlList) {
      appendStr += `\n"${url}","${timestampStr}"`;
    }
    
    fs.appendFileSync(csvPath, appendStr);
    
    // ALSO update the supabase db if exists
    try {
      const allToInsert = [];
      for (const item of Array.from(submittedUrls)) {
        allToInsert.push({ url: item, priority: 1.0 }); // Dummy priority
      }
      for (const item of batch) {
        allToInsert.push({ url: item.url, priority: item.priority });
      }
      
      const chunkSize = 1000;
      for (let i = 0; i < allToInsert.length; i += chunkSize) {
        const chunk = allToInsert.slice(i, i + chunkSize);
        const { error } = await supabase
          .from('indexnow_logs')
          .upsert(chunk, { onConflict: 'url', ignoreDuplicates: true });
        
        if (error) {
            // Ignore if table doesn't exist
        }
      }
    } catch (e) {
      // ignore
    }

  } else {
    const text = await response.text();
    console.error(`IndexNow API Error: ${response.status}`, text);
  }
})();
