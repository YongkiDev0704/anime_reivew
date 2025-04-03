// components/SkeletonAnimeList.tsx
import styled, { keyframes, css } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const shimmerStyle = css`
  background: linear-gradient(90deg, #222 25%, #333 50%, #222 75%);
  background-size: 800px 100%;
  animation: ${shimmer} 1.5s infinite;
`;

const CARD_WIDTH = 200;
const CARD_GAP = 10;
const VISIBLE_CARDS = 6;
const LEFT_OFFSET = 80;
const RIGHT_OFFSET = 80;
const SLIDER_WIDTH = 1440;

export const SkeletonAnimeList = ({ listType }: { listType: string }) => {
  return (
    <SliderWrapper>
      <ListTypeLabel>{listType}</ListTypeLabel>
      <SliderViewport>
        <CardTrack style={{ paddingLeft: `${LEFT_OFFSET}px`, paddingRight: `${RIGHT_OFFSET}px` }}>
          {Array.from({ length: VISIBLE_CARDS }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </CardTrack>
      </SliderViewport>
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div`
  position: relative;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 50px;
`;

const ListTypeLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: ${LEFT_OFFSET}px;
  margin-bottom: 25px;
  color: white;
`;

const SliderViewport = styled.div`
  overflow: hidden;
  width: ${SLIDER_WIDTH}px;
`;

const CardTrack = styled.div`
  display: flex;
  gap: ${CARD_GAP}px;
`;

const CardSkeleton = styled.div`
  flex: 0 0 ${CARD_WIDTH}px;
  height: 300px;
  border-radius: 8px;
  ${shimmerStyle}
`;
