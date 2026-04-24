import { NextResponse } from 'next/server';
import { supabase } from "@/lib/supabase";

const BASE_URL = 'https://www.disposalgrid.com';

const TOP_CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
  'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
  'Austin', 'Jacksonville', 'Columbus', 'Charlotte', 'Indianapolis',
  'San Francisco', 'Seattle', 'Denver', 'Nashville', 'Las Vegas',
  'Portland', 'Baltimore', 'Milwaukee', 'Memphis', 'Louisville',
  'Oklahoma City', 'El Paso', 'Washington', 'Albuquerque', 'Atlanta',
];

function urlEntry(loc: string, priority: string, changefreq: string) {
  const now = new Date().toISOString();
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

export async function GET() {
  const urls: string[] = [];

  // Core static pages
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

  try {
    // Single query — fetch top 3 facilities per city using OR filter
    const cityFilter = TOP_CITIES.map(c => `city.ilike.${c}`).join(',');

    const { data } = await supabase
      .from('facilities')
      .select('handler_id, city')
      .or(cityFilter)
      .limit(150);

    if (data) {
      // Deduplicate: max 5 per city
      const cityCount: Record<string, number> = {};
      for (const fac of data) {
        const key = fac.city?.toLowerCase() ?? '';
        cityCount[key] = (cityCount[key] ?? 0) + 1;
        if (cityCount[key] <= 5) {
          urls.push(urlEntry(`${BASE_URL}/facility/${fac.handler_id}`, '0.9', 'monthly'));
        }
      }
    }
  } catch {
    // Return static pages only if Supabase fails
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
