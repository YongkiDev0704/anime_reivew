import { useEffect, useState } from "react";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { GET_TRENDING_ANIME } from "../graphql/queries";

export const useTrendingAnimes = () => {
  const client = useApolloClient();
  const [animes, setAnimes] = useState<any[]>([]);
  const [loadQuery, { data, loading, error }] = useLazyQuery(GET_TRENDING_ANIME, {
    context: { clientName: "anilist" },
    fetchPolicy: "cache-first",
  });

  useEffect(() => {
    try {
      const cached = client.readQuery({
        query: GET_TRENDING_ANIME,
      });
      
      if (cached?.Page?.media?.length) {
        setAnimes(cached.Page.media);
      } else {
        loadQuery();
      }
    } catch (e) {
      loadQuery();
    }
  }, []);

  useEffect(() => {
    if (data?.Page?.media) {
      setAnimes(data.Page.media);
    }
  }, [data]);

  return { animes, loading, error };
};
