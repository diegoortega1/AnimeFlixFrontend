export function LoaderScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-6xl font-extrabold text-red-600 tracking-wide mb-6 select-none">
        Animeflix
      </h1>
      <div className="w-16 h-16 border-4 border-t-red-600 border-gray-700 rounded-full animate-spin"></div>
    </div>
  );
}
