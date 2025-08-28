import { toast } from "sonner";
import { set_favorites } from "./fetch";

interface Props {
  id: number;
}
export async function useFetchSetFavoriteAnime({ id }: Props) {
  try {
    const response = await set_favorites(id);
    console.log("response", response);
    console.log("response", response.succes);
    if (response.success) {
      toast.success("Añadido a favoritos", {
        description: "El anime se ha añadido con exito.",
      });
    } else {
      toast.error("Error al añadir anime", {
        description: "Se ha producido un error al añadir anime: ",
      });
    }
  } catch (error: any) {
    toast.error("Error al añadir anime", {
      description: "Se ha producido un error al añadir anime: " + error,
      action: {
        label: "Cerrar",
        onClick: () => {},
      },
    });
  }
}
