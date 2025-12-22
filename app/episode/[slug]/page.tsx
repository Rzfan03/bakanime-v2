import { animeProps } from "@/app/types/animeProps";
import Link from "next/link";

export default async function WatchAnime({ params }: animeProps) {
  const { slug } = await params;

  const resEpisode = await fetch(`https://www.sankavollerei.com/anime/stream/episode/${slug}`);
  
  if (!resEpisode.ok) throw new Error("Gagal mengambil data episode");
  
  const datase = await resEpisode.json();
  const episode = datase.data;

  const animeSlug = slug.split("-episode-")[0];
  
  const resAnime = await fetch(`https://www.sankavollerei.com/anime/stream/anime/${animeSlug}`).catch(() => null);
  
  let animeDetails = null;
  if (resAnime && resAnime.ok) {
    const datas = await resAnime.json();
    animeDetails = datas.data;
  }

  const streamUrl = episode.stream_links[1]?.url || episode.stream_links[0]?.url;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
          <iframe
            key={slug}
            src={streamUrl}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-xl font-bold">{episode.title}</h1>
          
          <div className="flex items-center gap-2">
            {episode.prev_slug && (
              <Link 
                href={`/episode/${episode.prev_slug}`}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-sm transition-all"
              >
                ← Prev
              </Link>
            )}

            {episode.next_slug && (
              <Link 
                href={`/episode/${episode.next_slug}`}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-bold transition-all shadow-lg shadow-blue-500/20"
              >
                Next →
              </Link>
            )}
          </div>
        </div>

        <hr className="border-white/5" />

        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-400">Semua Episode</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
            {animeDetails?.episodes ? (
              animeDetails.episodes.map((ep: any) => (
                <Link
                  key={ep.episode}
                  href={`/episode/${ep.eps_slug}`}
                  className={`py-2 px-3 text-center text-xs font-bold rounded border transition-all ${
                    ep.eps_slug === slug 
                      ? "bg-blue-600 border-blue-400 text-white" 
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {ep.eps_title}
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">Daftar episode tidak tersedia.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}2