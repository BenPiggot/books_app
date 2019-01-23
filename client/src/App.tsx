import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import getCookie from './utils/getCookie';
import logo from './logo.svg';
import './App.css';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

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
          <Router>
            <>
              <Route path="/" exact component={BookList} />
              <Route path="/add-book/" component={AddBook} />
            </>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
