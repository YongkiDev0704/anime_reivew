import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { HeroSlide } from "../components/HeroSlide";
import { useLandingAnimes } from "../hooks/useLandingAnime";
import { GNB } from "../components/GNB";

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
        {/* {slides.map((_, i) => (
          <IndicatorTwo key={i}>
            <Fill active={i === current} />
          </IndicatorTwo>
        ))} */}
        {/* {slides.map((_, i) => (
          <IndicatorThree key={i} active={i === current} />
        ))} */}
      </IndicatorWrapper>
    </CarouselWrapper>
  );
};

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  background-color: black;
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

const IndicatorTwo = styled.div`
  width: 60px;
  height: 6px;
  background-color: transparent;
  border: 2px solid #00f5d4;
  overflow: hidden;
`;

const Fill = styled.div<{ active: boolean }>`
  height: 100%;
  background-color: #00f5d4;
  width: ${(props) => (props.active ? "100%" : "0%")};
  animation: ${(props) =>
    props.active ? "fillAnimation 1s linear forwards" : "none"};
  transition: width 1s ease-in-out;

  @keyframes fillAnimation {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;

const IndicatorThree = styled.div<{ active: boolean }>`
  width: 60px;
  height: 12px;
  background-color: ${(props) => (props.active ? "#00F5D4" : "transparent")};
  border: 2px solid #00F5D4;
  transition: background-color 1s;
`;