import styled from "styled-components";

import { Button } from "../Button";

type Props = {
  image: string;
  logo: string;
  active: boolean;
  contentRating?: string | null;
  genres?: string[];
  positionX?: string;
  positionY?: string;
};


export const HeroSlide = ({ logo, image, active, contentRating, genres, positionX = "center", positionY = "center" }: Props) => {
  return (
    <HeroSlideWrapper active={active}>
      <LeftFill active={active}/>
      <Content logoUrl={logo}>
      </Content>
      {(contentRating || genres?.length) && (
      <RatingGenreWrapper>
        {genres && (
          <Genres>
            {contentRating} | {genres
              .flatMap((g) => g.split("&").map((s) => s.trim()))
              .join(", ")}
           </Genres>
          )}
        </RatingGenreWrapper>
      )}
      <ButtonWrapper>
        <Button variant="primary" label="See Review" />
      </ButtonWrapper>
      <ImageContainer imageUrl={image} active={active} positionX={positionX} positionY={positionY}>
        <Overlay />
      </ImageContainer>
    </HeroSlideWrapper>
  );
};

const HeroSlideWrapper = styled.div<{ active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 100%;
  height: 700px;
  background-color: black;
  opacity: ${(props) => (props.active ? 1 : 0)};
  filter: ${(props) => (props.active ? "blur(0px)" : "blur(4px)")};
  transition: opacity 1s ease-in-out, filter 1s ease-in-out;
`;


const LeftFill = styled.div<{ active: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 440px;
  height: 700px;
  background-color: black;
`;

const Content = styled.div<{ logoUrl: string; }>`
  left: 162px;
  top: 146px;
  position: absolute;
  background-image: url(${(props) => props.logoUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center 70%;
  z-index: 3;
  width: 300px;
  height: 273px;
  color: white;
`;

const RatingGenreWrapper = styled.div`
  position: absolute;
  width: 300px;
  top: 440px;
  left: 158px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 19px;
  z-index: 4;
`;

const Genres = styled.p`
  font-size: 14px;
  color: white;
  opacity: 0.8;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 500px;
  left: 200px;
  width: 240px;
  z-index: 100;
`;

const ImageContainer = styled.div<{
  imageUrl: string;
  active: boolean;
  positionX?: string;
  positionY?: string;
}>`
  position: absolute;
  top: 0;
  right: 0;
  width: 1100px;
  max-height: 700px;
  min-height: 700px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: ${(props) =>
  `${props.positionX || "center"} ${props.positionY || "center"}`};
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.4), transparent);
`;

