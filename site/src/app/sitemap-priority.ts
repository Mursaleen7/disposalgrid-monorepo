import { MetadataRoute } from 'next';
import { supabase } from "@/lib/supabase";

/**
 * Priority sitemap — top cities with the most facilities.
 * Submit this one FIRST to Google/Bing before the full sitemap.
 * URL: /sitemap-priority.xml
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.disposalgrid.com';

// Top 20 US cities by population — highest crawl value
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
  { city: 'Fort Worth', state: 'TX' },
  { city: 'Columbus', state: 'OH' },
  { city: 'Charlotte', state: 'NC' },
  { city: 'Indianapolis', state: 'IN' },
  { city: 'San Francisco', state: 'CA' },
  { city: 'Seattle', state: 'WA' },
  { city: 'Denver', state: 'CO' },
  { city: 'Nashville', state: 'TN' },
  { city: 'Oklahoma City', state: 'OK' },
  { city: 'El Paso', state: 'TX' },
  { city: 'Washington', state: 'DC' },
  { city: 'Las Vegas', state: 'NV' },
  { city: 'Louisville', state: 'KY' },
  { city: 'Memphis', state: 'TN' },
  { city: 'Portland', state: 'OR' },
  { city: 'Baltimore', state: 'MD' },
  { city: 'Milwaukee', state: 'WI' },
  { city: 'Albuquerque', state: 'NM' },
];

export default async function sitemapPriority(): Promise<MetadataRoute.Sitemap> {
  const result: MetadataRoute.Sitemap = [
    // Core pages — highest priority
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'always', priority: 0.9 },
    { url: `${BASE_URL}/materials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/dispose-of/electronics`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/dispose-of/batteries`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/dispose-of/paint-solvents`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/dispose-of/motor-oil`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/dispose-of/mattresses`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/dispose-of/tires`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Fetch top 5 facilities from each top city
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
          result.push({
            url: `${BASE_URL}/facility/${fac.handler_id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9, // Higher priority than regular facilities
          });
        }
      }
    } catch {
      // Skip city on error
    }
  }

  return result;
}

export const revalidate = 86400;
