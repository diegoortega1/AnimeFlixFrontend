import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useNavigate } from "react-router-dom";
import type { User } from "@/domain/models/User";
import { AuthService } from "@/application/AuthService";
import { HttpAuthRepository } from "@/infra/HttpAuthRepository";
import { toast } from "sonner";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);

  function handleChangeRegistration(isRegistration: boolean) {
    setIsRegistration(isRegistration);
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistration) {
      registerUser({ email, password });
    } else {
      const user = { email, password };
      loginUser({ user, navigate });
    }
  };

  return (
    <div className="min-h-screen bg-black relative flex flex-col items-center justify-center bg-[url(https://assets.nflxext.com/ffe/siteui/vlv3/cb72daa5-bd8d-408b-b949-1eaef000c377/web/ES-es-20250825-TRIFECTA-perspective_112c71e7-1298-4090-b862-55ff09b1ac4e_medium.jpg)]">
      <div className="absolute inset-0 bg-black/70 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-[#141414] p-8 rounded-lg max-w-md w-full mx-4"
      >
        <h1 className="text-4xl font-bold text-red-600 text-center mb-6">
          Animeflix
        </h1>

        <div className="mb-4">
          <Label htmlFor="email" className="text-white mb-1">
            Correo electrónico
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-800 text-white"
            required
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="password" className="text-white mb-1">
            Contraseña
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-800 text-white"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full mb-4 bg-red-600 hover:bg-red-700"
        >
          {isRegistration ? "Registrarse" : "Iniciar sesión"}
        </Button>

        <p className="text-gray-400 text-sm text-center">
          {isRegistration
            ? "¿Ya tienes una cuenta? "
            : "¿Eres nuevo en Animeflix? "}
          <button
            type="button"
            className="text-white hover:underline"
            onClick={() => handleChangeRegistration(!isRegistration)}
          >
            {isRegistration ? "Iniciar sesión" : "Regístrate ahora"}
          </button>
        </p>
      </form>
    </div>
  );
}

interface LoginUser {
  user: User;
  navigate: any;
}
async function loginUser({ user, navigate }: LoginUser) {
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

async function registerUser(user: User) {
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

export default Login;
