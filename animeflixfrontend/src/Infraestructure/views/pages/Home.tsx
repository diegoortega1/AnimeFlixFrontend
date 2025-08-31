import "../../../globals.css";
import { Header } from "../components/Header";
import { LoaderScreen } from "../components/LoaderScreen";
import { RowContent } from "../components/RowContent";
import { useHomeLoad } from "../hooks/useHomeLoad";

function Home() {
  const { user, animes, loading, loading2, fetchUser } = useHomeLoad();
  if (loading || loading2) {
    return <LoaderScreen />;
  }
  if (!animes || !user) {
    return <div>Se ha producido un error</div>;
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 ">
        {user?.animesFavorites && user?.animesFavorites.length > 0 ? (
          <RowContent
            title="Your favorites"
            animes={user?.animesFavorites}
            animesFavorites={user?.animesFavorites}
            refetchAnimesFavorites={fetchUser}
          />
        ) : null}
        <RowContent
          title="Most viewed"
          animes={animes.top}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
        <RowContent
          title="Top rated"
          animes={animes.bypopularity}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
        <RowContent
          title="Coming soon on Animeflix"
          animes={animes.upcoming}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
        <RowContent
          title="Currently airing"
          animes={animes.airing}
          animesFavorites={user?.animesFavorites || []}
          refetchAnimesFavorites={fetchUser}
        />
      </div>
    </div>
  );
}

export default Home;
