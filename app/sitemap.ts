import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bakanime-v2.vercel.app'

  // Ambil data anime dari API kamu
  const res = await fetch('https://www.sankavollerei.com/anime/stream/anime-list')
  const { data: animeList } = await res.json()

  // Map data anime menjadi format sitemap
  const animeEntries = animeList.map((anime: any) => ({
    url: `${baseUrl}/anime/${anime.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/history`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    ...animeEntries,
  ]
}