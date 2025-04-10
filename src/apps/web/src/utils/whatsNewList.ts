import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_WHATS_NEW_ANIME } from "../graphql/anilistQuery";

export const useWhatsNewAnime = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const month = now.getMonth() + 1;

  const getSeason = (month: number): "WINTER" | "SPRING" | "SUMMER" | "FALL" => {
    if (month <= 2 || month === 12) return "WINTER";
    if (month <= 5) return "SPRING";
    if (month <= 8) return "SUMMER";
    return "FALL";
  };

  const season = getSeason(month);

  // 랜덤 page는 최초 1번만 계산되게 고정
  const page = useMemo(() => Math.floor(Math.random() * 4) + 1, []);

  const { data, loading, error } = useQuery(GET_WHATS_NEW_ANIME, {
    variables: {
      season,
      seasonYear: currentYear,
      page,
      perPage: 10,
    },
    context: { clientName: "anilist" }
  });

  const mediaList = data?.Page?.media ?? [];

  const randomFour = useMemo(() => {
    return [...mediaList].sort(() => Math.random() - 0.5).slice(0, 4);
  }, [mediaList]);

  return { randomFour, loading, error };
};
