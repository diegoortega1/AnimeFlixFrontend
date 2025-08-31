import { useEffect, useState } from "react";
import { HttpAnimeRepository } from "../../HttpAnimeRepository";
import type { AnimeByGenreResponse } from "../../../domain/models/AnimeByGenreResponse";

export function useFetchAnime() {
  const [animes, setAnimes] = useState<AnimeByGenreResponse>();
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await HttpAnimeRepository.listAnimes();
        setAnimes(response);
      } catch (error: any) {
        setErrors(error.message || "Unexpected error");
      }
    };

    fetchAnime();
  }, []);

  return { animes, errors };
}
