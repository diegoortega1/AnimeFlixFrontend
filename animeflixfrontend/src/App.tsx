import "./globals.css";
import { Header } from "./Header";

function App() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="p-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Los mas vistos
          </h4>
          <div
            className="mt-2 flex gap-3 overflow-x-auto space-x-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/3/72078.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1517/100633l.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1935/127974.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1517/100633l.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1935/127974.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1517/100633l.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1935/127974.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1517/100633l.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1935/127974.jpg"
            />
            <img
              alt="Anime banner"
              className="min-w-60 h-32 object-cover rounded"
              src="https://cdn.myanimelist.net/images/anime/1517/100633l.jpg"
            />
          </div>
        </div>
        <div className="p-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Novedades en Animeflix
          </h4>
        </div>
        <div className="p-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Recomendaciones
          </h4>
        </div>
        <div className="p-2">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Series de deportes
          </h4>
        </div>
      </div>
    </div>
  );
}

export default App;
