import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";
import { GET_REVIEW_ANIME_DATA_BY_ID } from "../graphql/anilistQuery";

export const AnimeReview = () => {

    const {id} = useParams<{id: string}>();

    // Parsing String into Number for API Call
    const anilist_id = Number(id);
    // Send user to error page maybe?
    if (isNaN(anilist_id)) {
        return <p>Invalid ID</p>;
    }

    const {
        data: anilistData,
        loading: anilistLoading,
        error: anilistError,
      } = useQuery(GET_REVIEW_ANIME_DATA_BY_ID, {
        variables: { id: anilist_id },
        context: { clientName: "anilist" },
        fetchPolicy: 'cache-first',
      });
      
          //   이 부분에서 Loading Skeleton 필요
          if (anilistLoading) return <p>Loading...</p>;
          // API Error, maybe move user to error page?
          if (anilistError) return <p>Error: {anilistError.message}</p>;

        const animeData = anilistData.Media;

    const { 
        data: reviewsData, 
        loading: reviewsLoading, 
        error: reviewsError 
    } = useQuery(GET_REVIEWS_BY_ANILISTID, {
            variables: { anilist_id }
          });
        
          //   이 부분에서 Loading Skeleton 필요
          if (reviewsLoading) return <p>Loading...</p>;
          // API Error, maybe move user to error page?
          if (reviewsError) return <p>Error: {reviewsError.message}</p>;
        
    const reviews = reviewsData.getReviewsByAnilistId.data;

    return (
        <AnimeReviewWrapper>
            <ReviewBanner animeData={animeData} />
            <ReviewSynops animeData={animeData} />
            <UserReviewList reviews={reviews} />
            {/* <AnimeList listType="Related Content"/>
            <AnimeList listType="Something New"/> */}
        </AnimeReviewWrapper>
    );
};

const AnimeReviewWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
    padding-bottom: 100px;
`;
