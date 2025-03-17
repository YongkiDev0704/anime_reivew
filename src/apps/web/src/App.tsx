import styled from "styled-components";

import { GlobalStyle } from "./style/GlobalStyle";
import { AnimeList } from "./components/AnimeList/AnimeList";

export const App = () => {
  
  return (
    <ProviderWrap>
      <GlobalStyle />
      <AnimeList listType="Trending"/>
    </ProviderWrap>
  )
};

const ProviderWrap = styled.div`
  background-color: #1E1E1E;
  display: flex;
  width: 100%;
`;