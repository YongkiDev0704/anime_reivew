import styled from "styled-components";

import { ReviewBanner } from "../components/ReviewBanner/ReviewBanner";
import { UserReviewList } from "../components/UserReviewList/UserReviewList";

// Anime 객체를 받아와서 사용?
// 일일이 정의 X?
type ViewALLReviewProps = {
    // animeName: string;
    // animeBanner: string;
    // animeSynopsis: string;
    // animePoster: string;
    // animeEpisodes: number;
    // animeSeason: number;
    // animePlayDate: Date;
}

export const ViewAllReview = ({}: ViewALLReviewProps) => {

    const review = {
        username: "Username",
        ratingScore: 7.28,
        reviewComment: "Comment",
        date: new Date()
    }

    // testUserReviewCards 부분을 나중엔 reviews 로 대체
    const testUserReviewCards = new Array(11).fill(review);

    return (
        <ViewAllReviewWrapper>
            <ReviewBanner animeBanner={"https://wallpapercave.com/wp/wp8879962.jpg"}/>
            <UserReviewList showAll={true} reviews={testUserReviewCards} />
        </ViewAllReviewWrapper>
    );
};

const ViewAllReviewWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
    padding-bottom: 100px;
`;
