import { toast } from "sonner";
import type { User } from "@/domain/models/User";
import { AuthService } from "@/application/AuthService";
import { HttpAuthRepository } from "@/infraestructure/HttpAuthRepository";

interface Props {
  user: User;
  navigate: any;
}
export async function useLoginUser({ user, navigate }: Props) {
  try {
    const response = await AuthService.login({
      authRepository: HttpAuthRepository,
      user,
    });
    localStorage.setItem("authToken", response.token);
    navigate("/home");
  } catch (err: unknown) {
    toast.error("Error al iniciar sesión", {
      description: "Se ha producido un error. " + err,
    });
  }
}
