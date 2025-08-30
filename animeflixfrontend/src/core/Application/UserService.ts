import type { Anime } from "../Domain/Anime";
import type { UserRepository } from "../Domain/UserRepository";
import type { User } from "../Domain/User";

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
    userRepository.addAnime(anime);
  },
  removeFromFavorites: async ({ userRepository, id }: RemoveFavorite) => {
    userRepository.removeAnime(id);
  },
};
