import { animeProps } from "@/app/types/animeProps";
import Image from "next/image";
import Link from "next/link";

export default async function watchAnime({ params }: animeProps) {
  const { slug } = await params;
  const res = await fetch(`https://www.sankavollerei.com/anime/stream/anime/${slug}`);
  const { data: anime } = await res.json();

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background Hero Blur */}
      <div className="absolute inset-0 -z-50">
        <Image
          src={anime.poster}
          fill
          alt=""
          className="object-cover opacity-30 blur-2xl saturate-0"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 z-10">
        {/* Poster Utama */}
        <div className="flex-shrink-0 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <Image
            src={anime.poster}
            height={400}
            width={280}
            alt={anime.title}
            className="relative rounded-xl shadow-2xl object-cover border border-white/10"
            unoptimized
          />
        </div>

        {/* Info Detail */}
        <div className="flex flex-col text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {anime.title}
          </h1>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
            {anime.genres?.slice(0, 3).map((genre: string) => (
              <span
                key={genre}
                className="text-xs font-medium px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="bg-black/40 backdrop-blur-sm border border-white/5 p-6 rounded-2xl mb-8">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-2">
              Sinopsis
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base line-clamp-6">
              {anime.synopsis}
            </p>
          </div>

          <Link
            href={`/episode/${slug}`}
            className="inline-flex items-center justify-center bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
          >
            Tonton Sekarang!
          </Link>
        </div>
      </div>
    </main>
  );
}