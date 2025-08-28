import { Button } from "./components/ui/button";
import { Search } from "lucide-react";

export function Header() {
  return (
    <div className="flex p-4 justify-between">
      <h1
        className={
          "text-4xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-lg"
        }
      >
        Animeflix
      </h1>
      <div className="flex items-center">
        <Button className="text-white" variant="ghost">
          Inicio
        </Button>
        <Button className="text-white" variant="ghost">
          Series
        </Button>
        <Button className="text-white" variant="ghost">
          Peliculas
        </Button>
        <Button className="text-white" variant="ghost">
          <Search />
          Buscar
        </Button>
      </div>
    </div>
  );
}
