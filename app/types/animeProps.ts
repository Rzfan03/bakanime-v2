export type animeProps = {
    id: number;
    title: string;
    slug: string;
    poster: string;
    episode: string;
    date: string;
    type: string;
    eps_slug: string;
    params: Promise<{
    slug: string;
  }>;
}
