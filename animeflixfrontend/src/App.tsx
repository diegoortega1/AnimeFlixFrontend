import "./globals.css";
import { Header } from "./Header";
import { RowContent } from "./RowContent";

function App() {
  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 gap-6">
        <RowContent title="Los mas vistos" />
        <RowContent title="Recomendados" />
        <RowContent title="Nuevo en Animeflix" />
        <RowContent title="Deportes" />
      </div>
    </div>
  );
}

export default App;
