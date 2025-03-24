import styled from "styled-components";

import { GlobalStyle } from "./style/GlobalStyle";
import { LandingPage } from "./pages/landingPage";
import { AnimeList } from "./components/AnimeList/AnimeList";

export const App = () => {
  
  return (
    <ProviderWrap>
      <GlobalStyle />
      <LandingPage />
      <AnimeList listType="Trending"/>
    </ProviderWrap>
  )
};

const ProviderWrap = styled.div`
  background-color: #1E1E1E;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
`;
