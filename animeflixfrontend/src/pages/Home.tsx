import { useEffect, useState } from "react";
import { AnimeService } from "../application/AnimeService";
import "../globals.css";
import { HttpAnimeRepository } from "../infra/HttpAnimeRepository";
import type { AnimeByGenreResponse } from "../domain/models/AnimeByGenreResponse";
import { UserService } from "../application/UserService";
import { HttpUserRepository } from "../infra/HttpUserRepository";
import { Header } from "@/infra/views/components/Header";
import type { User } from "@/domain/models/User";
import { LoaderScreen } from "@/infra/views/components/LoaderScreen";
import { RowContent } from "@/infra/views/components/RowContent";

function Home() {
  const [animes, setAnimes] = useState<AnimeByGenreResponse>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  async function fetchAnimes() {
    try {
      setLoading(true);
      const animeData = await AnimeService.listAnimes({
        animeRepository: HttpAnimeRepository,
      });
      if (animeData) {
        setAnimes(animeData);
      }
    } catch (error) {
      console.error("Error fetching animes", error);
    } finally {
      setLoading(false);
    }
  }
  async function fetchUser() {
    try {
      setLoading2(true);
      const userData = await UserService.listInfo({
        userRepository: HttpUserRepository,
      });
      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user info", error);
    } finally {
      setLoading2(false);
    }
  }
  useEffect(() => {
    fetchAnimes();
    fetchUser();
  }, []);
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
