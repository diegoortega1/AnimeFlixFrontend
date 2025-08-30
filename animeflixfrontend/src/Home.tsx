import { useEffect, useState } from "react";
import { AnimeService } from "./core/Application/AnimeService";
import "./globals.css";
import { Header } from "./Header";
import { JikenApiAnimeRepository } from "./Infraestructure/JikenApiAnimeRepository";
import { LoaderScreen } from "./LoaderScreen";
import { RowContent } from "./RowContent";
import { useFetchUser } from "./useFetchUser";
import type { AnimeByGenreResponse } from "./core/Domain/AnimeByGenreResponse";

function Home() {
  const [animes, setAnimes] = useState<AnimeByGenreResponse>();
  const [loading, setLoading] = useState(true);
  const { user, fetchUser } = useFetchUser();

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        setLoading(true);
        const animeData = await AnimeService.listAnimes({
          animeRepository: JikenApiAnimeRepository,
        });
        if (animeData) {
          setAnimes(animeData);
        }
      } catch (error) {
        console.error("Error fetching animes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  if (loading) {
    return <LoaderScreen />;
  }
  if (!animes) {
    return <div>Se ha producido un error</div>;
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
