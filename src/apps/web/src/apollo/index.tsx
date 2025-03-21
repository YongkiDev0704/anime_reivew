import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';

import client from './client';

interface ApolloWrapperProps {
  children: ReactNode;
}

const ApolloWrapper = ({ children }: ApolloWrapperProps) => {
  return (
    <ApolloProvider client={client}>
      {children as ReactNode}
    </ApolloProvider>
  );
};

export default ApolloWrapper;