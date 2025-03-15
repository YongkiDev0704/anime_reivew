import styled from "styled-components";

import { GlobalStyle } from "./style/GlobalStyle";
import { AnimeCard } from "./components/AnimeCard/AnimeCard";

export const App = () => {
  
  return (
    <ProviderWrap>
      <GlobalStyle />
      <AnimeCard animePhotoURL='https://i.pinimg.com/originals/4a/d3/89/4ad389052b4cf159fd601ae4dbd4ecbc.png' animeName="anime_name-testlooooooooooonggeeeeeeer what" animeRating= {7.51}/>
    </ProviderWrap>
  )
};

const ProviderWrap = styled.div`
  background-color: #1E1E1E;
  display: flex;
  width: 100%;
`;