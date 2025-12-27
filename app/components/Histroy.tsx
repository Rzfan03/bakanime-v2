"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type AnimeHistoryPayload = {
  slug: string;
  title: string;
  poster?: string;
  type?: string;
  episodeTitle?: string;
  episodeSlug?: string;
  updatedAt?: number;
};

const STORAGE_KEY = "watch-history";
const MAX_HISTORY = 20;

export default function HistoryTracker({ anime }: { anime?: AnimeHistoryPayload }) {
  const [history, setHistory] = useState<AnimeHistoryPayload[]>([]);

  useEffect(() => {
    // 1. Logika Menyimpan (Hanya jalan jika props 'anime' dikirim)
    if (anime && anime.slug) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const localHistory = raw ? JSON.parse(raw) : [];

        const newEntry = {
          ...anime,
          updatedAt: Date.now(),
        };

        const filtered = localHistory.filter((item: any) => item.slug !== anime.slug);
        const finalHistory = [newEntry, ...filtered].slice(0, MAX_HISTORY);

        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalHistory));
      } catch (error) {
        console.error("HistoryTracker Save Error:", error);
      }
    }

    // 2. Logika Mengambil Data (Selalu jalan untuk update UI)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        setHistory([]);
      }
    }
  }, [anime]);

  // Jika dipanggil dengan props 'anime' (di page detail), jangan munculkan UI (return null)
  if (anime) return null;

  // Jika dipanggil tanpa props (di Home), munculkan UI List
  if (history.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-bold tracking-tight">Lanjutkan Menonton</h2>
        <Link href="/history" className="text-xs font-bold text-blue-500 uppercase tracking-widest hover:underline">
          Lihat Semua
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
        {history.map((item) => (
          <Link
            key={item.slug}
            href={`/anime/${item.slug}`}
            className="flex-shrink-0 w-36 sm:w-44 snap-start group"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-neutral-900 border border-white/5 group-hover:border-blue-500/50 transition-colors">
              {item.poster && (
                <Image
                  src={item.poster}
                  fill
                  alt={item.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-[10px] font-bold text-blue-400 uppercase truncate">
                  {item.episodeTitle || "Detail"}
                </p>
              </div>
            </div>
            <h3 className="mt-2 text-[13px] font-bold line-clamp-1 group-hover:text-blue-400 transition-colors">
              {item.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}