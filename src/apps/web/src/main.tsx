import styled from 'styled-components'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'

import { App } from './App.tsx'
import { MAX_WIDTH } from './style/GlobalStyle.tsx';
import { apolloClient, anilistClient } from './apollo/apolloClient.ts'

const Wrapper = styled.div`
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  width: 100%;
  overflow-x: hidden;
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <ApolloProvider client={anilistClient}>
        <Wrapper>
          <App />
        </Wrapper>
      </ApolloProvider>
    </ApolloProvider>
  </StrictMode>,
);
