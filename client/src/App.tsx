import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import getCookie from './utils/getCookie';
import logo from './logo.svg';
import './App.css';

import BookList from './components/BookList'

const httpLink = createHttpLink({
  fetch,
  uri: 'http://localhost:8000/graphql/',
  credentials: 'same-origin',
});


const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

class App extends React.Component<{}, {}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
