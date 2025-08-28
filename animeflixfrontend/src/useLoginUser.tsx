import { toast } from "sonner";
import type { User } from "./core/User";
import { list_user } from "./fetch";

export async function useLoginUser(user: User) {
  try {
    const response = await list_user(user);
    localStorage.setItem("authToken", response.token);

    toast.success("Has iniciado sesión", {
      description: "El usuario se ha iniciado con éxito.",
    });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Error desconocido";
    handleError("Se produjo un error: " + errorMessage);
  }
}

function handleError(message: string): void {
  toast.error("Error al iniciar", {
    description: message,
  });
}
