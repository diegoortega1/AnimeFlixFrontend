import { useEffect, useState } from "react";
import { get_favorite_anime_details } from "./fetch";
import type { Anime } from "./core/Anime";

export function useFetchFavoritesAnimes() {
  const [animesFavorites, setAnimesFavorites] = useState<Anime[]>();
  const [errorsAnimesFavorites, setErrorsAnimesFavorites] = useState(null);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await get_favorite_anime_details();
        console.log("Fetch animes ejecutado", response);
        setAnimesFavorites(response);
      } catch (error: any) {
        setErrorsAnimesFavorites(error.message || "Unexpected error");
      }
    };

    fetchAnime();
  }, []);

  return { animesFavorites, errorsAnimesFavorites };
}
