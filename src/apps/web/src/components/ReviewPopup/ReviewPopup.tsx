import styled from "styled-components";
import defaultUserIcon from "../../assets/icons/user.svg";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_USER_REVIEW, WRITE_NEW_USER_REVIEW } from "../../graphql/reviewQuery";
// Components
import { Button } from "../Button";
import { Review } from "../../types";
import { ReviewScore } from "../ReviewScore/ReviewScore";
import { useParams } from "react-router-dom";
import { ReviewDropDown } from "../ReviewDropDown/ReviewDropDown";

// 3 Different Mode for [Read / Write / Edit]
// Review Data recieved from Prop
type ReviewPopupProps = {
    mode: "Read" | "Write" | "Edit",
    review?: Review | null;
    animeName: String;
    closePopup: () => void;
}

export const ReviewPopup = ({mode, review, animeName, closePopup}: ReviewPopupProps) => {

    const { id } = useParams<{ id: string }>();
    const anilist_id = Number(id);

    type ActionMode = "None" | "Edit" | "Delete";
    const [actionMode, setActionMode] = useState<ActionMode>("None");
    
    const isReadMode = mode === "Read";
    const isEditMode = mode === "Edit";
    const isWriteMode = mode === "Write";

    const isReadOnly = mode === "Read" && actionMode === "None";

    const [writeReview] = useMutation(WRITE_NEW_USER_REVIEW, {
        refetchQueries: ['GetReviewsByAnilistId'],
    });
    const [editReview] = useMutation(EDIT_USER_REVIEW, {
        refetchQueries: ['GetReviewsByAnilistId'],
    });
    
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

    const handleSubmit = async () => {
        if (!currentScore || !reviewComment || !password) {
            alert("Please fill in all empty fields.");
            return;
        }

        try {
            if (isWriteMode) {
              const response = await writeReview({
                variables: {
                  username: username,
                  review_rating: currentScore,
                  review_comment: reviewComment,
                  review_password: password,
                  anilist_id: anilist_id,
                  anime_name: animeName,
                }
              });
              if (response.data.createReview.success) {
                closePopup();
              } else {
                alert("Failed to Write a review: " + response.data.createReview.error);
              }
            } else if (actionMode === "Edit" && review && currentScore && reviewComment) {
              const response = await editReview({
                variables: {
                  id: review?.id,
                  review_rating: currentScore.toString(),
                  review_comment: reviewComment,
                  review_password: password,
                }
              });
              if (response.data.editReview.success) {
                closePopup();
              } else {
                alert("Failed To Edit a review: " + response.data.editReview.error);
              }
            } else if (actionMode === "Delete" && review) {
                // // Delete 뮤테이션 작업해야하는 부분
                // const response = await deleteReview({
                //   variables: {
                //     id: review.id,
                //     review_password: password,
                //   },
                // });
                // if (response.data.deleteReview.success) {
                //   closePopup();
                // } else {
                //   alert("Failed to delete review: " + response.data.deleteReview.error);
                // }
              }
          } catch (err) {
            console.error("Error:", err);
          }
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
                        readOnly={isReadOnly}
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
                readOnly={isReadOnly}
                value={reviewComment}
                onChange={handleReviewCommentChange} />
            <ReviewPopupBottom>
                {(isWriteMode && actionMode === "None") && (
                    <Button 
                    label = "Post a Review"
                    variant="third"
                    onClick={handleSubmit}
                    />
                )}
                {(actionMode !== "None") && (
                    <>
                        <ReviewPasswordInput
                        placeholder="Enter a Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        />
                        <Button
                        label={actionMode === "Edit" ? "Edit" : "Delete"}
                        variant="third"
                        onClick={handleSubmit}
                        />
                    </>
                )}
                { isReadMode && (
                    <ReviewDropDown
                    onEdit={() => {
                        setActionMode("Edit");
                    }}
                    onDelete={() => {
                        setActionMode("Delete");
                    }}
                    />
                )}
            </ReviewPopupBottom>
        </ReviewPopupWrapper>
    );
};

const ReviewPopupWrapper = styled.section`
    display: flex;
    flex-flow: column wrap;
    width: 720px;
    height: 500px;
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
    width: 90%;
    height: 62.5%;
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
    width: 200px;
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