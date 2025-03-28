import styled from "styled-components";

type UserReviewListProps = {
    maxCard?: number;
    //Reviews: Review;
}

export const UserReviewList ({maxCard}: UserReviewListProps) => {
    return (
        <UserReviewListWrapper>

        </UserReviewListWrapper>
    );
};

const UserReviewListWrapper = styled.section`
    display: flex;
    flex-wrap: wrap;
`;