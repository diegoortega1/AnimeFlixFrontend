import type { Anime } from "./core/Anime";
import type { AnimeDTO } from "./core/AnimeDTO";
import type { AnimeResponse, AnimeResponseDTO } from "./fetch";

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
    scoredBy: animeDTO.scored_by,
    rank: animeDTO.rank,
    synopsis: animeDTO.synopsis,
    season: animeDTO.season,
    year: animeDTO.year,
    genres: animeDTO.genres,
    trailer: animeDTO.trailer.embed_url,
    image: animeDTO.images.jpg.large_image_url,
  };
}

export function mapResponseAnimeDtoToResponseAnime(
  animeResponseDTO: AnimeResponseDTO
): AnimeResponse {
  return {
    top: Array.isArray(animeResponseDTO.top)
      ? animeResponseDTO.top.map(mapAnimeDtoToAnime)
      : [],
    favorite: Array.isArray(animeResponseDTO.favorite)
      ? animeResponseDTO.favorite.map(mapAnimeDtoToAnime)
      : [],
    upcoming: Array.isArray(animeResponseDTO.upcoming)
      ? animeResponseDTO.upcoming.map(mapAnimeDtoToAnime)
      : [],
    airing: Array.isArray(animeResponseDTO.airing)
      ? animeResponseDTO.airing.map(mapAnimeDtoToAnime)
      : [],
  };
}
