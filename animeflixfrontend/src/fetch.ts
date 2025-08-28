import type { Anime } from "./core/Anime";
import type { AnimeDTO } from "./core/AnimeDTO";
import { mapResponseAnimeDtoToResponseAnime } from "./mapper";

export async function list_animes(): Promise<AnimeResponse> {
  const r = await fetch("http://localhost:8000/list_animes");
  const data = await r.json();
  console.log("top", data);

  if (r.status !== 200) throw new Error(data.detail);
  return mapResponseAnimeDtoToResponseAnime(data);
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
