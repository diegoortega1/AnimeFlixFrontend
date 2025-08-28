import "./globals.css";
import { Header } from "./Header";
import { LoaderScreen } from "./LoaderScreen";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnimes";
import { useFetchFavorites } from "./useFetchFavorites";
import { useFetchFavoritesAnimes } from "./useFetchFavoritesAnimes";

function App() {
  const { animes, errors } = useFetchAnime();
  const { favorites, errorsFavorites } = useFetchFavorites();
  const { animesFavorites, errorsAnimesFavorites } = useFetchFavoritesAnimes();

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
        {animesFavorites ? (
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
          animes={animes.favorite}
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
