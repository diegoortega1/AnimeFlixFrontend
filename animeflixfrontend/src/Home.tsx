import "./globals.css";
import { Header } from "./Header";
import { LoaderScreen } from "./LoaderScreen";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnimes";
import { useFetchAnimesFavorites } from "./useFetchAnimesFavorites";

function Home() {
  const { animes, errors } = useFetchAnime();
  const { animesFavorites, errorsAnimesFavorites, refetchAnimesFavorites } =
    useFetchAnimesFavorites();

  if (errors || errorsAnimesFavorites) {
    console.log(errors);
    console.log(errorsAnimesFavorites);
    return <div className="text-white">Ups... Algo salió mal</div>;
  }

  if (!animes || !animesFavorites) {
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
            animesFavorites={animesFavorites}
            refetchAnimesFavorites={refetchAnimesFavorites}
          />
        ) : null}
        <RowContent
          title="Los mas vistos"
          animes={animes.top}
          animesFavorites={animesFavorites}
          refetchAnimesFavorites={refetchAnimesFavorites}
        />
        <RowContent
          title="Mejor valorados"
          animes={animes.bypopularity}
          animesFavorites={animesFavorites}
          refetchAnimesFavorites={refetchAnimesFavorites}
        />
        <RowContent
          title="Se estrenan proximamente Animeflix"
          animes={animes.upcoming}
          animesFavorites={animesFavorites}
          refetchAnimesFavorites={refetchAnimesFavorites}
        />
        <RowContent
          title="En emisión"
          animes={animes.airing}
          animesFavorites={animesFavorites}
          refetchAnimesFavorites={refetchAnimesFavorites}
        />
      </div>
    </div>
  );
}

export default Home;
