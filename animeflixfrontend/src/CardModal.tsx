import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./Card";
import type { Anime } from "./core/Domain/Anime";
import { Heart } from "lucide-react";
import { useFetchDeleteAnimeFavorite } from "./useFetchDeleteAnimeFavorite";
import { useFetchAddAnimeFavorite } from "./useFetchAddAnimeFavorite";

interface Props {
  anime: Anime;
  favorites: Anime[];
  refetchAnimesFavorites: any;
}

export function CardModal({ anime, favorites, refetchAnimesFavorites }: Props) {
  const isFavorite = favorites.some((favorite) => favorite.id === anime.id);
  function handleFavorite() {
    if (isFavorite) {
      useFetchDeleteAnimeFavorite({
        id: anime.id,
        refetchAnimesFavorites: refetchAnimesFavorites,
      });
    } else {
      useFetchAddAnimeFavorite({
        anime: anime,
        refetchAnimesFavorites: refetchAnimesFavorites,
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 overflow-visible">
          <Card animeURL={anime.image} />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[50vw] max-h-[90vh] overflow-hidden p-0 bg-black text-white border-none">
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
          {anime.trailer ? (
            <iframe
              src={anime.trailer}
              title={anime.title}
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <img src={anime.image} className="w-full h-full" />
          )}
          <div
            className="absolute bottom-0 left-0 w-full h-full
         bg-gradient-to-t from-black via-transparent/70 to-transparent
         pointer-events-none"
          />
        </div>

        <div className="px-6 pb-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              <div className="flex gap-1 items-center justify-between">
                {anime.title}
                <Heart
                  className={`cursor-pointer text-red-500 ${
                    isFavorite ? "fill-red-500" : "fill-transparent"
                  }`}
                  onClick={() => handleFavorite()}
                />
              </div>
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground line-clamp-3">
              {anime.synopsis}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2">
            {anime.genres?.map((genre) => (
              <span
                key={genre}
                className="inline-block bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full select-none"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Episodes: {anime.episodes ? anime.episodes : "-"}</span>
            <span>Score: {anime.score ? anime.score : "-"}</span>
            <span>Year: {anime.year ? anime.year : "-"}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
