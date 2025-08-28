import type { Anime } from "./core/Anime";
import type { AnimeDTO } from "./core/AnimeDTO";
import type { AnimeResponse, AnimeResponseDTO } from "./fetch";

export function mapAnimeDtoToAnime(animeDTO: AnimeDTO): Anime {
  return {
    id: animeDTO.mal_id,
    url: animeDTO.url,
    title: animeDTO.title,
    episodes: animeDTO.episodes,
    duration: animeDTO.duration,
    score: animeDTO.score,
    rank: animeDTO.rank,
    synopsis: animeDTO.synopsis,
    year: animeDTO.year,
    genres: animeDTO.genres.map((genre: any) => genre.name),
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
