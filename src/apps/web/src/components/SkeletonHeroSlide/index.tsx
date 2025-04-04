import styled, { keyframes, css } from "styled-components";

export const SkeletonHeroSlide = () => {
  return (
    <HeroSlideWrapper>
      <Content />
      <RatingGenreWrapper />
      <ButtonWrapper />
      <ImageContainer>
        <Overlay />
      </ImageContainer>
    </HeroSlideWrapper>
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

const HeroSlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  background-color: black;
  overflow: hidden;
`;

const Content = styled.div`
  position: absolute;
  left: 162px;
  top: 146px;
  width: 300px;
  height: 273px;
  border-radius: 8px;
  ${shimmerStyle}
`;

const RatingGenreWrapper = styled.div`
  position: absolute;
  top: 440px;
  left: 158px;
  width: 300px;
  height: 20px;
  border-radius: 4px;
  ${shimmerStyle}
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 500px;
  left: 200px;
  width: 240px;
  height: 50px;
  border-radius: 6px;
  ${shimmerStyle}
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 14400px;
  height: 700px;
  ${shimmerStyle}
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4), transparent);
`;
