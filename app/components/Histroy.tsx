"use client";

import { useEffect } from "react";

type AnimeHistoryPayload = {
  slug: string;
  title: string;
  poster?: string;
  type?: string;
  episodeTitle?: string;
  episodeSlug?: string;
};

const STORAGE_KEY = "watch-history";
const MAX_HISTORY = 20;

export default function HistoryTracker({ anime }: { anime: AnimeHistoryPayload }) {
  useEffect(() => {
    if (!anime || !anime.slug) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const history = raw ? JSON.parse(raw) : [];

      const newEntry = {
        slug: anime.slug,
        title: anime.title,
        poster: anime.poster || "",
        type: anime.type || "Anime",
        episodeTitle: anime.episodeTitle || null,
        episodeSlug: anime.episodeSlug || null,
        updatedAt: Date.now(),
      };

      const filtered = history.filter((item: any) => item.slug !== anime.slug);
      const finalHistory = [newEntry, ...filtered].slice(0, MAX_HISTORY);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(finalHistory));
    } catch (error) {
      console.error("HistoryTracker error:", error);
    }
  }, [anime]);

  return null;
}
