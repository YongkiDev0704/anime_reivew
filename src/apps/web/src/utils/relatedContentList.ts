import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_RELATED_CONTENT_ANIME } from "../graphql/anilistQuery";

export const useRelatedContentAnime = (genre: string) => {
  // 이 페이지 랜덤 값은 최초 1회만 고정되도록 useMemo로 감싸줌! ****
  const page = useMemo(() => Math.floor(Math.random() * 6) + 1, []);
  
  const { data, loading, error } = useQuery(GET_RELATED_CONTENT_ANIME, {
    variables: {
      genre,
      page,
      perPage: 6,
    },
    context: { clientName: "anilist" }
  });
  
  const mediaList = data?.Page?.media ?? [];

  const randomFive = useMemo(() => {
    return [...mediaList].sort(() => Math.random() - 0.5).slice(0, 5);
  }, [mediaList]);

  return { randomFive, loading, error };
};
