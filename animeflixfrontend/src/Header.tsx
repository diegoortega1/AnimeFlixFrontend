import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

export function Header() {
  const navigate = useNavigate();
  return (
    <div className="flex p-4 justify-between">
      <h1
        className={
          "text-4xl md:text-4xl font-extrabold text-red-600 tracking-tight drop-shadow-lg"
        }
      >
        Animeflix
      </h1>
      <div className="flex items-center">
        <Button
          className="text-white cursor-pointer"
          variant="ghost"
          onClick={() => navigate("/home")}
        >
          Home
        </Button>
        <Button
          className="text-white"
          variant="link"
          onClick={() => navigate("/me")}
        >
          <img
            className="w-6 h-6 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          />
        </Button>
      </div>
    </div>
  );
}
