// hooks/useSeasonalAnime.ts
import { useQuery } from "@apollo/client";
import { GET_WHATS_NEW_ANIME } from "../graphql/anilistQuery";


export const useSeasonalAnime = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const month = now.getMonth() + 1;

  const getSeason = (month: number): "WINTER" | "SPRING" | "SUMMER" | "FALL" => {
    if (month <= 3) return "WINTER";
    if (month <= 6) return "SPRING";
    if (month <= 9) return "SUMMER";
    return "FALL";
  };

  const season = getSeason(month);
  const page = Math.floor(Math.random() * 4) + 1;

  const { data, loading, error } = useQuery(GET_WHATS_NEW_ANIME, {
    variables: {
      season,
      seasonYear: currentYear,
      page,
      perPage: 25,
    },
  });

  const mediaList = data?.Page?.media ?? [];
  const randomFour = mediaList.sort(() => Math.random() - 0.5).slice(0, 4);

  return { animeList: randomFour, loading, error };
};
