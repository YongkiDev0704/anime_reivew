
import { useQuery } from "@apollo/client";
import { GET_RELATED_CONTENT_ANIME } from "../graphql/anilistQuery";

type RedlatedContentAnimeProb = {
    genre: string;
}

export const RelatedContentAnime = ({ genre }: RedlatedContentAnimeProb) => {

  // Pick 1 page within Top 6 Best Score Page
  const page = Math.floor(Math.random() * 6) + 1;

  const { data, loading, error } = useQuery(GET_RELATED_CONTENT_ANIME, {
    variables: {
      genre,
      page,
      perPage: 6,
    },
    context: { clientName: "anilist" },
    fetchPolicy: 'cache-first',
  });

  const mediaList = data?.Page?.media ?? [];
  // Randomly pick 4 Animes for What's New from the selected page
  const randomFive = [...mediaList].sort(() => Math.random() - 0.5).slice(0, 5);


  return { randomFive, loading, error };
};
