import { useLazyQuery } from "@apollo/client";

import { SEARCH_ANIME } from "../graphql/queries";

export const useSearchAnime = () => {
  const [searchAnime, { data, loading }] = useLazyQuery(SEARCH_ANIME, {
    context: { clientName: "anilist" },
    fetchPolicy: "cache-first",
  });

  return {
    searchAnime,
    results: data?.Page?.media || [],
    loading,
  };
};