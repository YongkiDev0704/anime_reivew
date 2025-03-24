import styled from "styled-components";

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
            <ReviewTopBanner bannerImage={animeBanner}>
                <ReviewTitleWrapper>
                    <ReviewAnimeTitle>
                        AnimeTitle Here
                    </ReviewAnimeTitle>
                    <p>Star</p>
                    <ReviewAnimeRating>
                        8.63
                    </ReviewAnimeRating>
                </ReviewTitleWrapper>
                <ReviewAnimeInfo>
                    Oct 4, 2024 | Fall 2024
                </ReviewAnimeInfo>
                <ReviewAnimeInfo>
                    Action | Comedy | Drama | Romance
                </ReviewAnimeInfo>
                <ReviewAnimeInfo>
                    12 Episodes
                </ReviewAnimeInfo>
            </ReviewTopBanner>
            <ReviewAnimeSynopsWrapper>
                <ReviewAnimePoster src="https://i.pinimg.com/originals/4a/d3/89/4ad389052b4cf159fd601ae4dbd4ecbc.png" alt="anime_poster_test"/>
                <ReviewAnimeStoryWrapper>
                    <ReviewAnimeSynopHeader>Synopsis</ReviewAnimeSynopHeader>
                    <ReviewAnimeSynopsis>Test Paragraph ahaskjdfajdslfkjalsdkjflaksdjflkasjdlfkjasd</ReviewAnimeSynopsis>
                </ReviewAnimeStoryWrapper>
            </ReviewAnimeSynopsWrapper>
        </ReviewTopWrapper>
    );
};

const ReviewTopWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
`;

const ReviewTopBanner = styled.div<{bannerImage: string}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    width: 1440px;
    height: 430px;
    background-image: url(${(props) => props.bannerImage});
    background-size: cover;
    background-position: center;
`;

const ReviewAnimeTitle = styled.h2`
    font-size: 48px;
    font-weight: bold;
    color: var(--main-text);
    margin: 0;
`;

const ReviewTitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 60px;
`;

const ReviewAnimeRating = styled.h3`
    font-size: 24px;
    font-weight: bold;
    color: var(--main-text);
    margin: 0 4px;
`;

const ReviewAnimeInfo = styled.p`
    font-size: 16px;
    color: var(--main-text);
    margin: 4px 60px;
`;

const ReviewAnimeSynopsWrapper = styled.div`
    display: flex;
    margin: 40px 60px;
`;

const ReviewAnimePoster = styled.img`
    width: 300px;
    height: 400px;
`;

const ReviewAnimeStoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    margin-left: 40px;
`;

const ReviewAnimeSynopHeader = styled.p`
    font-size: 24px;
    color: var(--main-text);
    margin: 0;
    margin-bottom: 24px;
`

const ReviewAnimeSynopsis = styled.p`
    font-size: 16px;
    color: var(--main-text);
    margin: 0;
`;