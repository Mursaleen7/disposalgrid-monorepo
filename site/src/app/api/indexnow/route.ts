import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.disposalgrid.com';
const INDEXNOW_API_KEY = '2fd1ad9e7c044fdaab90931cf2a6de09'; // Ensure this matches public/2fd1ad9e7c044fdaab90931cf2a6de09.txt
const INDEXNOW_HOST = 'api.indexnow.org';

// Helper to generate all URLs with priority
async function generateUrls() {
  const urls: { url: string; priority: number }[] = [];

  // Primary static pages
  urls.push({ url: BASE_URL, priority: 1.0 });
  urls.push({ url: `${BASE_URL}/materials`, priority: 0.9 });
  urls.push({ url: `${BASE_URL}/search`, priority: 0.8 });
  urls.push({ url: `${BASE_URL}/events`, priority: 0.8 });
  urls.push({ url: `${BASE_URL}/business`, priority: 0.7 });

  // Material pages
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
      const counts = new Map<string, number>();
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

export async function GET() {
  try {
    // 1. Get all potential URLs
    const allUrls = await generateUrls();
    
    // 2. Fetch already submitted URLs from Supabase
    const { data: loggedData, error: logError } = await supabase
      .from('indexnow_logs')
      .select('url');

    // If there's an error, it might be because the table doesn't exist yet
    if (logError) {
      console.error('Error fetching indexnow_logs (make sure the SQL migration was run):', logError);
      return NextResponse.json({ error: 'Failed to fetch indexed logs', details: logError }, { status: 500 });
    }

    const submittedUrls = new Set((loggedData || []).map(row => row.url));

    // 3. Filter and sort
    const unsubmittedUrls = allUrls
      .filter(item => !submittedUrls.has(item.url))
      .sort((a, b) => b.priority - a.priority);

    if (unsubmittedUrls.length === 0) {
      return NextResponse.json({ message: 'No new URLs to index' }, { status: 200 });
    }

    // 4. Batch to max 10000 URLs (IndexNow limit)
    const batch = unsubmittedUrls.slice(0, 10000);
    const urlList = batch.map(item => item.url);

    // 5. Submit to IndexNow
    const host = new URL(BASE_URL).host;
    const requestBody = {
      host: host,
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
      // 6. Log success
      const recordsToInsert = batch.map(item => ({
        url: item.url,
        priority: item.priority
      }));

      // Bulk insert in chunks of 1000 to avoid large payload errors
      const chunkSize = 1000;
      for (let i = 0; i < recordsToInsert.length; i += chunkSize) {
        const chunk = recordsToInsert.slice(i, i + chunkSize);
        const { error: insertError } = await supabase
          .from('indexnow_logs')
          .insert(chunk);
          
        if (insertError) {
          console.error('Error inserting index logs:', insertError);
        }
      }

      return NextResponse.json({ 
        message: 'Successfully submitted URLs to IndexNow', 
        submittedCount: urlList.length,
        samples: urlList.slice(0, 5) // Return a few examples for verification
      }, { status: 200 });
    } else {
      const errorText = await response.text();
      console.error('IndexNow API Error:', response.status, errorText);
      return NextResponse.json({ error: 'Failed to submit to IndexNow', details: errorText }, { status: response.status });
    }

  } catch (error: any) {
    console.error('IndexNow automation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
