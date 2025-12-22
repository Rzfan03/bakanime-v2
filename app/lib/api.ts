export async function getAnimeList(page: number = 1) {
    const res = await fetch(`https://www.sankavollerei.com/anime/stream/latest?page=${page}`);

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
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data movie");
  }

  return res.json();
};