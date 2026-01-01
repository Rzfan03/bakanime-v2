"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PopularPage() {
  const [popularAnime, setPopularAnime] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await fetch("https://www.sankavollerei.com/anime/stream/popular");
        const json = await res.json();
        setPopularAnime(json.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-10 px-5 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 text-white uppercase tracking-wider">
          Popular <span className="text-blue-500">Anime</span>
        </h2>
        <p className="text-gray-400 text-xs mt-2 ml-5">Paling banyak dicari minggu ini</p>
      </header>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {popularAnime.map((anime, index) => (
            <div 
              key={anime.slug} 
              className="flex flex-col bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image 
                  src={anime.poster} 
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={anime.title} 
                  unoptimized
                />
                <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] px-2 py-1 font-bold rounded-br-lg shadow-lg">
                  RANK #{index + 1}
                </div>
                <div className="absolute bottom-0 left-0 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-1 font-bold border-t border-r border-white/10">
                  {anime.type || "TV"}
                </div>
              </div>

              <div className="p-3 flex flex-col justify-between flex-grow">
                <h3 className="text-sm font-bold line-clamp-2 mb-4 text-gray-200 group-hover:text-white transition-colors h-10">
                  {anime.title}
                </h3>
                <Link 
                  href={`/anime/${anime.slug}`} 
                  className="text-center bg-white/10 hover:bg-blue-600 text-white text-xs py-2 rounded font-semibold transition-all duration-300 active:scale-95"
                >
                  Tonton
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && popularAnime.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Belum ada data populer tersedia.
        </div>
      )}
    </main>
  );
}