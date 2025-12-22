import Link from "next/link";
import Image from "next/image";
import { getAnimeList, getPopularAnime } from "./lib/api";
import { animeProps } from "./types/animeProps";

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;

  const [res, res2] = await Promise.all([
    getAnimeList(currentPage),
    getPopularAnime()
  ]);

  const totalPages = res.max_page || 10; 
  
  const getPageNumbers = () => {
    const pages = [];
    const range = 2;

    for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <main className="min-h-screen pt-20 pb-10 px-5 max-w-7xl mx-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">
          Popular Anime
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {res2.data.map((anime: animeProps) => (
            <div key={anime.slug} className="flex-shrink-0 w-40 group">
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={anime.poster}
                  height={225}
                  width={160}
                  alt={anime.title}
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  unoptimized
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-semibold line-clamp-2 h-10">{anime.title}</h3>
                <Link 
                  href={`/anime/${anime.slug}`}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  Tonton Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-blue-500 pl-4">
          Anime List
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {res.data.map((anime: animeProps) => (
            <div key={anime.slug} className="flex flex-col bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors">
              <div className="relative aspect-[3/4]">
                <Image 
                  src={anime.poster} 
                  fill
                  className="object-cover" 
                  alt={anime.title} 
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 bg-blue-600 text-white text-[10px] px-2 py-1 font-bold">
                  EP {anime.episode}
                </div>
              </div>
              <div className="p-3 flex flex-col justify-between flex-grow">
                <h3 className="text-sm font-bold line-clamp-2 mb-2 h-10">{anime.title}</h3>
                <Link 
                  href={`/anime/${anime.slug}`} 
                  className="text-center bg-white/10 hover:bg-blue-600 text-xs py-2 rounded transition-colors"
                >
                  Tonton
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/?page=${currentPage - 1}`}
              className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors"
            >
              PREV
            </Link>
          )}

          {currentPage > 3 && (
            <>
              <Link href="/?page=1" className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors">1</Link>
              <span className="text-gray-600">...</span>
            </>
          )}

          {pageNumbers.map((page) => (
            <Link
              key={page}
              href={`/?page=${page}`}
              className={`px-4 py-2 rounded text-xs font-bold transition-all ${
                currentPage === page 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-white/5 hover:bg-white/20 text-gray-400"
              }`}
            >
              {page}
            </Link>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              <span className="text-gray-600">...</span>
              <Link href={`/?page=${totalPages}`} className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors">
                {totalPages}
              </Link>
            </>
          )}

          {currentPage < totalPages && (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors"
            >
              NEXT
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}