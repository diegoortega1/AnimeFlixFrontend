import { toast } from "sonner";
import type { User } from "@/domain/models/User";
import { UserService } from "@/application/UserService";
import { HttpUserRepository } from "@/infraestructure/HttpUserRepository";

interface Props {
  fetchUser: any;
}
export function useFetchModifyUser({ fetchUser }: Props) {
  const fetchModifyUser = async (user: User) => {
    try {
      await UserService.modifyUser({
        userRepository: HttpUserRepository,
        user,
      });
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
