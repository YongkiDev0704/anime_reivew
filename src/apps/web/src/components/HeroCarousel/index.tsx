import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

interface Anime {
  id: string;
  attributes: {
    titles: { en_jp: string };
    coverImage?: { original: string };
  };
}

export const HeroCarousel = ({ animeTitles }: { animeTitles: string[] }) => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const promises = animeTitles.map((title) =>
          axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(title)}`)
        );
        const responses = await Promise.all(promises);
        const results = responses.map((res) => res.data.data[0]); 
          setAnimeList(results.filter(Boolean));
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimeData();
  }, [animeTitles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % animeList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [animeList]);

  if (animeList.length === 0) return <p>Loading...</p>;

  return (
    <Wrapper>
      {animeList.map((anime, index) => (
        <Slide key={anime.id} active={index === currentIndex}>
          {anime.attributes.coverImage?.original ? (
            <CoverImage src={anime.attributes.coverImage.original} alt={anime.attributes.titles.en_jp} />
          ) : (
            <Placeholder>No Image Available</Placeholder>
          )}
          <Title>{anime.attributes.titles.en_jp}</Title>
        </Slide>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 1440px;
  height: 700px;
  margin: 0 auto;
  overflow: hidden;
`;

const Slide = styled.div<{ active: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ active }) => (active ? "1" : "0")};
  transition: opacity 0.5s ease-in-out;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  clip-path: inset(10% 10% 0% 10%); /* 왼쪽 60%만 표시 */
`;

const Title = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 10px;
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
`;
