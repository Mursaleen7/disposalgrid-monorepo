import { MetadataRoute } from 'next';
import { supabase } from "@/lib/supabase";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.disposalgrid.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Primary static pages
  const result: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/materials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'always', priority: 0.8 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Material pages
  const materials = [
    'electronics', 'paint-solvents', 'mattresses', 'batteries', 'motor-oil',
    'tires', 'prescription-drugs', 'propane-tanks', 'medical-sharps', 'appliances',
    'chemicals', 'fire-extinguishers'
  ];
  for (const slug of materials) {
    result.push({
      url: `${BASE_URL}/dispose-of/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
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
          result.push({
            url: `${BASE_URL}/dispose-of/${slug}/${state.toLowerCase()}/${countySlug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error fetching counties for sitemap:', error);
  }

  // Fetch ALL facilities using pagination
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
        result.push({
          url: `${BASE_URL}/facility/${fac.handler_id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }

      hasMore = data.length === pageSize;
      page++;
    }
  } catch (error) {
    console.error('Error fetching facilities for sitemap:', error);
  }

  // Fetch events
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('event_id')
      .limit(500);

    if (events && !error) {
      for (const evt of events) {
        result.push({
          url: `${BASE_URL}/events/${evt.event_id}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching events for sitemap:', error);
  }

  return result;
}

export const revalidate = 86400; // Revalidate once per day
