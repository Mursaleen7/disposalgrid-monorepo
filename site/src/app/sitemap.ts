import { MetadataRoute } from 'next';
import { supabase } from "@/lib/supabase";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://disposalgrid.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Primary paths
  const sitemap: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/materials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'always', priority: 0.8 },
    { url: `${BASE_URL}/events`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/business`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  // Materials - hardcoded since we have a fixed set
  const materials = [
    'electronics', 'paint-solvents', 'mattresses', 'batteries', 'motor-oil', 'tires',
    'medications', 'propane-tanks', 'sharps', 'appliances'
  ];
  
  for (const slug of materials) {
    sitemap.push({
      url: `${BASE_URL}/dispose-of/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // Facilities from Supabase
  const { data: facilities } = await supabase
    .from('facilities')
    .select('handler_id')
    .limit(1000); // Limit to avoid huge sitemap

  if (facilities) {
    for (const fac of facilities) {
      sitemap.push({
        url: `${BASE_URL}/facility/${fac.handler_id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  // Events from Supabase
  const { data: events } = await supabase
    .from('events')
    .select('event_id')
    .limit(500);

  if (events) {
    for (const evt of events) {
      sitemap.push({
        url: `${BASE_URL}/events/${evt.event_id}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      });
    }
  }

  return sitemap;
}
