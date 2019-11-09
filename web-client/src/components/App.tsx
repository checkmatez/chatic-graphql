import { ApolloProvider } from '@apollo/react-hooks';
import { CSSReset, Flex, theme, ThemeProvider } from '@chakra-ui/core';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

if (!process.env.REACT_APP_GRAPHQL_ENDPOINT) {
  throw new Error('Please provide REACT_APP_GRAPHQL_ENDPOINT env.');
}
if (!process.env.REACT_APP_GRAPHQL_WS) {
  throw new Error('Please provide REACT_APP_GRAPHQL_WS env.');
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  headers: { authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}` },
});

export const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Flex height="100vh" justifyContent="center" alignItems="center" bg="#f5f5f5">
        <Flex flexDirection="column" borderRadius="10px" padding={5} bg="white" as="main">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <RepositoryList />
              </Route>
              <Route path="/repo/new" exact>
                <RepositoryNew />
              </Route>
              <Route path="/repo/:id" exact>
                <RepositoryCard />
              </Route>
            </Switch>
          </BrowserRouter>
        </Flex>
      </Flex>
    </ThemeProvider>
  </ApolloProvider>
);
