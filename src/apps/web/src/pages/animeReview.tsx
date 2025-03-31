import styled from "styled-components";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../components/ReviewSynops/ReviewSynops";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";

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
    return (
        <AnimeReviewWrapper>
            <ReviewBanner animeBanner={"https://wallpapercave.com/wp/wp8879962.jpg"}/>
            <ReviewSynops />
            <UserReviewList />
        </AnimeReviewWrapper>
    );
};

const AnimeReviewWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
`;
