import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const isLocal = import.meta.env.DEV;

const errorLink = onError(({ networkError }) => {
  console.log("[Apollo error]", networkError);

  const isTooManyRequest =
    networkError &&
    typeof (networkError as any).statusCode === "number" &&
    [429, 403, 404].includes((networkError as any).statusCode);

  const isFailedToFetch = networkError?.message === "Failed to fetch";

  if (isTooManyRequest || isFailedToFetch) {
    window.dispatchEvent(new Event("anilistRateLimitExceeded"));
  }
});


const serverLink = new HttpLink({
  uri: isLocal
    ? "http://localhost:4000/graphql" 
    : `${import.meta.env.VITE_SERVER_URL}/graphql`, 
});

const anilistLink = new HttpLink({
  uri: 'https://graphql.anilist.co',
  useGETForQueries: false, 
});

const splitLink = ApolloLink.split(
  (operation) => operation.getContext().clientName === "anilist",
  anilistLink,
  serverLink
);

const combinedLink = ApolloLink.from([errorLink, splitLink]);

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
  link: combinedLink,
  cache,
});
