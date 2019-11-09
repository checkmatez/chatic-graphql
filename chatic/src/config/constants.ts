import { Constants } from 'expo';

export const ACCESS_TOKEN_KEY = 'access_token';

export const getGraphqlEndpoint = () => {
  return 'http://localhost:4051'; // Local server
  if (Constants.manifest.releaseChannel === undefined) {
    return 'http://localhost:4000'; // Local server
  }

  return 'https://api.car.sydev.tech'; // Production server
};

export const getWsGraphqlEndpoint = () => {
  return 'ws://localhost:4051/graphql';
};
