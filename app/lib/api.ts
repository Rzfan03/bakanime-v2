export async function getAnimeList() {
    const res = await fetch('https://www.sankavollerei.com/anime/stream/latest');

    if(!res.ok) throw new Error("Gagal mengambil data dari server/database");

    return res.json();

}


export async function getPopularAnime() {
    const res = await fetch('https://www.sankavollerei.com/anime/stream/popular');

    if(!res.ok) throw new Error("Gagal mengambil data dari server/database");

    return res.json();

}


export const getMovieList = async (page: number = 1) => {
  const res = await fetch(`https://www.sankavollerei.com/anime/stream/movie?page=${page}`, {
    next: { revalidate: 3600 }, // Cache selama 1 jam
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data movie");
  }

  return res.json();
};