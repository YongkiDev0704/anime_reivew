// LandingPage.tsx
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@apollo/client";

import { HeroSlide } from "../components/HeroSlide";
import { AnimeList } from "../components/AnimeList/AnimeList";
import { useLandingAnimes } from "../hooks/useLandingAnime";
import { SkeletonHeroSlide } from "../components/SkeletonHeroSlide";
import { SkeletonAnimeList } from "../components/SkeletonAnimeList";
import {
  GET_TRENDING_ANIME,
  GET_LATEST_ANIME,
  GET_RECOMMENDED_ANIME,
} from "../graphql/queries";

export const LandingPage = () => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const formatAnime = (anime: any) => ({
    animeId: anime.id,
    animeRomajiName: anime.title.romaji,
    animeEnglishName: anime.title.english,
    animePhotoURL: anime.coverImage.large,
    animeRating: anime.averageScore / 10,
  });

  const { animes, loading: landingLoading, error: landingError } = useLandingAnimes();
  
  const { data: trendingData, loading: trendingLoading } = useQuery(GET_TRENDING_ANIME, {
    context: { clientName: "anilist" },
    fetchPolicy: 'cache-first',
  });
  const { data: latestData, loading: latestLoading } = useQuery(GET_LATEST_ANIME, {
    context: { clientName: "anilist" },
    fetchPolicy: 'cache-first',
  });
  const { data: forYouData, loading: forYouLoading } = useQuery(GET_RECOMMENDED_ANIME, {
    context: { clientName: "anilist" },
    fetchPolicy: 'cache-first',
  });
  
  const trendingAnimes = trendingData?.Page.media.map(formatAnime) || [];
  const latestAnimes = latestData?.Page.media.map(formatAnime) || [];
  const forYouAnimes = forYouData?.Page.media.map(formatAnime) || [];

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % animes.length);
    }, 10000);
  };

  useEffect(() => {
    if (animes.length === 0) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [animes.length]);

  const isQueryLoading =
    landingLoading ||
    trendingLoading ||
    latestLoading ||
    forYouLoading;

  if (isQueryLoading) {
    return (
      <LandingPageWrapper>
        <ContentContainer>
          <CarouselWrapper>
            <SkeletonHeroSlide />
          </CarouselWrapper>
          <AnimeSection>
            <SkeletonAnimeList listType="Trending" />
            <SkeletonAnimeList listType="Latest Update" />
            <SkeletonAnimeList listType="For You" />
          </AnimeSection>
          <BottomFill />
        </ContentContainer>
      </LandingPageWrapper>
    );
  };

  if (landingError) return <p>{landingError}</p>;

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
              contentRating={anime.contentRating}
              genres={anime.genres}
              active={i === current}
              positionX={anime.positionX}
              positionY={anime.positionY}
            />
          ))}
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
          <AnimeList listType="Trending" data={trendingAnimes} />
          <AnimeList listType="Latest Update" data={latestAnimes} />
          <AnimeList listType="For You" data={forYouAnimes} />
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

const AnimeSection = styled.div``;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
`;

const ArrowButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["left", "right"].includes(prop), 
})<{ left?: boolean; right?: boolean }>`
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

const Indicator = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active", 
})<{ active: boolean }>`
  width: 60px;
  height: 10px;
  background-color: ${(props) => (props.active ? "#00F5D4" : "transparent")};
  border: 2px solid #00F5D4;
  transition: background-color 0.3s;
`;

const BottomFill = styled.div`
  height: 150px;
`;