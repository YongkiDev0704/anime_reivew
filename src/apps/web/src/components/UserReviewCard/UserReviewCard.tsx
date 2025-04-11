import styled from "styled-components";
import userIconDefault from "../../assets/icons/user.svg";

import { Review } from "../../types";

// Receive Review Object and use data that's inside
// OnClick event to open a modal
type UserReviewCardProps = {
    review: Review;
    onClick?: () => void;
} 

export const UserReviewCard = ({review, onClick}: UserReviewCardProps) => {

    const date = new Date(Number(review.updatedAt));
    const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;


    return (
        <UserReviewCardWrapper onClick={onClick}>
            <UserReviewInfoWrapper>
                <UserReviewIdenWrapper>
                    <UserReviewIcon src={review.userIcon? review.userIcon : userIconDefault} alt="User Icon" />
                    <UserReviewNameDate>
                        <UserReviewInfoText>
                            {review.username}
                        </UserReviewInfoText>
                        <UserReviewInfoText>
                            {formattedDate}
                        </UserReviewInfoText>
                    </UserReviewNameDate>
                </UserReviewIdenWrapper>
                <UserReviewRatingBox>
                    <UserRatingScore>
                        {review.review_rating}
                    </UserRatingScore>
                </UserReviewRatingBox>
            </UserReviewInfoWrapper>
            <UserReviewBorder />
            <UserReviewText>
                {review.review_comment}
            </UserReviewText>
        </UserReviewCardWrapper>
    );
};

const UserReviewCardWrapper = styled.section`
    display: flex;
    flex-direction: column;
    background-color: var(--box-background);
    width: ${(props) => props.theme.size.width};
    height: ${(props) => props.theme.size.height};
    border-radius: 25px;
    padding: 16px;
    font-size: 14px;
    color: var(--main-text);
    cursor: pointer;
`;

const UserReviewInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: fit-content;
`;

const UserReviewIdenWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const UserReviewIcon = styled.img`
    width: 27px;
    height: 27px;
    margin-right: 8px;
`;

const UserReviewNameDate = styled.div`
    display: flex;
    flex-flow: column wrap;
`;

const UserReviewRatingBox = styled.div`
    background-color: var(--box-container);
    width: 51px;
    height: 21px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    justify-content: center;
`

const UserRatingScore = styled.p`
    color: var(--main-text);
    font-family: inter;
    font-weight: 400;
`;

const UserReviewBorder = styled.div`
    // border: 1px solid var(--main-text);
    border: none;
    width: 100%;
    height: 0;
    margin: 7px 1px;
    border-radius: 50px;
`;

const UserReviewInfoText = styled.p`
    color: var(--main-text);
`;

const UserReviewText = styled.p`
    color: var(--main-text);
    marigin: 0 3px;
    margin-left: 35px;
`;