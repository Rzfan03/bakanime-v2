import Link from "next/link";
import Image from "next/image";
import { getAnimeList, getPopularAnime } from "./lib/api";
import { animeProps } from "./types/animeProps";
import HistoryList from "@/app/components/Histroy";
import Ads from "./components/Ads";

export default async function Home() {
  const [res, res2] = await Promise.all([
    getAnimeList(1),
    getPopularAnime()
  ]);

  return (
    <main className="min-h-screen bg-[#050505] pt-24 pb-20 px-6 max-w-7xl mx-auto text-white">
      <Ads/>
      <HistoryList />

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Paling Populer</h2>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
          {res2.data.map((anime: animeProps) => (
            <Link 
              key={anime.slug} 
              href={`/anime/${anime.slug}`}
              className="flex-shrink-0 w-40 sm:w-48 snap-start group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/10">
                <Image
                  src={anime.poster}
                  fill
                  alt={anime.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-sm font-bold line-clamp-2 leading-snug">
                    {anime.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Rilis Terbaru</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {res.data.map((anime: animeProps) => (
            <div key={anime.slug} className="group">
              <Link href={`/anime/${anime.slug}`} className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/5 transition-colors">
                <Image 
                  src={anime.poster} 
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={anime.title} 
                  unoptimized
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-blue-600 text-white text-[10px] px-2 py-1 font-bold rounded shadow-lg">
                    EP {anime.episode}
                  </div>
                </div>
              </Link>
              
              <div className="mt-3">
                <Link href={`/anime/${anime.slug}`} className="text-[15px] font-bold text-gray-100 hover:text-blue-500 line-clamp-2 transition-colors leading-tight">
                  {anime.title}
                </Link>
                <div className="flex items-center gap-2 mt-2">
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sub Indo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}