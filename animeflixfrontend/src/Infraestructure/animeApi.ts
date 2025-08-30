import type { AnimeByGenreResponse } from "../core/Domain/AnimeByGenreResponse";
import { mapResponseAnimeDtoToResponseAnime } from "../core/Domain/animeMapper";

function handleUnauthorized() {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
}

export async function listAnimes(): Promise<AnimeByGenreResponse> {
  const response = await fetch("http://localhost:8000/animes");
  const data = await response.json();
  if (response.status === 401) {
    handleUnauthorized();
    return { airing: [], bypopularity: [], top: [], upcoming: [] };
  }
  if (response.status !== 200) throw new Error(data.detail);
  return mapResponseAnimeDtoToResponseAnime(data);
}
