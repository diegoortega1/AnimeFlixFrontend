import { toast } from "sonner";
import { unset_favorites } from "./fetch";

interface Props {
  id: number;
  refetchAnimesFavorites: any;
  refetchFavorites: any;
}

export async function useFetchUnsetFavoriteAnime({
  id,
  refetchAnimesFavorites,
  refetchFavorites,
}: Props): Promise<void> {
  try {
    const response = await unset_favorites(id);

    if (response.success) {
      toast.success("Eliminado de favoritos", {
        description: "El anime se ha eliminado con éxito.",
      });
      refetchAnimesFavorites();
      refetchFavorites();
    } else {
      handleError("Error al eliminar el anime de favoritos.");
    }
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    handleError("Se produjo un error: " + errorMessage);
  }
}

function handleError(message: string): void {
  toast.error("Error al eliminar anime", {
    description: message,
  });
}
