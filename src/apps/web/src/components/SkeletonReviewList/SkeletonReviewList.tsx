import styled, { keyframes, css } from "styled-components";

export const SkeletonReviewList = () => {
  return (
    <UserReviewListWrapper>
      <UserReviewHead>Review</UserReviewHead>
      <UserCardListWrapper $expanded={false} $viewAll={false}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </UserCardListWrapper>
    </UserReviewListWrapper>
  );
};

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const shimmerStyle = css`
  background: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

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
`;

const UserCardListWrapper = styled.div<{$expanded: boolean; $viewAll: boolean}>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: ${({ $viewAll }) => ($viewAll ? "center" : "none")};
  gap: ${({ $viewAll }) => ($viewAll ? "20px" : "15px")};
  overflow: hidden;
  max-height: ${({ $viewAll, $expanded }) =>
    $viewAll ? "none" : $expanded ? "450px" : "225px"};
  transition: max-height 0.5s ease-in-out;
`;

const SkeletonCard = styled.div`
  width: 398px;
  height: 180px;
  border-radius: 8px;
  ${shimmerStyle}
  margin-bottom: 15px;
`;

