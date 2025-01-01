import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://yes-or-no.org'
  
  const sitemapEntries = [];

  sitemapEntries.push({
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
  });
  
  return sitemapEntries;
}
