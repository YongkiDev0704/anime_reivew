import styled from "styled-components";

// Anime 객체를 받아와서 사용?
// 일일이 정의 X?
type ReviewTopInfoProps = {
    animeName: string;
    animeBanner: string;
    animeSynopsis: string;
    animePoster: string;
    // animeEpisodes: number;
    // animeSeason: number;
    // animePlayDate: Date;
}

export const ReviewTopInfo = ({animeName, animeBanner, animeSynopsis, animePoster}: ReviewTopInfoProps) => {
    return (
        <ReviewTopWrapper>
            <ReviewTopBanner bannerImage={animeBanner}>

            </ReviewTopBanner>
        </ReviewTopWrapper>
    );
};

const ReviewTopWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const ReviewTopBanner = styled.div<{bannerImage: string}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    width: 1440px;
    height: 430px;
    background-image: url(${(props) => props.bannerImage});
    background-size: cover;
    background-position: center;
`;

