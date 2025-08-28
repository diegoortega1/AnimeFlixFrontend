import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUser } from "./useRegisterUser";
import { useLoginUser } from "./useLoginUser";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistration) {
      useRegisterUser({ username, password });
    } else {
      const user = { username, password };
      useLoginUser({ user, navigate });
    }
    console.log(isRegistration ? "Register" : "Login", {
      username,
      password,
    });
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
          <Label htmlFor="username" className="text-white mb-1">
            Correo electrónico
          </Label>
          <Input
            id="username"
            type="email"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            onClick={() => setIsRegistration(!isRegistration)}
          >
            {isRegistration ? "Iniciar sesión" : "Regístrate ahora"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
