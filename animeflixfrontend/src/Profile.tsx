import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "lucide-react";
import { Header } from "./Header";
import { useFetchUser } from "./useFetchUser";
import type { User } from "./core/User";
import { useFetchModifyUser } from "./useFetchModifyUser";
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
    console.log("user", user);
    return <div className="text-white">Ups...Algo salió mal</div>;
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
      <div className="flex-1 bg-black text-white flex items-center justify-center w-full p-4">
        <Card className="bg-zinc-900 border-zinc-800 shadow-lg w-full max-w-2xl p-4">
          <CardHeader className="flex items-center gap-4">
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
                    className="w-4 cursor-pointer text-red-500"
                    onClick={() => setEditing(!editing)}
                  />
                </div>
              </CardTitle>
              <p className="text-sm text-zinc-400">{user.email}</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
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
                    onClick={() => handleSave()}
                    className="bg-red-600 hover:bg-red-700 cursor-pointer"
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handleCancel()}
                    className="border-zinc-700 text-white hover:bg-zinc-800 cursor-pointer"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            ) : (
              <div className="flex gap-4">
                <Button
                  variant="destructive"
                  className="border-zinc-700 text-white hover:bg-zinc-800 cursor-pointer"
                  onClick={() => logOut()}
                >
                  Cerrar sesión
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
