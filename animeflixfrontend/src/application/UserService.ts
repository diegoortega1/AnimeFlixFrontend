import type { UserRepository } from "@/domain/repository/UserRepository";
import type { Anime } from "../domain/models/Anime";
import type { User } from "@/domain/models/User";

interface ListOptions {
  userRepository: UserRepository;
}

interface AddFavorite {
  userRepository: UserRepository;
  anime: Anime;
}
interface ModifyUser {
  userRepository: UserRepository;
  user: User;
}

interface RemoveFavorite {
  userRepository: UserRepository;
  id: number;
}

export const UserService = {
  listInfo: async ({ userRepository }: ListOptions) => {
    const user = await userRepository.listInfo();
    return user;
  },
  modifyUser: async ({ userRepository, user }: ModifyUser) => {
    const animes = await userRepository.modifyUsername(user);
    return animes;
  },
  addToFavorites: async ({ userRepository, anime }: AddFavorite) => {
    return userRepository.addAnime(anime);
  },
  removeFromFavorites: async ({ userRepository, id }: RemoveFavorite) => {
    return userRepository.removeAnime(id);
  },
};
