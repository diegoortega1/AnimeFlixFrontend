import type { Anime } from "./core/Anime";
import type { AnimeDTO } from "./core/AnimeDTO";
import { mapResponseAnimeDtoToResponseAnime } from "./mapper";

export async function list_animes(): Promise<AnimeResponse> {
  const response = await fetch("http://localhost:8000/list_animes");
  const data = await response.json();
  console.log("top", data);

  if (response.status !== 200) throw new Error(data.detail);
  return mapResponseAnimeDtoToResponseAnime(data);
}
export async function list_favorites(): Promise<AnimeFavorite[]> {
  const response = await fetch("http://localhost:8000/favorites");
  const data = await response.json();
  console.log("fav", data);

  if (response.status !== 200) throw new Error(data.detail);
  return data;
}

export interface AnimeResponse {
  airing: Anime[];
  favorite: Anime[];
  top: Anime[];
  upcoming: Anime[];
}

export interface AnimeResponseDTO {
  airing: AnimeDTO[];
  favorite: AnimeDTO[];
  top: AnimeDTO[];
  upcoming: AnimeDTO[];
}

export interface AnimeFavorite {
  id: number;
  isFavorite: boolean;
}
