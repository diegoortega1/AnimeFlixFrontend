import { toast } from "sonner";
import { set_favorites } from "./fetch";

interface Props {
  id: number;
  refetchAnimesFavorites: any;
  refetchFavorites: any;
}

export async function useFetchSetFavoriteAnime({
  id,
  refetchAnimesFavorites,
  refetchFavorites,
}: Props): Promise<void> {
  try {
    const response = await set_favorites(id);

    if (response.success) {
      toast.success("Añadido a favoritos", {
        description: "El anime se ha añadido con éxito.",
      });
      refetchAnimesFavorites();
      refetchFavorites();
    } else {
      handleError("Error al añadir el anime a favoritos.");
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    handleError("Se produjo un error: " + errorMessage);
  }
}

function handleError(message: string): void {
  toast.error("Error al añadir anime", {
    description: message,
  });
}
