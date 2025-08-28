import { useEffect, useState } from "react";
import { get_favorite_anime_details } from "./fetch";
import type { Anime } from "./core/Anime";

export function useFetchFavoritesAnimes() {
  const [animesFavorites, setAnimesFavorites] = useState<Anime[]>();
  const [errorsAnimesFavorites, setErrorsAnimesFavorites] = useState(null);
  async function fetchAnime() {
    try {
      const response = await get_favorite_anime_details();
      setAnimesFavorites(response);
    } catch (error: any) {
      setErrorsAnimesFavorites(error.message || "Unexpected error");
    }
  }

  useEffect(() => {
    fetchAnime();
  }, []);

  return {
    animesFavorites,
    errorsAnimesFavorites,
    refetchFavorites: fetchAnime,
  };
}
