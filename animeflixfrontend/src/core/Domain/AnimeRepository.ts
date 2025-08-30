import type { AnimeByGenreResponse } from "./AnimeByGenreResponse";

export interface AnimeRepository {
  listAnimes(): Promise<AnimeByGenreResponse>;
}
