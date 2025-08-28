import { useEffect, useState } from "react";
import { list_animes, type AnimeResponse } from "./fetch";

export function useFetchAnime() {
  const [animes, setAnimes] = useState<AnimeResponse>();
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await list_animes();
        setAnimes(response);
      } catch (error: any) {
        setErrors(error.message || "Unexpected error");
      }
    };

    fetchAnime();
  }, []);

  return { animes, errors };
}
