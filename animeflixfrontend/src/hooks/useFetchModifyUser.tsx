import { toast } from "sonner";
import type { User } from "../core/Domain/User";
import { modifyUser } from "../fetch";

interface Props {
  fetchUser: any;
}
export function useFetchModifyUser({ fetchUser }: Props) {
  const fetchModifyUser = async (user: User) => {
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
