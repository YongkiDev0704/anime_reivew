import { useEffect, useState } from "react";
import styled from "styled-components";

import { HeroSlide } from "../components/HeroSlide";
import { useLandingAnimes } from "../hooks/useLandingAnime";

export const LandingPage = () => {
  const { animes, loading, error } = useLandingAnimes();
  const [current, setCurrent] = useState(0);
  
  useEffect(() => {
    if (animes.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % animes.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [animes.length]);
  
  if (loading) return ;
  if (error) return <p>{error}</p>;
  
  const slides = [
    {
      ...animes[0],
      image: animes[0].posterUrls[5] || animes[0].posterUrls[0],
      logo: animes[0].logoUrl,
      positionX: "0%",
      positionY: "25%",
    },
    {
      ...animes[1],
      image: animes[1].posterUrls[4] || animes[1].posterUrls[0],
      logo: animes[1].logoUrl,
      positionX: "center",
      positionY: "50%",
    },
    {
      ...animes[2],
      image: animes[2].backdropUrls[0],
      logo: animes[2].logoUrl,
      positionX: "10%",
      positionY: "center",
    }
  ];
  
  return (
    <CarouselWrapper>
      {slides.map((anime, i) => (
        <HeroSlide
          logo={anime.logoUrl}
          image={anime.image}
          active={i === current}
          positionX={anime.positionX}
          positionY={anime.positionY}
        />
      
      ))}
    </CarouselWrapper>
  );
  
};

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  background-color: black;
  ;
`;
