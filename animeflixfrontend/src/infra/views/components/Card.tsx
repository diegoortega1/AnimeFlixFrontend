interface Props {
  animeURL: string;
}
export function Card({ animeURL }: Props) {
  return (
    <div className="cursor-pointer transform transition-transform duration-200 hover:scale-115">
      <img
        alt="Anime banner"
        className="min-w-60 h-32 object-cover rounded"
        src={animeURL}
      />
    </div>
  );
}
