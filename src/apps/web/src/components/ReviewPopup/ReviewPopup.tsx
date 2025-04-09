import styled from "styled-components";
import defaultUserIcon from "../../assets/icons/user.svg";
import ratingSushi from "../../assets/icons/rating.svg";

import { Button } from "../Button";
import { Review } from "../../types";
import { ReviewScore } from "../ReviewScore/ReviewScore";


// 3 Different Mode for [Read / Write / Edit]
// Render a component in slightly different way for each mode
// Review Data recieved from Prop
type ReviewPopupProps = {
    mode: "Read" | "Write" | "Edit",
    review?: Review;
}

export const ReviewPopup = ({mode, review}: ReviewPopupProps) => {

    const isReadMode = mode === "Read";

    // set attributes if It's Read Mode
    const username = isReadMode ? review?.username ?? "Unknown User" : "Anonymous";
    const ratingScore = isReadMode ? review?.review_rating ?? "0" : "0";
    const reviewText = isReadMode ? review?.review_comment ?? "Unknown Review" : "";
    const dateInput = isReadMode && review?.updatedAt? new Date(Number(review?.updatedAt)) : new Date();
    const formattedDate = `${dateInput.getFullYear()}.${(dateInput.getMonth() + 1).toString().padStart(2, "0")}.${dateInput.getDate().toString().padStart(2, "0")}`;


    return(
        <ReviewPopupWrapper>
            <ReviewPopupTop>
                <ReviewPopupUser>
                    <ReviewUserIcon src={defaultUserIcon}/>
                    <ReviewPopupUserWrapper>
                        <ReviewPopupInfoText>
                            {username}
                        </ReviewPopupInfoText>
                        <ReviewPopupInfoText>
                            {formattedDate}
                        </ReviewPopupInfoText>
                    </ReviewPopupUserWrapper>
                </ReviewPopupUser>
                <ReviewPopupRatingWrapper>
                    <ReviewScore />
                    {/* <ReviewPopupRatingScore>
                        {ratingScore}
                    </ReviewPopupRatingScore>
                    <ReviewPopupRating src={ratingSushi} /> */}
                </ReviewPopupRatingWrapper>
            </ReviewPopupTop>
            <ReviewPopupTextBox placeholder="Write a review" readOnly={isReadMode}>
                {reviewText}
            </ReviewPopupTextBox>
            <ReviewPopupBottom>
                {!isReadMode && (
                    <Button label="Submit" variant="third" />
                )}
            </ReviewPopupBottom>
        </ReviewPopupWrapper>
    );
};

const ReviewPopupWrapper = styled.section`
    display: flex;
    flex-flow: column wrap;
    width: 860px;
    height: 620px;
    background-color: var(--box-container);
    padding: 20px 20px;
    border-radius: 25px;
`;

const ReviewPopupTop = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ReviewPopupUser = styled.div`
    display:flex;
    align-items: center;
`;

const ReviewUserIcon = styled.img`
    margin: 0 10px;
    width: 50px;
    height: 50px;
`

const ReviewPopupUserWrapper = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin-left: 12px;
`;


const ReviewPopupInfoText = styled.p`
    color: var(--main-text);
`;

const ReviewPopupRatingWrapper = styled.div`
    display: flex;
`;

const ReviewPopupRatingScore = styled.p`
    font-color: var(--main-text);
    margin-right: 5px;
`;

const ReviewPopupRating = styled.img`
    width: 40px;
    height: 40px;
    margin: 0 10px;
`;

const ReviewPopupTextBox = styled.textarea`
    width: 785px;
    height: 428px;
    background-color: var(--box-container);
    border-radius: 25px;
    border: 2px solid var(--popup-border);
    margin: 20px 10px;
    padding: 25px;
    color: var(--main-text);
    font-family: 'Roboto';
    font-size: 16px;
    resize: none;

    &::placeholder {
        color: var(--main-text);
        opacity: 0.65;
    }
`;

const ReviewPopupBottom = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 10px;
`;