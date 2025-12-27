"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";

type HistoryItem = {
  slug: string;
  title: string;
  poster?: string;
  type?: string;
  episodeTitle?: string;
  episodeSlug?: string;
  updatedAt?: number;
};

export default function HistoryPage() {
  const { isLoaded, isSignedIn } = useUser();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (isSignedIn) {
      const stored = localStorage.getItem("watch-history");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const sorted = parsed.sort((a: HistoryItem, b: HistoryItem) => 
            (b.updatedAt || 0) - (a.updatedAt || 0)
          );
          setHistory(sorted);
        } catch {
          setHistory([]);
        }
      }
    }
  }, [isSignedIn]);

  if (!isLoaded) return <div className="min-h-screen bg-[#050505]" />;

  if (!isSignedIn) {
    return (
      <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="text-center space-y-6 p-8 border border-white/10 rounded-3xl bg-white/5 max-w-md">
          <div className="text-5xl">🔒</div>
          <h2 className="text-2xl font-bold text-white">Akses Terbatas</h2>
          <p className="text-gray-400">
            Kamu harus masuk ke akunmu untuk melihat riwayat tontonan dan melanjutkan petualanganmu.
          </p>
          <SignInButton mode="modal">
            <button className="w-full py-3 px-6 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
              Masuk Sekarang
            </button>
          </SignInButton>
        </div>
      </main>
    );
  }

  const clearHistory = () => {
    if (confirm("Hapus semua riwayat?")) {
      localStorage.removeItem("watch-history");
      setHistory([]);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Riwayat
            </h1>
            <p className="text-gray-500 text-sm mt-1">Aktivitas tontonan terakhirmu</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs uppercase font-bold tracking-widest text-red-400 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all"
            >
              Hapus Semua
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 italic">Belum ada anime yang ditonton.</p>
            <Link href="/" className="text-blue-400 text-sm mt-4 inline-block hover:underline">
              Cari anime seru di sini →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {history.map((anime) => (
              <Link key={anime.slug} href={`/anime/${anime.slug}`} className="group relative">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-xl transition-all duration-300 group-hover:border-white/30 group-hover:shadow-white/5">
                  {anime.poster && (
                    <Image
                      src={anime.poster}
                      alt={anime.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="mt-3 space-y-1">
                  <h2 className="text-sm font-bold line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {anime.title}
                  </h2>
                  {anime.episodeTitle && (
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                        {anime.episodeTitle}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}