import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import { Header } from "../components/Header";
import { useFetchUser } from "../hooks/useFetchUser";
import type { User } from "../core/Domain/User";
import { useFetchModifyUser } from "../hooks/useFetchModifyUser";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User>();
  const { user, fetchUser } = useFetchUser();
  const { fetchModifyUser } = useFetchModifyUser({ fetchUser });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!user || !formData) {
    return <div className="text-white">Cargando...</div>;
  }

  function handleSave() {
    fetchModifyUser(formData!);
    setEditing(false);
  }

  function handleCancel() {
    setFormData(user);
    setEditing(false);
  }

  function logOut() {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-black text-white flex items-center justify-center p-4">
        <Card className="relative bg-zinc-900 border-zinc-800 shadow-lg w-full max-w-lg h-[70vh] flex flex-col overflow-hidden gap-0">
          <div className="p-4 border-b border-zinc-800">
            <h1 className="text-3xl font-bold text-white">About Me</h1>
          </div>

          <div className="p-4 flex items-center gap-4 border-b border-zinc-800">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt={user.username}
              />
            </Avatar>
            <div>
              <CardTitle className="text-white">
                <div className="flex gap-2 items-center">
                  {user.username}
                  <EditIcon
                    className="w-4 h-4 cursor-pointer text-red-500"
                    onClick={() => setEditing(!editing)}
                  />
                </div>
              </CardTitle>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </div>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
            {editing ? (
              <form className="space-y-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="name" className="text-white">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData?.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className="bg-zinc-800 text-white border-zinc-700"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer"
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="default"
                    onClick={handleCancel}
                    className="border-zinc-700 text-white hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <p className="text-zinc-400 text-sm">
                Edita tu perfil para actualizar tu nombre.
              </p>
            )}
          </CardContent>

          <div className="p-4 border-t border-zinc-800">
            <Button
              variant="destructive"
              className="w-full cursor-pointer"
              onClick={logOut}
            >
              Cerrar sesión
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
