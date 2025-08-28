import { toast } from "sonner";
import type { User } from "./core/User";
import { register_user } from "./fetch";

export async function useRegisterUser(user: User) {
  try {
    await register_user(user);
    toast.success("Usuario registrado", {
      description: "El usuario se ha registrado con éxito.",
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    handleError("Se produjo un error: " + errorMessage);
  }
}

function handleError(message: string): void {
  toast.error("Error al registrarse", {
    description: message,
  });
}
