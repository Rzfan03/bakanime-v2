"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AnimeListPage() {
  const [animeData, setAnimeData] = useState<{ title: string; slug: string }[]>([]);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://www.sankavollerei.com/anime/stream/list");
        const json = await res.json();
        setAnimeData(json.data || []);
        setTotal(json.total || 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = animeData.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            DAFTAR <span className="text-blue-500">ANIME</span>
          </h1>
          <p className="text-gray-400 mb-6">Total Koleksi: {total} Judul</p>
          
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Cari judul di daftar ini..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-4 top-3.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 mb-8 text-gray-500 text-[10px] font-bold uppercase overflow-x-auto scrollbar-hide pb-2">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split("").map((char) => (
            <button key={char} className="hover:text-blue-400 transition-colors px-1 shrink-0">
              {char}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 animate-pulse">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-14 bg-white/5 rounded-xl border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredData.length > 0 ? (
              filteredData.map((anime) => (
                <Link
                  key={anime.slug}
                  href={`/anime/${anime.slug}`}
                  className="group p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-blue-500/30 transition-all flex items-center gap-3"
                >
                  <div className="w-8 h-8 flex-shrink-0 bg-blue-600/20 rounded flex items-center justify-center text-blue-400 font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {anime.title.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white line-clamp-1 transition-colors">
                    {anime.title}
                  </span>
                </Link>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 italic">Judul anime tidak ditemukan...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}