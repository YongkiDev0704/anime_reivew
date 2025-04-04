import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

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
          keyArgs: ["page", "perPage", "sort", "type"], 
        },
      },
    },
  },
});

await persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
})

export const client = new ApolloClient({
  link: splitLink,
  cache,
});
