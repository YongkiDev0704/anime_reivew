import styled, { keyframes, css } from "styled-components";

export const SkeletonReviewSynops = () => {
  return (
    <Wrapper>
      <Poster />
      <StoryWrapper>
        <TextWrapper>
          <Header />
          <Synopsis />
          <Synopsis />
          <Synopsis short />
        </TextWrapper>
        <RatingWrapper>
          <RatingIcon />
          <RatingScore />
        </RatingWrapper>
      </StoryWrapper>
    </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  margin: 40px 60px;
`;

const Poster = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 8px;
  ${shimmerStyle}
`;

const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;
  flex: 1;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 120px;
  height: 24px;
  margin-bottom: 24px;
  border-radius: 6px;
  ${shimmerStyle}
`;

const Synopsis = styled.div<{ short?: boolean }>`
  width: ${({ short }) => (short ? "60%" : "100%")};
  height: 16px;
  margin-bottom: 10px;
  border-radius: 4px;
  ${shimmerStyle}
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RatingIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  ${shimmerStyle}
`;

const RatingScore = styled.div`
  width: 80px;
  height: 24px;
  margin-left: 12px;
  border-radius: 4px;
  ${shimmerStyle}
`;
