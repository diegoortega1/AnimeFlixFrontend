import { useEffect, useState } from "react";
import { JikenApiAnimeRepository } from "../Infraestructure/JikenApiAnimeRepository";
import type { AnimeByGenreResponse } from "../core/Domain/AnimeByGenreResponse";

export function useFetchAnime() {
  const [animes, setAnimes] = useState<AnimeByGenreResponse>();
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await JikenApiAnimeRepository.listAnimes();
        setAnimes(response);
      } catch (error: any) {
        setErrors(error.message || "Unexpected error");
      }
    };

    fetchAnime();
  }, []);

  return { animes, errors };
}
