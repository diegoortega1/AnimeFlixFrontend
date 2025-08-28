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
        <RowContent title="Los mas vistos" animes={animes} />
        <RowContent title="Recomendados" animes={animes} />
        <RowContent title="Nuevo en Animeflix" animes={animes} />
        <RowContent title="Deportes" animes={animes} />
      </div>
    </div>
  );
}

export default App;
