import styled from "styled-components";

type ReviewSynopsProps = {
    // animePosterURL: string;
    // animeSynopsis: string;
    // animePoster: string;
}

export const ReviewSynops = ({}: ReviewSynopsProps) => {
    return (
            <ReviewAnimeSynopsWrapper>
                <ReviewAnimePoster src="https://i.pinimg.com/originals/4a/d3/89/4ad389052b4cf159fd601ae4dbd4ecbc.png" alt="anime_poster_test"/>
                <ReviewAnimeStoryWrapper>
                    <ReviewAnimeSynopHeader>Synopsis</ReviewAnimeSynopHeader>
                    <ReviewAnimeSynopsis>Test Paragraph ahaskjdfajdslfkjalsdkjflaksdjflkasjdlfkjasd</ReviewAnimeSynopsis>
                </ReviewAnimeStoryWrapper>
            </ReviewAnimeSynopsWrapper>
    );
};


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