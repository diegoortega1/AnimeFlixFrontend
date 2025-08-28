export interface Anime {
  id: number;
  url: string;
  title: string;
  source: string;
  episodes: number;
  status: string;
  duration: string;
  score: number;
  scored_by: number;
  rank: number;
  synopsis: string;
  season: string;
  year: number;
  genres: Genre;
  trailer: Trailer;
  image: string;
}

interface Genre {
  id: number;
  name: string;
  type: string;
  url: string;
}

interface Trailer {
  image: string;
  url: string;
  youtube_id: string;
}
