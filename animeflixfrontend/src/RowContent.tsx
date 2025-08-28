import { CardModal } from "./CardModal";

interface Props {
  title: string;
  animes: any[];
}

export function RowContent({ title, animes }: Props) {
  console.log("anime ", animes);
  return (
    <div className="p-2">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-white">
        {title}
      </h4>
      <div
        className="px-5 flex gap-3 overflow-x-auto space-x-4 h-40 items-center"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {animes.map((anime) => (
          <CardModal
            key={anime.mal_id}
            animeURL={anime.images.jpg.large_image_url}
          ></CardModal>
        ))}
      </div>
    </div>
  );
}
