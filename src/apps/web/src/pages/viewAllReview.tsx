import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";
import { GET_REVIEW_ANIME_DATA_BY_ID } from "../graphql/anilistQuery";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";

// Skeletons
import { SkeletonReviewBanner } from "../components/SkeletonReviewBanner/SkeletonReviewBanner";
import { SkeletonReviewList } from "../components/SkeletonReviewList/SkeletonReviewList";

export const ViewAllReview = () => {

    const { id } = useParams<{ id: string }>();
    const anilist_id = Number(id);
    const navigate = useNavigate();

    // Run All GraphQL Hooks at TOP ** TOGETHER **
    const { data: anilistData, loading: anilistLoading, error: anilistError } = useQuery(
        GET_REVIEW_ANIME_DATA_BY_ID,
        {
        variables: { id: anilist_id },
        context: { clientName: "anilist" },
        fetchPolicy: "cache-first",
        skip: isNaN(anilist_id),
        }
    );

    const { data: reviewsData, loading: reviewsLoading, error: reviewsError } = useQuery(
        GET_REVIEWS_BY_ANILISTID,
        {
        variables: { anilist_id },
        fetchPolicy: "network-only",
        }
    );

    if (isNaN(anilist_id)) {
        navigate("/error");
        return null;
    }
    
    // if Data is Loading Show Skeleton
    if (anilistLoading || reviewsLoading ) return renderSkeleton();
    
    // API Request Errors
    if (anilistError) return <p>{anilistError.message}</p>;
    if (reviewsError) return <p>{reviewsError.message}</p>;

    const animeData = anilistData?.Media;
    const reviews = reviewsData?.getReviewsByAnilistId?.data ?? [];

    const animeName = animeData.title.english ? animeData.title.english : animeData.title.romaji;

    return (
        <ViewAllReviewWrapper>
            <ReviewBanner animeData={animeData} />
            <ExtraMargin />
            <UserReviewList showAll={true} reviews={reviews} animeName={animeName} />
        </ViewAllReviewWrapper>
    );
};

const renderSkeleton = () => {
  return (
    <ViewAllReviewWrapper>
      <SkeletonReviewBanner />
      <SkeletonReviewList />
    </ViewAllReviewWrapper>
  );
};


const ViewAllReviewWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
    padding-bottom: 100px;
    margin-bottom: 100px;
`;

const ExtraMargin = styled.div`
    margin: 20px;
`