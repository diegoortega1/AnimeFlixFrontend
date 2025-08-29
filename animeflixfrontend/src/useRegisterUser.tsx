import { toast } from "sonner";
import type { User } from "./core/User";
import { registerUser } from "./fetch";

export async function useRegisterUser(user: User) {
  try {
    await registerUser(user);
    toast.success("Usuario registrado", {
      description: "El usuario se ha registrado con éxito.",
    });
  } catch (err: unknown) {
    toast.error("Error al registrarse", {
      description: "Se ha producido un error. " + err,
    });
  }
}
