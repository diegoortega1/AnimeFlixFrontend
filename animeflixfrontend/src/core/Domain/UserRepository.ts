import type { Anime } from "./Anime";
import type { User } from "./User";

export interface UserRepository {
  listInfo(): Promise<User>;
  modifyUsername(user: User): Promise<void>;
  addAnime(anime: Anime): Promise<void>;
  removeAnime(id: number): Promise<void>;
}
