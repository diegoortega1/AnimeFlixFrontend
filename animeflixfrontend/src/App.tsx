import { useEffect, useState } from "react";
import "./globals.css";
import { Header } from "./Header";
import { LoaderScreen } from "./LoaderScreen";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnimes";
import { useFetchFavorites } from "./useFetchFavorites";
import { get_favorite_anime_details } from "./fetch";
import type { Anime } from "./core/Anime";

function App() {
  const { animes, errors } = useFetchAnime();
  const { favorites, errorsFavorites } = useFetchFavorites();
  const [animesFavorites, setAnimesFavorites] = useState<Anime[]>();
  const [errorsAnimesFavorites, setErrorsAnimesFavorites] = useState(null);

  useEffect(() => {
    if (!animes) return;

    async function fetchAnimesFavorites() {
      try {
        const response = await get_favorite_anime_details();
        setAnimesFavorites(response);
      } catch (error: any) {
        setErrorsAnimesFavorites(error.message || "Unexpected error");
      }
    }
    fetchAnimesFavorites();
  }, [animes]);
  if (errors || errorsFavorites || errorsAnimesFavorites) {
    return <div className="text-white">Ups... Algo salió mal</div>;
  }

  if (!animes || !favorites || !animesFavorites) {
    return <LoaderScreen />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 ">
        {animesFavorites && animesFavorites.length > 0 ? (
          <RowContent
            title="Tus favoritos"
            animes={animesFavorites}
            favorites={favorites}
          />
        ) : null}
        <RowContent
          title="Los mas vistos"
          animes={animes.top}
          favorites={favorites}
        />
        <RowContent
          title="Mejor valorados"
          animes={animes.bypopularity}
          favorites={favorites}
        />
        <RowContent
          title="Se estrenan proximamente Animeflix"
          animes={animes.upcoming}
          favorites={favorites}
        />
        <RowContent
          title="En emisión"
          animes={animes.airing}
          favorites={favorites}
        />
      </div>
    </div>
  );
}

export default App;
