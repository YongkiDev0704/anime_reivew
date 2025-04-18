import styled from "styled-components";
import ratingSushi from "../../assets/icons/rating.svg"
import anilistIcon from "../../assets/icons/anilist.svg"
import { AniListAnimeDetail } from "../../types";

type ReviewSynopsProps = {
    animeData: AniListAnimeDetail;
    anigiriScore: string;
}

export const ReviewSynops = ({animeData, anigiriScore}: ReviewSynopsProps) => {

    const stripHtmlTags = (text: string | null | undefined): string => {
        if (!text) return "";
        return text.replace(/<[^>]*>/g, "").trim();
    };

    return (
            <ReviewAnimeSynopsWrapper>
                <ReviewAnimePoster src={animeData.coverImage.large} alt={`${animeData.title} anime poster`} />
                <ReviewAnimeStoryWrapper>
                    <ReviewSynopTextWrapper>
                        <ReviewAnimeSynopHeader>Synopsis</ReviewAnimeSynopHeader>
                        <ReviewAnimeSynopsis>
                            {stripHtmlTags(animeData.description)}
                        </ReviewAnimeSynopsis>
                    </ReviewSynopTextWrapper>
                    <ReviewRatingWrapper>
                        <ReviewRating src={ratingSushi} width={40} height={40}/>
                        <ReviewRatingScore>
                            {anigiriScore? anigiriScore : "No Scores Yet"}
                        </ReviewRatingScore>
                        <ReviewRating src={anilistIcon} width={30} height={30}/>
                        <ReviewRatingScore>
                            {animeData.averageScore? animeData.averageScore / 10 : "No Scores Yet"}
                        </ReviewRatingScore>
                    </ReviewRatingWrapper>
                </ReviewAnimeStoryWrapper>
            </ReviewAnimeSynopsWrapper>
    );
};


const ReviewAnimeSynopsWrapper = styled.div`
    display: flex;
    margin: 40px 60px;
    z-index: 1;
`;

const ReviewAnimePoster = styled.img`
    width: 300px;
    height: 400px;
`;

const ReviewAnimeStoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

const ReviewRating = styled.img`
    margin-right: 3px;
`

const ReviewSynopTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
`;

const ReviewRatingWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
`

const ReviewRatingScore = styled.p`
    font-size: 24px;
    font-weight: 700;
    color: var(--main-text);
    margin: 0;
    margin-right: 40px;
`