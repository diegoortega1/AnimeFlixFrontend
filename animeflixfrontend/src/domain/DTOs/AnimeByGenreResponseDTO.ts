import type { AnimeDTO } from "./AnimeDTO";

export interface AnimeByGenreResponseDTO {
  airing: AnimeDTO[];
  bypopularity: AnimeDTO[];
  top: AnimeDTO[];
  upcoming: AnimeDTO[];
}
