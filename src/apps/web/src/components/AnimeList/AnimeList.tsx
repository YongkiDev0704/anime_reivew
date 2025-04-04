import { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimeCard } from "../AnimeCard/AnimeCard";

type AnimeListProps = {
  listType: string;
  data: {
    animeName: string;
    animePhotoURL: string;
    animeRating: number;
  }[];
};

const CARD_WIDTH = 200;
const CARD_GAP = 10;
const VISIBLE_CARDS = 6;
const LEFT_OFFSET = 80;
const RIGHT_OFFSET = 80;
const SLIDER_WIDTH = 1440;

export const AnimeList = ({ listType, data }: AnimeListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = data.length - VISIBLE_CARDS;

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  const totalTranslateX = (CARD_WIDTH + CARD_GAP) * currentIndex;

  return (
    <SliderWrapper>
      <ListTypeLabel>{listType}</ListTypeLabel>

      {currentIndex > 0 && (
        <ArrowButton left onClick={handlePrev}>
          <ChevronLeft size={32} color="white" />
        </ArrowButton>
      )}

      <SliderViewport>
        <CardTrack
          style={{
            transform: `translateX(-${totalTranslateX}px)`,
            paddingLeft: `${LEFT_OFFSET}px`,
            paddingRight: `${RIGHT_OFFSET}px`,
          }}
        >
          {data.map((anime, i) => {
            const cardLeft = i * (CARD_WIDTH + CARD_GAP) - totalTranslateX;
            const cardRight = cardLeft + CARD_WIDTH;

            const isPartiallyVisible =
              cardLeft <= 0.25 * CARD_WIDTH - 100||
              cardRight >= SLIDER_WIDTH - 0.25 * CARD_WIDTH;

            return (
              <CardContainer key={i} dimmed={isPartiallyVisible}>
                <AnimeCard
                  animeName={anime.animeName}
                  animePhotoURL={anime.animePhotoURL}
                  animeRating={anime.animeRating}
                />
              </CardContainer>
            );
          })}
        </CardTrack>
      </SliderViewport>

      {currentIndex < maxIndex && (
        <ArrowButton right onClick={handleNext}>
          <ChevronRight size={32} color="white" />
        </ArrowButton>
      )}
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
  transition: transform 0.4s ease-in-out;
`;

const CardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "dimmed",
})<{ 
  dimmed?: boolean 
}>`
  flex: 0 0 ${CARD_WIDTH}px;
  opacity: ${(props) => (props.dimmed ? 0.4 : 1)};
  transform: ${(props) => (props.dimmed ? "scale(0.96)" : "scale(1)")};
  transition: all 0.3s ease-in-out;
`;

const ArrowButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["left", "right"].includes(prop),
})<{ 
  left?: boolean; 
  right?: boolean 
}>`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? "left: 0px;" : "right: 0px;")}
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
`;
