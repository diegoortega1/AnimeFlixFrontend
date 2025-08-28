import { useEffect, useState } from "react";
import { list_animes } from "./fetch";

export function useFetchAnime() {
  const [animes, setAnimes] = useState<any>();
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    console.log("Fetch animes ejecutado");

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
