import { createClient, cacheExchange, fetchExchange } from "@urql/core";
import { retryExchange } from "@urql/exchange-retry";
import { createGraphQLClient } from "@solid-primitives/graphql";

export const client = createClient({
  url: `${import.meta.env.VITE_VARIABLE_BACKEND}/graphql/private?store_id=${
    import.meta.env.VITE_VARIABLE_ID_STORE
  }`,
  fetchOptions: {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${
        typeof window !== "undefined" && localStorage.getItem("access_token")
      }`,
    },
  },
  exchanges: [
    retryExchange({
      maxNumberAttempts: 10,
      maxDelayMs: 500,
      retryIf: (error) => {
        // NOTE: With this deemo schema we have a specific random error to look out for:
        return (
          error.graphQLErrors.some((x) => x.extensions?.code === "NO_SOUP") ||
          !!error.networkError
        );
      },
    }),
    cacheExchange,
    fetchExchange,
  ],
});

export const clientQuery = createGraphQLClient(
  `${import.meta.env.VITE_VARIABLE_BACKEND}/graphql/private?store_id=${
    import.meta.env.VITE_VARIABLE_ID_STORE
  }`,
  {
    headers: {
      Authorization: `Bearer ${
        typeof window !== "undefined" && localStorage.getItem("access_token")
      }`,
    },
  }
);

export const publicQuery = createGraphQLClient(
  `${import.meta.env.VITE_VARIABLE_BACKEND}/graphql/public?store_id=${
    import.meta.env.VITE_VARIABLE_ID_STORE
  }`
);
