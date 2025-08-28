import "./globals.css";
import { Header } from "./Header";
import { LoaderScreen } from "./LoaderScreen";
import { RowContent } from "./RowContent";
import { useFetchAnime } from "./useFetchAnimes";

function App() {
  const { animes, errors } = useFetchAnime();
  if (errors) {
    return <div className="text-white">Ups... Algo salió mal</div>;
  }
  if (!animes) {
    return <LoaderScreen />;
  }
  return (
    <div>
      <Header />
      <div className="flex flex-col p-4 ">
        <RowContent title="Los mas vistos" animes={animes.top} />
        <RowContent title="Mejor valorados" animes={animes.favorite} />
        <RowContent
          title="Se estrenan proximamente Animeflix"
          animes={animes.upcoming}
        />
        <RowContent title="En emisión" animes={animes.airing} />
      </div>
    </div>
  );
}

export default App;
