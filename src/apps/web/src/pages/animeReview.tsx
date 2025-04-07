import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { GET_REVIEWS_BY_ANILISTID } from "../apollo/reviewQuery";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";

// Anime 객체를 받아와서 사용?
// 일일이 정의 X?
type AnimeReviewProps = {
    // animeName: string;
    // animeBanner: string;
    // animeSynopsis: string;
    // animePoster: string;
    // animeEpisodes: number;
    // animeSeason: number;
    // animePlayDate: Date;
}

export const AnimeReview = ({}: AnimeReviewProps) => {

    const anilist_id = 12345;

    const { data, loading, error } = useQuery(GET_REVIEWS_BY_ANILISTID, {
            variables: { anilist_id }
          });
        
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          if (!data?.getReviewsByAnilistId?.success) return <p>No review found</p>;
        
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
