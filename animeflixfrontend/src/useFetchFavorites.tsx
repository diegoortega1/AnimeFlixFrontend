import { useEffect, useState } from "react";
import { list_favorites, type AnimeFavorite } from "./fetch";

export function useFetchFavorites() {
  const [favorites, setFavorites] = useState<AnimeFavorite[]>();
  const [errorsFavorites, setErrorsFavorites] = useState(null);
  async function fetchAnime() {
    try {
      const response = await list_favorites();
      setFavorites(response);
    } catch (error: any) {
      setErrorsFavorites(error.message || "Unexpected error");
    }
  }
  useEffect(() => {
    fetchAnime();
  }, []);

  return { favorites, errorsFavorites, refetchFavorites: fetchAnime };
}
