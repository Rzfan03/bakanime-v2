import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://your-domain.com";

  const staticRoutes = [
    "",
    "/popular",
    "/movie",
    "/anime-list",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...staticRoutes];
}