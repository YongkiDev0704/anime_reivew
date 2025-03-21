import styled from "styled-components";
import ApolloWrapper from "./apollo";

import { GlobalStyle } from "./style/GlobalStyle";
import { AnimeList } from "./components/AnimeList/AnimeList";

export const App = () => {
  
  return (
    <ApolloWrapper>
      <ProviderWrap>
        <GlobalStyle />
        <AnimeList listType="Trending"/>
      </ProviderWrap>
    </ApolloWrapper>
  )
};

const ProviderWrap = styled.div`
  background-color: #1E1E1E;
  display: flex;
  width: 100%;
`;