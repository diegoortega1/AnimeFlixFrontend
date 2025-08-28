import "./globals.css";
import { Header } from "./Header";

function App() {
  return (
    <div>
      <Header />
      <div className="p-4">
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Los mas vistos
          </h4>
        </div>
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Novedades en Animeflix
          </h4>
        </div>
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Recomendaciones
          </h4>
        </div>
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
            Series de deportes
          </h4>
        </div>
      </div>
    </div>
  );
}

export default App;
