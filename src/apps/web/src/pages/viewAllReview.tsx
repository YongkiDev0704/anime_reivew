import { useQuery } from "@apollo/client";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";

import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";
import { SkeletonReviewList } from "../components/SkeletonReviewList/SkeletonReviewList";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";

import type { AniListAnimeDetail } from "../types";

type OutletContextType = {
  animeData: AniListAnimeDetail;
};

export const ViewAllReview = () => {
  const { id } = useParams<{ id: string }>();
  const anilist_id = Number(id);
  const navigate = useNavigate();
  const { animeData } = useOutletContext<OutletContextType>();

  const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useQuery(
    GET_REVIEWS_BY_ANILISTID,
    {
      variables: { anilist_id },
      fetchPolicy: "network-only",
    }
  );

  useEffect(() => {
    if (isNaN(anilist_id)) {
      navigate("/error");
    }
  }, [anilist_id]);

  if (reviewsLoading) return renderSkeleton();
  if (reviewsError) return <p>{reviewsError.message}</p>;

  const reviews = reviewsData?.getReviewsByAnilistId?.data ?? [];
  const animeName = animeData.title.english || animeData.title.romaji;

  return (
    <ViewAllReviewWrapper>
      <ExtraMargin />
      <UserReviewList
        showAll={true}
        reviews={reviews}
        animeName={animeName}
        animeId={animeData.id}
        viewAllButton={false}
      />
    </ViewAllReviewWrapper>
  );
};

const renderSkeleton = () => {
  return (
    <ViewAllReviewWrapper>
      <SkeletonReviewList />
    </ViewAllReviewWrapper>
  );
};

const ViewAllReviewWrapper = styled.section`
  display: flex;
  flex-direction: column;
  background-color: var(--main-background);
  padding: 0 84px;
  padding-bottom: 100px;
  margin-bottom: 100px;
`;

const ExtraMargin = styled.div`
  margin: 20px;
`;
