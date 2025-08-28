import { useEffect, useState } from "react";
import { list_reviews_animes } from "./fetch";

export function useFetchReviewsAnime() {
  const [reviewAnimes, setReviewAnimes] = useState<any>();
  const [errorReviewAnimes, setErrorReviewAnimes] = useState(null);
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await list_reviews_animes();
        console.log("response", response);
        setReviewAnimes(response);
      } catch (error: any) {
        setErrorReviewAnimes(error.message || "Unexpected error");
      }
    };

    fetchAnime();
  }, []);

  return { reviewAnimes, errorReviewAnimes };
}
