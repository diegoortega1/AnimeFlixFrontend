import type { Anime } from "./Anime";

export interface AnimeByGenreResponse {
  airing: Anime[];
  bypopularity: Anime[];
  top: Anime[];
  upcoming: Anime[];
}
