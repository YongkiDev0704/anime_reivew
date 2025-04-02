import styled, { ThemeProvider } from "styled-components";

import { useState } from "react";
import { UserReviewCard } from "../UserReviewCard/UserReviewCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Review } from "../../types";
import { ReviewPopup } from "../ReviewPopup/ReviewPopup";

type UserReviewListProps = {
    showAll?: boolean;
    reviews: Review[];
}

export const UserReviewList = ({showAll, reviews}: UserReviewListProps) => {

    
    let reviewNumber = 3;
    const size = {
        defaultSize: {width: "398px", height: "180px"},
        viewAllSize: {width: "534px", height: "180px"}
    }

    if(showAll){
        reviewNumber = reviews.length;
    }

    // State to track of shown number of Reviews between 3,6
    const [visibleReviewCard, setVisibleReviewCard] = useState<number>(reviewNumber);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);

    // Reviews
    const toggleVisibleReviews = () => {
        setVisibleReviewCard((prevReviewNumber) => 
            prevReviewNumber === 3 ? 6 : 3
        );
    };

    // Popup Related Methods to open and close
    const openReviewPopup = (review: Review) => {
        setSelectedReview(review);
    };
    const closeReviewPopup = () => {
        setSelectedReview(null);
    };

    return (
        <UserReviewListWrapper>
            <UserReviewHead>
                Review
            </UserReviewHead>
            <UserCardListWrapper $expanded={visibleReviewCard <= 6} $viewAll={showAll ?? false}>
                {/* Slice the Reviews into either 3,6 (most case) and show */}
                <ThemeProvider theme={{size: showAll? size.viewAllSize : size.defaultSize}} >
                    {reviews.slice(0, visibleReviewCard).map((review, i) => (
                        <UserReviewCard review={review} key={i} onClick={() => openReviewPopup(review)} />
                    ))} 
                </ThemeProvider>
            </UserCardListWrapper>

            {/* Render if This isn't viewAll Page */}
            {!showAll && (
                    <ExtendButtonWrapper>
                        {/* Show either Up or Down button depends on the number of Review Shown */}
                        {(visibleReviewCard === 3 ? 
                            <ChevronDown onClick={toggleVisibleReviews} size={32} color="white"/> :
                            <ChevronUp onClick={toggleVisibleReviews} size={32} color="white"/>)}
                    </ExtendButtonWrapper>
            )}

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
    margin: 0 60px;
`;

const UserReviewHead = styled.h2`
    color: var(--main-text);
    font-size: 32px;
`

const UserCardListWrapper = styled.div< {$expanded: boolean; $viewAll: boolean} >`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: ${({ $viewAll }) => ($viewAll ? "center" : "none")};
    gap: ${({ $viewAll }) => ($viewAll ? "20px" : "15px")};
    overflow: hidden;
    max-height: ${({ $viewAll, $expanded }) => 
        $viewAll ? "none" : ($expanded ? "450px" : "225px")};
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