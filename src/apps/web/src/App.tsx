import styled from "styled-components";

import { AnimationCardThird } from "./components/AnimationCard";
import { GlobalStyle } from "./style/GlobalStyle";

export const App = () => {
  
  return (
    <ProviderWrap>
      <GlobalStyle />
      <AnimationCardThird name="hehe" rating={4.0}/>
    </ProviderWrap>
  )
};

const ProviderWrap = styled.div`
  display: flex;
  width: 100%;
`;