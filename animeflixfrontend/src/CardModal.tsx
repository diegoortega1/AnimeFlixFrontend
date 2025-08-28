import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "./Card";
import type { Anime } from "./core/Anime";

interface Props {
  anime: Anime;
}

export function CardModal({ anime }: Props) {
  console.log("animefinal", anime);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 overflow-visible">
          <Card animeURL={anime.image} />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-[50vw] max-h-[90vh] overflow-hidden p-0 bg-black text-white border-none">
        <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
          <iframe
            src={anime.trailer}
            title={anime.title}
            allow="encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
          <div
            className="absolute bottom-0 left-0 w-full h-full
               bg-gradient-to-t from-black via-transparent/70 to-transparent
               pointer-events-none"
          />
        </div>

        <div className="px-6 pb-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">
              {anime.title}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground line-clamp-3">
              {anime.synopsis}
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span>Episodes: {anime.episodes}</span>
            <span>Score: {anime.score}</span>
            <span>Year: {anime.year}</span>
          </div>

          <DialogFooter className="pt-4">
            <DialogClose>
              <Button variant="default">Salir</Button>
            </DialogClose>
            <Button variant="destructive">Añadir a favorito</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
