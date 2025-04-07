import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_REVIEWS_BY_ANILISTID } from "../graphql/reviewQuery";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";

export const AnimeReview = () => {

    const {id} = useParams<{id: string}>();

    // Parsing String into Number for API Call
    const anilist_id = Number(id);
    // Send user to error page maybe?
    if (isNaN(anilist_id)) {
        return <p>Invalid ID</p>;
    }

    const { data, loading, error } = useQuery(GET_REVIEWS_BY_ANILISTID, {
            variables: { anilist_id }
          });
        
          //   이 부분에서 Loading Skeleton 필요
          if (loading) return <p>Loading...</p>;
          // API Error, maybe move user to error page?
          if (error) return <p>Error: {error.message}</p>;
        
    const reviews = data.getReviewsByAnilistId.data;

    return (
        <AnimeReviewWrapper>
            <ReviewBanner animeBanner={"https://wallpapercave.com/wp/wp8879962.jpg"}/>
            <ReviewSynops />
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
