import Link from "next/link";
import Image from "next/image";
import { getMovieList } from "../lib/api";
import { animeProps } from "../types/animeProps";
import HistoryTracker from "../(main)/components/Histroy";

export default async function MoviePage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const res = await getMovieList(currentPage);

  const totalPages = res.max_page || 1;
  
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
    <main className="min-h-screen pt-24 pb-10 px-5 max-w-7xl mx-auto">
      <header className="mb-10">
        <h2 className="text-2xl font-bold border-l-4 border-blue-500 pl-4 text-white uppercase tracking-wider">
          Anime <span className="text-blue-500">Movies</span>
        </h2>
        <p className="text-gray-400 text-xs mt-2 ml-5">Koleksi film layar lebar terbaik</p>
      </header>

      

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {res.data.map((movie: animeProps) => (
          <div 
            key={movie.slug} 
            className="flex flex-col bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image 
                src={movie.poster} 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
                alt={movie.title} 
                unoptimized
              />
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] px-2 py-1 font-bold rounded-bl-lg shadow-lg">
                MOVIE
              </div>
            </div>

            <div className="p-3 flex flex-col justify-between flex-grow">
              <h3 className="text-sm font-bold line-clamp-2 mb-4 text-gray-200 group-hover:text-white transition-colors h-10">
                {movie.title}
              </h3>
              <Link 
                href={`/anime/${movie.slug}`} 
                className="text-center bg-white/10 hover:bg-blue-600 text-white text-xs py-2 rounded font-semibold transition-all duration-300 active:scale-95"
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
            href={`/movie?page=${currentPage - 1}`}
            className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors"
          >
            PREV
          </Link>
        )}

        {currentPage > 3 && (
          <>
            <Link href="/movie?page=1" className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors">1</Link>
            <span className="text-gray-600">...</span>
          </>
        )}

        {pageNumbers.map((page) => (
          <Link
            key={page}
            href={`/movie?page=${page}`}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              currentPage === page 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
              : "bg-white/5 hover:bg-white/20 text-gray-400"
            }`}
          >
            {page}
          </Link>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            <span className="text-gray-600">...</span>
            <Link href={`/movie?page=${totalPages}`} className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors">
              {totalPages}
            </Link>
          </>
        )}

        {currentPage < totalPages && (
          <Link
            href={`/movie?page=${currentPage + 1}`}
            className="px-3 py-2 rounded bg-white/5 hover:bg-blue-600 text-xs font-bold transition-colors"
          >
            NEXT
          </Link>
        )}
      </div>
    </main>
  );
}