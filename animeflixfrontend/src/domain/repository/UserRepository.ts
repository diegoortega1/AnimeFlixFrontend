import type { Anime } from "../models/Anime";
import type { User } from "../models/User";

export interface UserRepository {
  listInfo(): Promise<User>;
  modifyUsername(user: User): Promise<void>;
  addAnime(anime: Anime): Promise<void>;
  removeAnime(id: number): Promise<void>;
}
