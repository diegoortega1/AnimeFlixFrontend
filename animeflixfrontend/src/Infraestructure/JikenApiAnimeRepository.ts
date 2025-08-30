import { listAnimes } from "@/Infraestructure/animeApi";
import type { AnimeRepository } from "../core/Domain/AnimeRepository";

export const JikenApiAnimeRepository: AnimeRepository = {
  listAnimes: async () => {
    const response = await listAnimes();
    return response;
  },
};
