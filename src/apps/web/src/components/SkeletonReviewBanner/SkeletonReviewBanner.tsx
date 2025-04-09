import styled, { keyframes, css } from "styled-components";

export const SkeletonReviewBanner = () => {
  return (
    <ReviewBannerWrapper>
      <TitleBlock />
      <RatingBlock />
      <GenreBlock />
      <EpisodeBlock />
      <BannerOverlay />
    </ReviewBannerWrapper>
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

const ReviewBannerWrapper = styled.div`
  position: relative;
  width: 1440px;
  height: 430px;
  background-color: black;
  overflow: hidden;
`;

const TitleBlock = styled.div`
  position: absolute;
  bottom: 110px;
  left: 60px;
  width: 420px;
  height: 48px;
  border-radius: 8px;
  ${shimmerStyle}
`;

const RatingBlock = styled.div`
  position: absolute;
  bottom: 70px;
  left: 60px;
  width: 120px;
  height: 24px;
  border-radius: 6px;
  ${shimmerStyle}
`;

const GenreBlock = styled.div`
  position: absolute;
  bottom: 40px;
  left: 60px;
  width: 300px;
  height: 18px;
  border-radius: 4px;
  ${shimmerStyle}
`;

const EpisodeBlock = styled.div`
  position: absolute;
  bottom: 16px;
  left: 60px;
  width: 150px;
  height: 16px;
  border-radius: 4px;
  ${shimmerStyle}
`;

const BannerOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  ${shimmerStyle}
  z-index: -1;
`;
