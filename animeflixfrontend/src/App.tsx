import "./globals.css";
import { Header } from "./Header";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnime";

function App() {
  const { animes, error } = useFetchAnime();
  if (!animes || error) {
    return <div>Ups... Algo salió mal</div>;
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 ">
        <RowContent title="Los mas vistos" />
        <RowContent title="Recomendados" />
        <RowContent title="Nuevo en Animeflix" />
        <RowContent title="Deportes" />
      </div>
    </div>
  );
}

export default App;
