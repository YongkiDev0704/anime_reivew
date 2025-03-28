import styled from "styled-components";

import { ReviewBanner } from "../ReviewBanner/ReviewBanner";
import { ReviewSynops } from "../ReviewSynops/ReviewSynops";

// Anime 객체를 받아와서 사용?
// 일일이 정의 X?
type ReviewTopInfoProps = {
    // animeName: string;
    animeBanner: string;
    // animeSynopsis: string;
    // animePoster: string;
    // animeEpisodes: number;
    // animeSeason: number;
    // animePlayDate: Date;
}

export const ReviewTopInfo = ({animeBanner}: ReviewTopInfoProps) => {
    return (
        <ReviewTopWrapper>
            <ReviewBanner animeBanner={animeBanner}/>
            <ReviewSynops />
        </ReviewTopWrapper>
    );
};

const ReviewTopWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
`;
