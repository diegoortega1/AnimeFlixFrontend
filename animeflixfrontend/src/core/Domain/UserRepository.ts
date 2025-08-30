import type { Anime } from "./Anime";
import type { User } from "./User";

export interface UserRepository {
  listInfo(): Promise<User>;
  modifyUsername(): Promise<void>;
  listAnimesFavorites(): Promise<Anime[]>;
  addAnime(anime: Anime): Promise<void>;
  removeAnime(anime: Anime): Promise<void>;
}
