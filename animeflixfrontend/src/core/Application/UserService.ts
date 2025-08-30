import type { Anime } from "../Domain/Anime";
import type { UserRepository } from "../Domain/UserRepository";

interface ListOptions {
  userRepository: UserRepository;
}

interface ModifyFavorite {
  userRepository: UserRepository;
  anime: Anime;
}

export const UserService = {
  listInfo: async ({ userRepository }: ListOptions) => {
    const user = await userRepository.listInfo();
    return user;
  },
  listFavorites: async ({ userRepository }: ListOptions) => {
    const animes = await userRepository.listAnimesFavorites();
    return animes;
  },
  addToFavorites: async ({ userRepository, anime }: ModifyFavorite) => {
    userRepository.addAnime(anime);
  },
  removeFromFavorites: async ({ userRepository, anime }: ModifyFavorite) => {
    userRepository.removeAnime(anime);
  },
};
