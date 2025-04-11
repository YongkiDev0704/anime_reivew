import styled from "styled-components";
import defaultUserIcon from "../../assets/icons/user.svg";

import { Button } from "../Button";
import { Review } from "../../types";
import { ReviewScore } from "../ReviewScore/ReviewScore";
import { useState } from "react";


// 3 Different Mode for [Read / Write / Edit]
// Render a component in slightly different way for each mode
// Review Data recieved from Prop
type ReviewPopupProps = {
    mode: "Read" | "Write" | "Edit",
    review?: Review;
}

export const ReviewPopup = ({mode, review}: ReviewPopupProps) => {

    
    const isReadMode = mode === "Read";
    const isEditMode = mode === "Edit"
    
    // set attributes if It's Read Mode
    const username = isReadMode || isEditMode ? review?.username ?? "Unknown User" : "Anonymous";
    const ratingScore = isReadMode || isEditMode ? review?.review_rating ?? "" : "";
    const reviewText = isReadMode || isEditMode ? review?.review_comment ?? "Unknown Review" : "";
    const dateInput = isReadMode || isEditMode && review?.updatedAt? new Date(Number(review?.updatedAt)) : new Date();
    const formattedDate = `${dateInput.getFullYear()}.${(dateInput.getMonth() + 1).toString().padStart(2, "0")}.${dateInput.getDate().toString().padStart(2, "0")}`;
    
    const [currentScore, setCurrentScore] = useState(ratingScore);

    const [reviewComment, setReviewComment] = useState(reviewText);

    const [password, setPassword] = useState("");

    const handleReviewCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewComment(event.target.value);
      };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };


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
                    <ReviewScore 
                        score = { currentScore }
                        readOnly={isReadMode}
                        onChange={(value) => {
                            if (mode === "Write" || mode === "Edit") {
                              setCurrentScore(value);
                            }
                        }}
                    />
                </ReviewPopupRatingWrapper>
            </ReviewPopupTop>
            <ReviewPopupTextBox 
                placeholder="Write a review" 
                readOnly={isReadMode}
                value={reviewComment}
                onChange={handleReviewCommentChange} />
            {!isReadMode && (
                <ReviewPopupBottom>
                    <ReviewPasswordInput placeholder="Enter a Password" type="password" value={password} onChange={handlePasswordChange}/>
                    <Button label="Submit" variant="third" />
                </ReviewPopupBottom>
            )}
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
    gap: 12px;
`;

const ReviewPasswordInput = styled.input`
    width: 220px;
    height: 36px;
    background-color: var(--box-background);
    border-radius: 15px;
    color: var(--main-text);
    // font-color: var(--box-container);
    border: none;
    outline: none;
    text-align: center;
    vertical-align: middle;
    padding: 0 8px;
`;