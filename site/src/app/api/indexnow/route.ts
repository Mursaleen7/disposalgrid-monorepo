import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const INDEXNOW_KEY = 'b5d2ecf64ac040709dd57a05fcbb2bd2';
const BASE_URL = 'https://www.disposalgrid.com';
const KEY_LOCATION = `${BASE_URL}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// Static pages to always include
const STATIC_PAGES = [
  `${BASE_URL}/`,
  `${BASE_URL}/search`,
  `${BASE_URL}/materials`,
  `${BASE_URL}/events`,
  `${BASE_URL}/business`,
  `${BASE_URL}/dispose-of/electronics`,
  `${BASE_URL}/dispose-of/paint-solvents`,
  `${BASE_URL}/dispose-of/mattresses`,
  `${BASE_URL}/dispose-of/batteries`,
  `${BASE_URL}/dispose-of/motor-oil`,
  `${BASE_URL}/dispose-of/tires`,
  `${BASE_URL}/dispose-of/medications`,
  `${BASE_URL}/dispose-of/propane-tanks`,
  `${BASE_URL}/dispose-of/sharps`,
  `${BASE_URL}/dispose-of/appliances`,
];

async function submitToIndexNow(urls: string[]) {
  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'www.disposalgrid.com',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  });
  return response.status;
}

export async function GET() {
  try {
    // Fetch all facility handler_ids from Supabase
    const allFacilityUrls: string[] = [];
    let page = 0;
    const pageSize = 1000;

    while (true) {
      const { data, error } = await supabase
        .from('facilities')
        .select('handler_id')
        .range(page * pageSize, (page + 1) * pageSize - 1);

      if (error || !data || data.length === 0) break;

      for (const fac of data) {
        allFacilityUrls.push(`${BASE_URL}/facility/${fac.handler_id}`);
      }

      if (data.length < pageSize) break;
      page++;
    }

    const allUrls = [...STATIC_PAGES, ...allFacilityUrls];

    // IndexNow allows max 10,000 URLs per request — batch if needed
    const results: { batch: number; status: number; count: number }[] = [];
    const batchSize = 10000;

    for (let i = 0; i < allUrls.length; i += batchSize) {
      const batch = allUrls.slice(i, i + batchSize);
      const status = await submitToIndexNow(batch);
      results.push({ batch: Math.floor(i / batchSize) + 1, status, count: batch.length });
    }

    const totalSubmitted = allUrls.length;
    const allSucceeded = results.every(r => r.status === 200 || r.status === 202);

    return NextResponse.json({
      success: allSucceeded,
      totalSubmitted,
      facilityPages: allFacilityUrls.length,
      staticPages: STATIC_PAGES.length,
      batches: results,
    });
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
