import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

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
              <div className="container books">
                <h2>
                  My Books
                  <Link to="/add-book" className="btn-floating btn-large waves-effect waves-light red">
                    <i className="material-icons">add</i>
                  </Link>
                </h2>
                {data.books.map(book => (
                  <div className="card book" key={book.id}>
                    <div className="card-content">
                      <h4>{book.title}</h4>
                      <h5> by {book.authorName}</h5>
                      <p>{book.description}</p>
                    </div>
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