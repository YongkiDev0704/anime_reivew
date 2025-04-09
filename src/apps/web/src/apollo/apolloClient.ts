import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

const serverLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', 
});

const anilistLink = new HttpLink({
  uri: 'https://graphql.anilist.co',
});

const splitLink = ApolloLink.split(
  (operation) => operation.getContext().clientName === "anilist",
  anilistLink,
  serverLink
);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        Page: {
          keyArgs: false, 
          merge(existing = {}, incoming) {
            return { ...existing, ...incoming };
          },
        },
      },
    },
  },
});


export const client = new ApolloClient({
  link: splitLink,
  cache,
});
