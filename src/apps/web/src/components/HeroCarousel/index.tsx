// src/pages/Home.tsx 또는 HeroSlider.tsx
import { useLandingAnimes } from "../../hooks/useLandingAnime";

export const HeroCarousel = () => {
  const { animes, loading, error } = useLandingAnimes();

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  console.log(animes);

  return (
    <div className="w-full h-[700px] bg-black">
      {animes.map((anime) => (
        <div key={anime.title}>
          <img
            src={anime.backdropUrls[0]}
            className="w-full h-[700px] object-cover"
          />
          <h1 className="text-white text-4xl font-bold">{anime.title}</h1>
          <p className="text-white">{anime.genres.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
