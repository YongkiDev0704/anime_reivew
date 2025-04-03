import styled from "styled-components";

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

    const review = {
        username: "Username",
        ratingScore: 7.28,
        reviewComment: "Comment",
        date: new Date()
    }

    // testUserReviewCards 부분을 나중엔 reviews 로 대체
    const testUserReviewCards = new Array(6).fill(review);

    return (
        <AnimeReviewWrapper>
            <ReviewBanner animeBanner={"https://wallpapercave.com/wp/wp8879962.jpg"}/>
            <ReviewSynops />
            <UserReviewList reviews={testUserReviewCards} />
            <AnimeList listType="Related Content"/>
            <AnimeList listType="Something New"/>
        </AnimeReviewWrapper>
    );
};

const AnimeReviewWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
    padding-bottom: 100px;
`;
