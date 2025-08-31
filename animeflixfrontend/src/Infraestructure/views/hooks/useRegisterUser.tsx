import { toast } from "sonner";
import type { User } from "@/domain/models/User";
import { AuthService } from "@/application/AuthService";
import { HttpAuthRepository } from "@/infraestructure/HttpAuthRepository";

export async function useRegisterUser(user: User) {
  try {
    await AuthService.register({
      authRepository: HttpAuthRepository,
      user,
    });
    toast.success("Usuario registrado", {
      description: "El usuario se ha registrado con éxito.",
    });
  } catch (err: unknown) {
    toast.error("Error al registrarse", {
      description: "Se ha producido un error. " + err,
    });
  }
}
