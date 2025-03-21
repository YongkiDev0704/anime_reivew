import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import { ApolloProvider } from '@apollo/client'
import { App } from './App.tsx'

import apolloClient from './apollo/apolloClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
