import styled from 'styled-components'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'

import { App } from './App.tsx'
import { MAX_WIDTH } from './style/GlobalStyle.tsx';
import apolloClient from './apollo/apolloClient.ts'

const Wrapper = styled.div`
  width: ${MAX_WIDTH}px;
  margin: 0 auth;
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Wrapper>
        <App />
      </Wrapper>
    </ApolloProvider>
  </StrictMode>,
);
