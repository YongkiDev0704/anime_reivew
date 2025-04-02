import styled from "styled-components";

import { useState } from "react";
import { UserReviewCard } from "../UserReviewCard/UserReviewCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Review } from "../../types";
import { ReviewPopup } from "../ReviewPopup/ReviewPopup";

type UserReviewListProps = {
    showAll?: boolean;
    //reviews: Review;
}

export const UserReviewList = ({showAll}: UserReviewListProps) => {

    if(!showAll){
        // 이 경우엔 3,6개를 보여주는게 아니라 모든 리뷰 보여주기.
    }

    let reviewNumber = 3;
    // 나중엔 reviewNumber 를 reviewLength 가 3보다 작을경우나 6보다 작을경우 처리

    // State to track of shown number of Reviews between 3,6
    const [visibleReviewCard, setVisibleReviewCard] = useState<number>(reviewNumber);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    // Reviews
    const toggleVisibleReviews = () => {
        setVisibleReviewCard((prevReviewNumber) => 
            prevReviewNumber === 3 ? 6 : 3
        );
    };

        const review = {
            username: "Username",
            ratingScore: 7.28,
            reviewComment: "Comment",
            date: new Date()
        }

    // testUserReviewCards 부분을 나중엔 reviews 로 대체
    const testUserReviewCards = new Array(6).fill(review);

    // Popup Related Methods to open and close
    const openReviewPopup = (review: Review) => {
        setSelectedReview(review);
    };
    const closeReviewPopup = () => {
        setSelectedReview(null);
    };

    return (
        <UserReviewListWrapper>
            <UserCardListWrapper $expanded={visibleReviewCard === 6}>
                {/* Slice the Reviews into either 3,6 (most case) and show */}
                {testUserReviewCards.slice(0, visibleReviewCard).map((review, i) => (
                    <UserReviewCard review={review} key={i} onClick={() => openReviewPopup(review)} />
                ))} 
            </UserCardListWrapper>
            <ExtendButtonWrapper>
                {/* Show either Up or Down button depends on the number of Review Shown */}
                {(visibleReviewCard === 3 ? 
                    <ChevronDown onClick={toggleVisibleReviews} size={32} color="white"/> :
                     <ChevronUp onClick={toggleVisibleReviews} size={32} color="white"/>)}
            </ExtendButtonWrapper>

            {/* Modal: Show ReviewPopup When Clicked */}
            {selectedReview && (
                <ReviewPopupOverlay onClick={closeReviewPopup}>
                    <ReviewPopupContent onClick={(e) => e.stopPropagation()}>
                        <ReviewPopup mode="Read" review={selectedReview} />
                    </ReviewPopupContent>
                </ReviewPopupOverlay>
            )}
        </UserReviewListWrapper>
    );
};

const UserReviewListWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`;

const UserCardListWrapper = styled.div< {$expanded: boolean} >`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 60px;
    gap: 15px;
    overflow: hidden;
    max-height: ${({ $expanded }) => ($expanded ? "450px" : "225px")};
    transition: max-height 0.5s ease-in-out;
`

const ExtendButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
`
// Outer area of Modal
const ReviewPopupOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ReviewPopupContent = styled.div`
    position: relative;
`;