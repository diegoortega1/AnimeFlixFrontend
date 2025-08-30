import type { AnimeResponse, AnimeResponseDTO } from "@/fetch";
import type { Anime } from "./Anime";
import type { AnimeDTO } from "./AnimeDTO";

export function mapAnimeDtoToAnime(animeDTO: AnimeDTO): Anime {
  return {
    id: animeDTO.mal_id,
    url: animeDTO.url,
    title: animeDTO.title,
    episodes: animeDTO.episodes,
    score: animeDTO.score,
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
    bypopularity: Array.isArray(animeResponseDTO.bypopularity)
      ? animeResponseDTO.bypopularity.map(mapAnimeDtoToAnime)
      : [],
    upcoming: Array.isArray(animeResponseDTO.upcoming)
      ? animeResponseDTO.upcoming.map(mapAnimeDtoToAnime)
      : [],
    airing: Array.isArray(animeResponseDTO.airing)
      ? animeResponseDTO.airing.map(mapAnimeDtoToAnime)
      : [],
  };
}
