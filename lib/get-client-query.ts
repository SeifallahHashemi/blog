import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000 * 5,
        gcTime: 60 * 1000 * 30,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let BrowserClient: QueryClient | undefined = undefined;
export function getClientQuery() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!BrowserClient) BrowserClient = makeQueryClient();
    return BrowserClient;
  }
}
