import { MetadataRoute } from 'next';
import prisma from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://disposalgrid.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Primary paths
  const sitemap: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/materials`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/search`, lastModified: new Date(), changeFrequency: 'always', priority: 0.8 },
  ];

  // Materials
  const materials = await prisma.material.findMany({ select: { slug: true, updatedAt: true } });
  for (const mat of materials) {
    sitemap.push({
      url: `${BASE_URL}/materials/${mat.slug}`,
      lastModified: mat.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  // States
  const stateMaterials = await prisma.stateMaterial.findMany({ 
     select: { state: true, material: { select: { slug: true } }, updatedAt: true } 
  });
  for (const st of stateMaterials) {
    sitemap.push({
      url: `${BASE_URL}/${st.state}/${st.material.slug}`,
      lastModified: st.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  }

  // Counties
  const countyMaterials = await prisma.countyMaterial.findMany({
     select: { county: true, state: true, material: { select: { slug: true } }, updatedAt: true }
  });
  for (const co of countyMaterials) {
    sitemap.push({
      url: `${BASE_URL}/${co.state}/${co.county}/${co.material.slug}`,
      lastModified: co.updatedAt,
      changeFrequency: 'daily',
      priority: 1.0, // Flagship pSEO pages
    });
  }

  // Facilities
  const facilities = await prisma.facility.findMany({ select: { epaHandlerId: true, updatedAt: true } });
  for (const fac of facilities) {
    sitemap.push({
      url: `${BASE_URL}/facilities/${fac.epaHandlerId}`,
      lastModified: fac.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  // Events
  const events = await prisma.hhwEvent.findMany({ select: { id: true, updatedAt: true } });
  for (const evt of events) {
    sitemap.push({
      url: `${BASE_URL}/events/${evt.id}`,
      lastModified: evt.updatedAt,
      changeFrequency: 'daily',
      priority: 0.8,
    });
  }

  return sitemap;
}
