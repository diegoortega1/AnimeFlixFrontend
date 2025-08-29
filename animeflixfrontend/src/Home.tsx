import "./globals.css";
import { Header } from "./Header";
import { LoaderScreen } from "./LoaderScreen";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnimes";
import { useFetchUser } from "./useFetchUser";

function Home() {
  const { animes, errors } = useFetchAnime();
  const { user, fetchUser } = useFetchUser();

  console.log("user", user);
  if (errors) {
    return <div className="text-white">Ups... Algo salió mal</div>;
  }

  if (!animes) {
    return <LoaderScreen />;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 ">
        {user?.animesFavorites && user?.animesFavorites.length > 0 ? (
          <RowContent
            title="Tus favoritos"
            animes={user?.animesFavorites}
            animesFavorites={user?.animesFavorites}
            refetchAnimesFavorites={fetchUser}
          />
        ) : null}
        <RowContent
          title="Los mas vistos"
          animes={animes.top}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
        <RowContent
          title="Mejor valorados"
          animes={animes.bypopularity}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
        <RowContent
          title="Se estrenan proximamente Animeflix"
          animes={animes.upcoming}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
        <RowContent
          title="En emisión"
          animes={animes.airing}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
      </div>
    </div>
  );
}

export default Home;
