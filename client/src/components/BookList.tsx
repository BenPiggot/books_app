import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import './BookList.css';

const BOOKS_QUERY = gql`
  query BOOKS_QUERY {
    books {
      id
      title
      authorName
      description
    }
  }
`

class BookList extends Component<{}, {}> {
  render() {
    return (
      <Query query={BOOKS_QUERY}>
        {({ data, loading, error}) => {
          if (loading) return <div>Loading...</div>
          if (data.books) {
            return (
              <div className="books">
                {data.books.map(book => (
                  <div className="book">
                    <h2>{book.title}</h2>
                    <h4> by {book.authorName}</h4>
                    <p>{book.description}</p>
                  </div>
                ))}
              </div>
            )
          }
        }}
      </Query>
    )
  }
}

export default BookList;