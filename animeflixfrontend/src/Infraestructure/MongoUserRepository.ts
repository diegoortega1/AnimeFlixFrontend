import {
  addAnimeFavorite,
  removeAnimeFavorite,
  getUser,
  modifyUser,
} from "@/fetch";
import type { UserRepository } from "@/core/Domain/UserRepository";
import type { User } from "@/core/Domain/User";
import type { Anime } from "@/core/Domain/Anime";

export const MongoUserRepository: UserRepository = {
  listInfo: async () => {
    const response = await getUser();
    return response;
  },
  modifyUsername: async (user: User) => {
    const response = await modifyUser(user);
    return response;
  },
  addAnime: async (anime: Anime) => {
    const response = await addAnimeFavorite(anime);
    return response;
  },
  removeAnime: async (id: number) => {
    const response = await removeAnimeFavorite(id);
    return response;
  },
};
