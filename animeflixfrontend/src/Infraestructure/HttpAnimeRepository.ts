import { mapResponseAnimeDtoToResponseAnime } from "@/domain/mappers/animeMapper";
import type { AnimeByGenreResponse } from "@/domain/models/AnimeByGenreResponse";
import type { AnimeRepository } from "@/domain/repository/AnimeRepository";

export const HttpAnimeRepository: AnimeRepository = {
  listAnimes: async () => {
    const response = await getAnimes();
    return response;
  },
};

function handleUnauthorized() {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
}

export async function getAnimes(): Promise<AnimeByGenreResponse> {
  const response = await fetch("http://localhost:8000/animes");
  const data = await response.json();
  if (response.status === 401) {
    handleUnauthorized();
    return { airing: [], bypopularity: [], top: [], upcoming: [] };
  }
  if (response.status !== 200) throw new Error(data.detail);
  return mapResponseAnimeDtoToResponseAnime(data);
}
