import { toast } from "sonner";
import type { User } from "./core/Domain/User";
import { loginUser } from "./fetch";

interface Props {
  user: User;
  navigate: any;
}
export async function useLoginUser({ user, navigate }: Props) {
  try {
    const response = await loginUser(user);
    localStorage.setItem("authToken", response.token);
    navigate("/home");
  } catch (err: unknown) {
    toast.error("Error al iniciar sesión", {
      description: "Se ha producido un error. " + err,
    });
  }
}
