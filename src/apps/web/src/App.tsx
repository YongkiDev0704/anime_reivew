import styled from "styled-components";

import { GlobalStyle } from "./style/GlobalStyle";
import { AnimeList } from "./components/AnimeList/AnimeList";
import { AnimeReview } from "./components/AnimeReview/AnimeReview";

export const App = () => {
  
  return (
    <ProviderWrap>
      <GlobalStyle />
      <AnimeList listType="Trending"/>
      <AnimeReview username="Anonymous"/>
    </ProviderWrap>
  )
};

const ProviderWrap = styled.div`
  background-color: #1E1E1E;
  display: flex;
  flex-direction: column;
  width: 100%;
`;