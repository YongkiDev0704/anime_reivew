import styled from "styled-components";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";
import { AnimeList } from "../components/AnimeList/AnimeList";
import { ReviewPopup } from "../components/ReviewPopup/ReviewPopup";

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

const review = {
    username: "Anonymous",
    ratingScore: 5.81,
    reviewComment: "This was Amazing Anime",
    date: new Date()
}

export const AnimeReview = ({}: AnimeReviewProps) => {
    return (
        <AnimeReviewWrapper>
            <ReviewBanner animeBanner={"https://wallpapercave.com/wp/wp8879962.jpg"}/>
            <ReviewSynops />
            <UserReviewList />
            <AnimeList listType="Related Content"/>
            <AnimeList listType="Something New"/>
            <ReviewPopup mode="Read" review={review} />
        </AnimeReviewWrapper>
    );
};

const AnimeReviewWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
    padding-bottom: 100px;
`;
