import { Constants } from 'expo';

export const ACCESS_TOKEN_KEY = 'access_token';

export const getGraphqlEndpoint = () => {
  // return 'http://35.228.32.187:30819';
  return 'http://localhost:4000'; // Local server
  // if (Constants.manifest.releaseChannel === undefined) {
  //   return 'http://localhost:4000'; // Local server
  // }

  // return 'https://some.server'; // Production server
};

export const getWsGraphqlEndpoint = () => {
  return 'ws://localhost:4000/graphql';
  // return 'wss://some.server/graphql'; // Production server
};
