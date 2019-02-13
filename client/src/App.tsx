import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import getCookie from './utils/getCookie';
import logo from './logo.svg';
import './App.css';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetail from './components/BookDetail';
import UpdateBook from './components/UpdateBook';
import Login from './components/Login';
import Header from './components/Header';


const httpLink = createUploadLink({
  fetch,
  uri: 'http://localhost:8000/graphql/',
  fetchOptions: {
    credentials: 'same-origin'
  }
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('JWT');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `JWT ${token}` : ''
    }
  });

  // Call the next link in the middleware chain.
  if (forward) {
    return forward(operation);
  }
  return null;
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class App extends React.Component<{}, {}> {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Router>
            <>
              <Header />
              <Route path="/" exact component={BookList} />
              <Route path="/login" exact component={Login} />
              <Route path="/add-book/" component={AddBook} />
              <Route path="/book/:id" component={BookDetail} />
              <Route path="/update-book/:id" component={UpdateBook} />
            </>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
