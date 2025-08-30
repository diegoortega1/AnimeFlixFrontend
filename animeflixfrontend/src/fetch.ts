import type { Anime } from "./core/Domain/Anime";
import type { AnimeByGenreResponse } from "./core/Domain/AnimeByGenreResponse";
import { mapResponseAnimeDtoToResponseAnime } from "./core/Domain/animeMapper";
import type { User } from "./core/Domain/User";

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

export async function addAnimeFavorite(anime: Anime): Promise<any> {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");
  const response = await fetch("http://localhost:8000/animes/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(anime),
  });
  const data = await response.json();
  if (response.status !== 200)
    throw new Error(data.detail || "Error adding favorite");
  return data;
}

export async function removeAnimeFavorite(id: number): Promise<any> {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No auth token found");
  const response = await fetch(
    "http://localhost:8000/animes/favorites/" + { id },
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
  if (response.status === 401) {
    handleUnauthorized();
    return { airing: [], bypopularity: [], top: [], upcoming: [] };
  }
  if (response.status !== 200) {
    throw new Error(data.detail || data.message || "Error fetching user");
  }

  return data;
}
export async function modifyUser(user: User): Promise<any> {
  const token = localStorage.getItem("authToken");
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
  if (response.status !== 200) {
    throw new Error(data.detail || data.message || "Error fetching user");
  }

  return data;
}
