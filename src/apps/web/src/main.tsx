import styled from 'styled-components'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
import { MAX_WIDTH } from './style/GlobalStyle.tsx';


const Wrapper = styled.div`
  width: ${MAX_WIDTH}px;
  margin: 0 auth;
`;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </StrictMode>,
);
