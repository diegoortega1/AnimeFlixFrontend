import type { Anime } from "./core/Anime";
import type { AnimeDTO } from "./core/AnimeDTO";

export function mapAnimeDtoToAnime(animeDTO: AnimeDTO): Anime {
  return {
    id: animeDTO.mal_id,
    url: animeDTO.url,
    title: animeDTO.title,
    source: animeDTO.source,
    episodes: animeDTO.episodes,
    status: animeDTO.status,
    duration: animeDTO.duration,
    score: animeDTO.score,
    scored_by: animeDTO.scored_by,
    rank: animeDTO.rank,
    synopsis: animeDTO.synopsis,
    season: animeDTO.season,
    year: animeDTO.year,
    genres: animeDTO.genres,
    trailer: animeDTO.trailer,
    image: animeDTO.images.jpg.large_image_url,
  };
}
