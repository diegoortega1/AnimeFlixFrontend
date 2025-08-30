import type { AnimeDTO } from "./AnimeDTO";

export interface AnimeByGenreResponse {
  airing: AnimeDTO[];
  bypopularity: AnimeDTO[];
  top: AnimeDTO[];
  upcoming: AnimeDTO[];
}
