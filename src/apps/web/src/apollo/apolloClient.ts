import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

const anilistClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graphql.anilist.co',
  }),
  cache: new InMemoryCache(),
});

export { apolloClient, anilistClient };