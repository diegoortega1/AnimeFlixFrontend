import type { Anime } from "./core/Anime";
import type { AnimeDTO } from "./core/AnimeDTO";
import type { User } from "./core/User";
import { mapResponseAnimeDtoToResponseAnime } from "./mapper";

export async function listAnimes(): Promise<AnimeResponse> {
  const response = await fetch("http://localhost:8000/animes");
  const data = await response.json();
  if (response.status !== 200) throw new Error(data.detail);
  return mapResponseAnimeDtoToResponseAnime(data);
}

export async function listAnimesFavorites(): Promise<Anime[]> {
  const response = await fetch("http://localhost:8000/animes/favorites");
  const data = await response.json();
  if (response.status !== 200) throw new Error(data.detail);
  return data;
}

export async function addAnimeFavorite(anime: Anime): Promise<any> {
  console.log("anime envio", anime);
  const response = await fetch("http://localhost:8000/animes/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anime),
  });
  const data = await response.json();
  console.log("falla", data);
  if (response.status !== 200)
    throw new Error(data.detail || "Error adding favorite");
  return data;
}

export async function deleteAnimeFavorite(id: number): Promise<any> {
  const response = await fetch(
    "http://localhost:8000/animes/favorites/" + { id },
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );
  const data = await response.json();
  if (response.status !== 200)
    throw new Error(data.detail || "Error deleting favorite");
  return data;
}

export async function registerUser(user: User): Promise<any> {
  const response = await fetch("http://localhost:8000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  console.log("data", data);
  if (response.status !== 200)
    throw new Error(data.detail || data.message || "Error in register");
  return data;
}
export async function loginUser(user: User): Promise<any> {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (response.status !== 200)
    throw new Error(data.detail || data.message || "Error in register");
  return data;
}

export async function getUser(): Promise<any> {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");

  const response = await fetch("http://localhost:8000/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log("data", data);
  if (!response.ok) {
    throw new Error(data.detail || data.message || "Error fetching user");
  }

  return data;
}
export async function modifyUser(user: User): Promise<any> {
  const token = localStorage.getItem("authToken");
  console.log("toke", token);
  if (!token) throw new Error("No auth token found");

  const response = await fetch("http://localhost:8000/me", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  const data = await response.json();
  console.log("data", data);
  if (!response.ok) {
    throw new Error(data.detail || data.message || "Error fetching user");
  }

  return data;
}

export interface AnimeResponse {
  airing: Anime[];
  bypopularity: Anime[];
  top: Anime[];
  upcoming: Anime[];
}

export interface AnimeResponseDTO {
  airing: AnimeDTO[];
  bypopularity: AnimeDTO[];
  top: AnimeDTO[];
  upcoming: AnimeDTO[];
}
