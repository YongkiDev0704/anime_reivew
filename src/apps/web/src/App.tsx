import styled from "styled-components";

import { GlobalStyle } from "./style/GlobalStyle";
import { LandingPage } from "./pages/landingPage";
export const App = () => {
  
  return (
    <ProviderWrap>
      <GlobalStyle />
      <LandingPage />
    </ProviderWrap>
  )
};

const ProviderWrap = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: white;
`;
