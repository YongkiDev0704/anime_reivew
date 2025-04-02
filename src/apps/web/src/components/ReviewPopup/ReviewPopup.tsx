import styled from "styled-components";
import defaultUserIcon from "../../assets/icons/user.svg";
import ratingSushi from "../../assets/icons/rating.svg";

import { Button } from "../Button";

// 3가지 mode 로 실행 Read / Write / Edit
// 경우에 따라 다른식으로 component 구성을 살짝 바꾸는 형식으로 만들기 ㄱㄱ
// 대충 Prop Input은 Mode, 이미 작성되어있는경우는 작성되어있는 글의 정보 (글,Rating 등등) 정도?

type Review = {
    username: string,
    ratingScore: number,
    reviewComment: string,
    userIcon?: string,
    date: Date;
}

type ReviewPopupProps = {
    mode: "Read" | "Write" | "Edit",
    review?: Review;
}

export const ReviewPopup = ({mode, review}: ReviewPopupProps) => {

    const isReadMode = mode === "Read";

    // set attributes if It's Read Mode
    const username = isReadMode ? review?.username ?? "Unknown User" : "Anonymous";
    const ratingScore = isReadMode ? review?.ratingScore ?? "0" : "0";
    const reviewText = isReadMode ? review?.reviewComment ?? "Unknown Review" : "";
    const dateInput = (isReadMode ? review?.date?? new Date() : new Date());
    const formattedDate = `${dateInput.getFullYear()}.${(dateInput.getMonth() + 1).toString().padStart(2, "0")}.${dateInput.getDate().toString().padStart(2, "0")}`;


    return(
        <ReviewPopupWrapper>
            {/* Icon / UserName /// Rating Score */}
            {/* Text Box Area */}
            {/* Submit Button */}
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
                    <ReviewPopupRatingScore>
                        {ratingScore}
                    </ReviewPopupRatingScore>
                    <ReviewPopupRating src={ratingSushi} />
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