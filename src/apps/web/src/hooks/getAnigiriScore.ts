import { useQuery } from "@apollo/client";
import { GET_ANIGIRI_SCORE_AVERAGE } from "../graphql/reviewQuery";

type AnigiriScoreProps = {
    anilist_id: number;
}

export const getAnigiriScore = ({anilist_id}: AnigiriScoreProps) => {

  const { data, loading, error } = useQuery(GET_ANIGIRI_SCORE_AVERAGE, {
    variables: { anilist_id },
      fetchPolicy: "cache-first"
  });

  return { data, loading, error };
};
