import styled from "styled-components";
import ratingSushi from "../../assets/icons/rating.svg"
import { AniListAnimeDetail } from "../../types";

type ReviewBannerInfoProps = {
    animeData: AniListAnimeDetail;
}

export const ReviewBanner = ({animeData}: ReviewBannerInfoProps) => {
    
    const getMonthAbbreviation = (month?: number | null): string => {
        if (!month || month < 1 || month > 12) return "";
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1];
    };

    const formatGenres = (genres: string[] | null | undefined): string => {
        if (!genres || genres.length === 0) return "";
        return genres.join(" | ");
    };

    const animeDateInfo = `${getMonthAbbreviation(animeData.startDate?.month)} ${animeData.startDate?.day}, ${animeData.startDate?.year} | ${animeData.season} ${animeData.startDate?.year}`

    return (
        <ReviewBannerWrapper>
            <ReviewAnimeBanner bannerImage={animeData.bannerImage}>
                <ReviewTitleWrapper>
                    <ReviewAnimeTitle>
                        {animeData.title.english? animeData.title.english : animeData.title.romaji}
                    </ReviewAnimeTitle>
                    <ReviewRating src={ratingSushi} />
                    {/* 나중에 우리의 점수로 수정 필요요 */}
                    <ReviewAnimeRating>
                        {animeData.averageScore? animeData.averageScore / 10 : "No Scores Yet"}
                    </ReviewAnimeRating>
                </ReviewTitleWrapper>
                <ReviewAnimeInfo>
                    {animeDateInfo}
                </ReviewAnimeInfo>
                <ReviewAnimeInfo>
                    {formatGenres(animeData.genres)}
                </ReviewAnimeInfo>
                <ReviewAnimeInfo>
                    {animeData.episodes} Episodes
                </ReviewAnimeInfo>
            </ReviewAnimeBanner>
        </ReviewBannerWrapper>
    );
};

const ReviewBannerWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--main-background);
`;

const ReviewAnimeBanner = styled.div<{bannerImage: string | null}>`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    width: 1440px;
    height: 430px;
    background-image: url(${(props) => props.bannerImage});
    background-size: cover;
    background-position: center;
    padding-bottom: 48px;
    
    &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
  }

  > * {
    position: relative;
  }
`;

const ReviewAnimeTitle = styled.h2`
    font-size: 48px;
    font-weight: bold;
    color: var(--main-text);
    margin: 0;
    margin-right: 8px;
`;

const ReviewRating = styled.img`
    width: 40px;
    height: 40px;
`

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
