export interface AnimeDTO {
  mal_id: number;
  url: string;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  titles: { type: string; title: string }[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  approved: boolean;
  aired: any;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  background: string;
  synopsis: string;
  season: string;
  year: number;
  broadcast: any;
  producers: any;
  studios: any;
  genres: any;
  explicit_genres: any;
  demographics: any;
  themes: any;
  trailer: any;
  images: Images;
  licensors: any;
}

interface ImageFormat {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Images {
  jpg: ImageFormat;
  webp: ImageFormat;
}
