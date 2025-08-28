import "./globals.css";
import { Header } from "./Header";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnime";
import { useFetchReviewsAnime } from "./useFetchReviewsAnime";

function App() {
  const { animes, error } = useFetchAnime();
  const { reviewAnimes, errorReviewAnimes } = useFetchReviewsAnime();
  if (error || errorReviewAnimes) {
    return <div>Ups... Algo salió mal</div>;
  }
  if (!animes || !reviewAnimes) {
    return <div>Cargando</div>;
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 ">
        <RowContent title="Los mas vistos" animes={animes} />
        <RowContent title="Mejor valorados" animes={reviewAnimes} />
        <RowContent title="Nuevo en Animeflix" animes={animes} />
        <RowContent title="Deportes" animes={animes} />
      </div>
    </div>
  );
}

export default App;
