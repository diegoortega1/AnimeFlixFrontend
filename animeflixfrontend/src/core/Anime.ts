export interface Anime {
  id: number;
  url: string;
  title: string;
  source: string;
  episodes: number;
  status: string;
  duration: string;
  score: number;
  scoredBy: number;
  rank: number;
  synopsis: string;
  season: string;
  year: number;
  genres: Genre;
  trailer: string;
  image: string;
}

interface Genre {
  id: number;
  name: string;
  type: string;
  url: string;
}
