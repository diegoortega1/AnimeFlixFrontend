import { toast } from "sonner";
import { addAnimeFavorite } from "./fetch";

interface Props {
  id: number;
  refetchAnimesFavorites: any;
}

export async function useFetchAddAnimeFavorite({
  id,
  refetchAnimesFavorites,
}: Props): Promise<void> {
  try {
    await addAnimeFavorite(id);
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
