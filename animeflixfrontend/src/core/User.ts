import type { Anime } from "./Anime";

export interface User {
  username?: string;
  email: string;
  password: string;
  animesFavorites?: Anime[];
}
