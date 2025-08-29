import { toast } from "sonner";
import type { User } from "./core/User";
import { modifyUser } from "./fetch";

interface Props {
  fetchUser: any;
}
export function useFetchModifyUser({ fetchUser }: Props) {
  const fetchModifyUser = async (user: User) => {
    console.log("envio", user);
    try {
      await modifyUser(user);
      toast.success("Cambios realizados", {
        description: "Cambios realizados con éxito.",
      });
      fetchUser();
    } catch (error: any) {
      toast.error("Error al realizar cambios", {
        description: "Se ha producido un error. " + error,
      });
    }
  };

  return { fetchModifyUser };
}
