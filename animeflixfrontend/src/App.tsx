import "./globals.css";
import { Header } from "./Header";
import { LoaderScreen } from "./LoaderScreen";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnimes";
import { useFetchFavorites } from "./useFetchFavorites";

function App() {
  const { animes, errors } = useFetchAnime();
  const { favorites, errorsFavorites } = useFetchFavorites();

  if (errors || errorsFavorites) {
    return <div className="text-white">Ups... Algo salió mal</div>;
  }

  if (!animes || !favorites) {
    return <LoaderScreen />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 ">
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
