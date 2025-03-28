import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { HeroSlide } from "../components/HeroSlide";
import { useLandingAnimes } from "../hooks/useLandingAnime";
import { GNB } from "../components/GNB";
import { AnimeList } from "../components/AnimeList/AnimeList";

export const LandingPage = () => {
  const { animes, loading, error } = useLandingAnimes();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 10000);
  };
  
  useEffect(() => {
    if (animes.length === 0) return;
    startTimer(); 
  
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [animes.length]);

  if (loading) return 
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
    },
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer(); 
  };
  
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    startTimer(); 
  };


  return (
    <LandingPageWrapper>
      <ContentContainer>
        <CarouselWrapper>
          {slides.map((anime, i) => (
            <HeroSlide
              key={anime.title}
              logo={anime.logo}
              image={anime.image}
              active={i === current}
              positionX={anime.positionX}
              positionY={anime.positionY}
            />
          ))}
          <GNB />
          <ArrowButton left onClick={handlePrev}>
            <ChevronLeft size={40} color="white" />
          </ArrowButton>
          <ArrowButton right onClick={handleNext}>
            <ChevronRight size={40} color="white" />
          </ArrowButton>

          <IndicatorWrapper>
            {slides.map((_, i) => (
              <Indicator key={i} active={i === current} />
            ))}
          </IndicatorWrapper>
        </CarouselWrapper>
        <AnimeSection>
          <AnimeList listType="Trending"/>
          <AnimeList listType="Latest update"/>
          <AnimeList listType="For you"/>
        </AnimeSection>
      </ContentContainer>
      <BottomFill />
    </LandingPageWrapper>
  );
};

const LandingPageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;


const AnimeSection = styled.div`
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
`;



const ArrowButton = styled.button<{ left?: boolean; right?: boolean }>`
  position: absolute;
  top: 347px;
  ${(props) => (props.left ? "left: 48px;" : "right: 48px;")}
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(0, 0, 0, 0);
  color: white;
  font-size: 30px;
  border: none;
  cursor: pointer;
`;

const IndicatorWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  display: flex;
  gap: 8px;
  transform: translateX(-50%);
  z-index: 5;
`;

const Indicator = styled.div<{ active: boolean }>`
  width: 60px;
  height: 10px;
  background-color: ${(props) => (props.active ? "#00F5D4" : "transparent")};
  border: 2px solid #00F5D4;
  transition: background-color 0.3s;
`;

const BottomFill = styled.div`
    height: 150px;
`;