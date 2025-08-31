import type { AnimeRepository } from "@/domain/repository/AnimeRepository";

interface Props {
  animeRepository: AnimeRepository;
}

export const AnimeService = {
  listAnimes: async ({ animeRepository }: Props) => {
    const animes = await animeRepository.listAnimes();
    return animes;
  },
};
