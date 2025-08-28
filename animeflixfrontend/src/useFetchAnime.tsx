import { useEffect, useState } from "react";
import { list_animes } from "./fetch";

export function useFetchAnime() {
  const [animes, setAnime] = useState<any>();
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await list_animes();
        setAnime(response);
      } catch (error: any) {
        setError(error.message || "Unexpected error");
      }
    };

    fetchAnime();
  }, []);

  return { animes, error };
}
