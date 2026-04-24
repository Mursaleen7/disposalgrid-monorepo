import { MetadataRoute } from 'next';
import { supabase } from "@/lib/supabase";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.disposalgrid.com';

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

  // Try to fetch facilities, but don't fail if it doesn't work
  try {
    const { data: facilities, error } = await supabase
      .from('facilities')
      .select('handler_id')
      .limit(500); // Reduced limit for faster response

    if (facilities && !error) {
      for (const fac of facilities) {
        sitemap.push({
          url: `${BASE_URL}/facility/${fac.handler_id}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching facilities for sitemap:', error);
    // Continue without facilities
  }

  // Try to fetch events, but don't fail if it doesn't work
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('event_id')
      .limit(100); // Reduced limit

    if (events && !error) {
      for (const evt of events) {
        sitemap.push({
          url: `${BASE_URL}/events/${evt.event_id}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        });
      }
    }
  } catch (error) {
    console.error('Error fetching events for sitemap:', error);
    // Continue without events
  }

  return sitemap;
}

export const revalidate = 86400; // Revalidate once per day
