
import { useQuery } from "@apollo/client";
import { GET_WHATS_NEW_ANIME } from "../graphql/anilistQuery";


export const WhatsNewAnime = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const month = now.getMonth() + 1;

  // Find current season based on a today's date
  const getSeason = (month: number): "WINTER" | "SPRING" | "SUMMER" | "FALL" => {
    if (month <= 2) return "WINTER";
    if (month <= 5) return "SPRING";
    if (month <= 8) return "SUMMER";
    return "FALL";
  };

  const season = getSeason(month);
  // Pick 1 page within Top 4 Best Score Page
  const page = Math.floor(Math.random() * 4) + 1;

  const { data, loading, error } = useQuery(GET_WHATS_NEW_ANIME, {
    variables: {
      season,
      seasonYear: currentYear,
      page,
      perPage: 10,
    },
    context: { clientName: "anilist" },
    fetchPolicy: 'cache-first',
  });

  const mediaList = data?.Page?.media ?? [];
  // Randomly pick 4 Animes for What's New from the selected page
  const randomFour = [...mediaList].sort(() => Math.random() - 0.5).slice(0, 4);


  return { randomFour, loading, error };
};
