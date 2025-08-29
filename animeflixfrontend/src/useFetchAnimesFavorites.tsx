import { useEffect, useState } from "react";
import { listAnimesFavorites } from "./fetch";
import type { Anime } from "./core/Anime";

export function useFetchAnimesFavorites() {
  const [animesFavorites, setAnimesFavorites] = useState<Anime[]>();
  const [errorsAnimesFavorites, setErrorsAnimesFavorites] = useState(null);
  async function fetchAnime() {
    try {
      const response = await listAnimesFavorites();
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
    refetchAnimesFavorites: fetchAnime,
  };
}
