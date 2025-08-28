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
  const { animesFavorites, errorsAnimesFavorites, refetchFavorites } =
    useFetchFavoritesAnimes();

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
            refetchFavorites={refetchFavorites}
          />
        ) : null}
        <RowContent
          title="Los mas vistos"
          animes={animes.top}
          favorites={favorites}
          refetchFavorites={refetchFavorites}
        />
        <RowContent
          title="Mejor valorados"
          animes={animes.bypopularity}
          favorites={favorites}
          refetchFavorites={refetchFavorites}
        />
        <RowContent
          title="Se estrenan proximamente Animeflix"
          animes={animes.upcoming}
          favorites={favorites}
          refetchFavorites={refetchFavorites}
        />
        <RowContent
          title="En emisión"
          animes={animes.airing}
          favorites={favorites}
          refetchFavorites={refetchFavorites}
        />
      </div>
    </div>
  );
}

export default App;
