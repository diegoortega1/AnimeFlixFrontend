import type { AnimeByGenreResponse } from "../models/AnimeByGenreResponse";

export interface AnimeRepository {
  listAnimes(): Promise<AnimeByGenreResponse>;
}
