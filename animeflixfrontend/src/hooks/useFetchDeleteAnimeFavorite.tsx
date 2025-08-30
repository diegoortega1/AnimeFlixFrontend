import { toast } from "sonner";
import { removeAnimeFavorite } from "../Infraestructure/userApi";

interface Props {
  id: number;
  refetchAnimesFavorites: any;
}

export async function useFetchDeleteAnimeFavorite({
  id,
  refetchAnimesFavorites,
}: Props): Promise<void> {
  try {
    await removeAnimeFavorite(id);
    toast.success("Eliminado de favoritos", {
      description: "El anime se ha eliminado con éxito.",
    });
    refetchAnimesFavorites();
  } catch (err: unknown) {
    toast.error("Error al registrarse", {
      description: "Se ha producido un error. " + err,
    });
  }
}
