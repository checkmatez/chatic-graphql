import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { from, split } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { AsyncStorage } from 'react-native';

import { ACCESS_TOKEN_KEY, getGraphqlEndpoint, getWsGraphqlEndpoint } from './constants';
import { ErrorCode } from './errorCodes';

export const configureApollo = () => {
  // configure cache
  const cache = new InMemoryCache();

  // cached storage for the user token
  let token: string | null;

  const withToken = setContext(async () => {
    // if we have a cached value, return it immediately
    if (token) {
      return { headers: { authorization: `Bearer ${token}` } };
    }

    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    // cache it
    token = accessToken;
    console.log(`authorization token = ${token}`); // tslint:disable-line no-console
    return { headers: { authorization: `Bearer ${token}` } };
  });

  // remove cached token on 401 from the server
  interface INetworkError extends Error {
    statusCode?: number;
  }
  const resetToken = onError(({ networkError, graphQLErrors, operation, forward }) => {
    let needReset = false;
    const netError = networkError as INetworkError;
    if (netError && netError.statusCode === 401) {
      needReset = true;
    }
    if (
      graphQLErrors &&
      graphQLErrors.some(
        gqlError => !!gqlError.extensions && gqlError.extensions.code === ErrorCode.UNAUTHENTICATED,
      )
    ) {
      needReset = true;
    }
    if (needReset) {
      // clear token in cache and storage
      token = null;
      AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  });

  const authFlowLink = from([withToken, resetToken]);

  const wsLink = new WebSocketLink({
    uri: getWsGraphqlEndpoint(),
    options: {
      reconnect: true,
    },
  });

  const httpLink = createHttpLink({ uri: getGraphqlEndpoint() });

  // subscriptions over websockets, queries and mutations over http
  const networkLink = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    cache,
    link: from([authFlowLink, networkLink]),
  });

  const unsubscribe = client.onResetStore(async () => {
    token = null;
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY]);
  });

  return client;
};
