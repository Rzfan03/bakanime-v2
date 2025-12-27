import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bakaanime.vercel.app'

  try {
    const res = await fetch('https://www.sankavollerei.com/anime/stream/anime-list', {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
      },
      next: { revalidate: 3600 }
    })

    if (!res.ok) throw new Error()

    const contentType = res.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) throw new Error()

    const { data: animeList } = await res.json()

    const animeEntries = (animeList || []).map((anime: any) => ({
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
  } catch (error) {
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
    ]
  }
}