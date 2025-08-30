import { toast } from "sonner";
import { addAnimeFavorite } from "./fetch";
import type { Anime } from "./core/Domain/Anime";

interface Props {
  anime: Anime;
  refetchAnimesFavorites: any;
}

export async function useFetchAddAnimeFavorite({
  anime,
  refetchAnimesFavorites,
}: Props): Promise<void> {
  try {
    await addAnimeFavorite(anime);
    toast.success("Añadido a favoritos", {
      description: "El anime se ha añadido con éxito.",
    });
    refetchAnimesFavorites();
  } catch (err: unknown) {
    toast.error("Error al registrarse", {
      description: "Se ha producido un error. " + err,
    });
  }
}
