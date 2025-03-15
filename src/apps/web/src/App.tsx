import styled from "styled-components";

import { GlobalStyle } from "./style/GlobalStyle";
import { AnimeCard } from "./components/AnimeCard/animeCard";

export const App = () => {
  
  return (
    <ProviderWrap>
      <GlobalStyle />
      <AnimeCard animeName="anime_name-test" animeRating= {7.51}/>
    </ProviderWrap>
  )
};

const ProviderWrap = styled.div`
  display: flex;
  width: 100%;
`;