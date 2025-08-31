import { AnimeService } from "@/application/AnimeService";
import { UserService } from "@/application/UserService";
import type { AnimeByGenreResponse } from "@/domain/models/AnimeByGenreResponse";
import type { User } from "@/domain/models/User";
import { HttpAnimeRepository } from "@/infraestructure/HttpAnimeRepository";
import { HttpUserRepository } from "@/infraestructure/HttpUserRepository";
import { useEffect, useState } from "react";

export function useHomeLoad() {
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
  return { loading, loading2, user, animes, fetchUser };
}
