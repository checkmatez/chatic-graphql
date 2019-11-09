import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import { configureApollo } from './src/config/configureApollo';
import { AppContainer } from './src/components/AppContainer';

export default function App() {
  return (
    <ApolloProvider client={configureApollo()}>
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
