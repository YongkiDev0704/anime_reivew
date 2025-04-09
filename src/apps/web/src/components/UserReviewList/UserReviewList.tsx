import styled, { ThemeProvider } from "styled-components";

import { useEffect, useState } from "react";
import { UserReviewCard } from "../UserReviewCard/UserReviewCard";
import { Review } from "../../types";
import { ReviewPopup } from "../ReviewPopup/ReviewPopup";
import { ExtendListButton } from "../ExtendListButton/ExtendListButton";

type UserReviewListProps = {
    showAll?: boolean;
    reviews: Review[];
}

export const UserReviewList = ({showAll, reviews}: UserReviewListProps) => {

    // Review is Empty (undefined)
    if (!reviews || reviews.length === 0) {
        return (
            <UserReviewListWrapper>
                <UserReviewHead>Reviews</UserReviewHead>
                <p>There are No Reviews yet!</p>
                {/* Ask for Review (ReviewCard) */}
            </UserReviewListWrapper>
        );
    }
    
    const size = {
        defaultSize: {width: "398px", height: "180px"},
        viewAllSize: {width: "534px", height: "180px"}
    }
    
    // State to track of Clicked or Selected Review to Show a Modal
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    
        // Popup Related Methods to open and close
        const openReviewPopup = (review: Review) => {
            console.log("Review clicked:", review);
            setSelectedReview(review);
        };
        const closeReviewPopup = () => {
            setSelectedReview(null);
        };
        
        // Close the Modal when ESC is Pressed
        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    closeReviewPopup();
                }
            };
    
            document.addEventListener("keydown", handleKeyDown);
            return () => {
                document.removeEventListener("keydown", handleKeyDown);
            };
        }, [selectedReview]);
    
    // If we have less or only 3 Reviews show.
    // We don't need to Show Chevron Button (ExtendListButton)
    if (reviews.length <= 3) {
        return (
            <UserReviewListWrapper>
                <UserReviewHead>Review</UserReviewHead>
                <UserCardListWrapper $expanded={false} $viewAll={showAll ?? false}>
                    <ThemeProvider theme={{ size: showAll ? size.viewAllSize : size.defaultSize }}>
                        {reviews.map((review) => (
                            <UserReviewCard review={review} key={review.id} onClick={() => openReviewPopup(review)} />
                        ))}
                    </ThemeProvider>
                </UserCardListWrapper>

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
    }

    let visibleReviewNumber = 3; // This is the Number we limit the number of Reviews to Show in Single Row

    // If this is Show All Page, Every Review will be visible
    if(showAll){
        visibleReviewNumber = reviews.length;
    }

    // State to track of shown number of Reviews between 3,6
    const [visibleReviewCard, setVisibleReviewCard] = useState<number>(visibleReviewNumber);

    // Number of Visible Reviews in current State
    const toggleVisibleReviews = () => {
        setVisibleReviewCard((prevReviewNumber) => 
            prevReviewNumber === 3 ? 6 : 3
        );
    };

    return (
        <UserReviewListWrapper>
            <UserReviewHead>
                Review
            </UserReviewHead>
            <UserCardListWrapper $expanded={visibleReviewCard <= 6} $viewAll={showAll ?? false}>
                {/* Slice the Reviews into either 3,6 (most case) and show */}
                <ThemeProvider theme={{size: showAll? size.viewAllSize : size.defaultSize}} >
                    {reviews.slice(0, visibleReviewCard).map((review) => (
                        <UserReviewCard review={review} key={review.id} onClick={() => openReviewPopup(review)} />
                    ))} 
                </ThemeProvider>
            </UserCardListWrapper>

            {/* Render a Extend Button if This isn't viewAll Page */}
            {!showAll && (
                    <ExtendListButton visibleItems={visibleReviewCard} toggleExtend={3} onToggle={toggleVisibleReviews}/>
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
    z-index: 1;
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