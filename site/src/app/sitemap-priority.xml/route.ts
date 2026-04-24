import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

const BASE_URL = 'https://www.disposalgrid.com';

const TOP_CITIES = [
  { city: 'New York', state: 'NY' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'Chicago', state: 'IL' },
  { city: 'Houston', state: 'TX' },
  { city: 'Phoenix', state: 'AZ' },
  { city: 'Philadelphia', state: 'PA' },
  { city: 'San Antonio', state: 'TX' },
  { city: 'San Diego', state: 'CA' },
  { city: 'Dallas', state: 'TX' },
  { city: 'San Jose', state: 'CA' },
  { city: 'Austin', state: 'TX' },
  { city: 'Jacksonville', state: 'FL' },
  { city: 'Columbus', state: 'OH' },
  { city: 'Charlotte', state: 'NC' },
  { city: 'Indianapolis', state: 'IN' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Denver', state: 'CO' },
  { city: 'Nashville', state: 'TN' },
  { city: 'Las Vegas', state: 'NV' },
  { city: 'Portland', state: 'OR' },
  { city: 'Baltimore', state: 'MD' },
  { city: 'Milwaukee', state: 'WI' },
  { city: 'Memphis', state: 'TN' },
  { city: 'Louisville', state: 'KY' },
  { city: 'Oklahoma City', state: 'OK' },
  { city: 'El Paso', state: 'TX' },
  { city: 'Washington', state: 'DC' },
  { city: 'Albuquerque', state: 'NM' },
  { city: 'Atlanta', state: 'GA' },
];

function urlEntry(loc: string, priority: string, changefreq: string) {
  const now = new Date().toISOString();
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const urls: string[] = [];

  // Core pages
  urls.push(urlEntry(`${BASE_URL}/`, '1.0', 'daily'));
  urls.push(urlEntry(`${BASE_URL}/search`, '0.9', 'always'));
  urls.push(urlEntry(`${BASE_URL}/materials`, '0.9', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/events`, '0.8', 'daily'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/electronics`, '0.9', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/batteries`, '0.9', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/paint-solvents`, '0.9', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/motor-oil`, '0.9', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/mattresses`, '0.8', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/tires`, '0.8', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/medications`, '0.8', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/propane-tanks`, '0.8', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/sharps`, '0.8', 'weekly'));
  urls.push(urlEntry(`${BASE_URL}/dispose-of/appliances`, '0.8', 'weekly'));

  // Top 5 facilities from each major city
  for (const { city, state } of TOP_CITIES) {
    try {
      const { data } = await supabase
        .from('facilities')
        .select('handler_id')
        .ilike('city', city)
        .eq('state', state)
        .limit(5);

      if (data) {
        for (const fac of data) {
          urls.push(urlEntry(`${BASE_URL}/facility/${fac.handler_id}`, '0.9', 'monthly'));
        }
      }
    } catch {
      // skip on error
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
