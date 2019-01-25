import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { BOOKS_QUERY } from './BookList';

import './DeleteBook.css';
import { ApolloCache } from 'apollo-cache';

const DELETE_BOOK = gql`
  mutation DELETE_BOOK($id: String!) {
    deleteBook(id: $id) {
      book {
        id
      }
    }
  }
`

interface DeleteBookProps extends RouteComponentProps {
  id: string
}

class DeleteBook extends React.Component<DeleteBookProps, {}> {
  update = (cache, payload) => {
    const data = cache.readQuery({ query: BOOKS_QUERY });
    data.books = data.books.filter(book => book.id !== this.props.id)
    cache.writeQuery({ query: BOOKS_QUERY, data })
    this.props.history.push(`/`);
  }

  render() {
    return (
      <Mutation
        mutation={DELETE_BOOK}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteBook, { error }) => (
          <div className="delete-book-button">
            <button 
              onClick={() => deleteBook()}
              className="btn btn-large orange darken-1"
            >
            Delete
            </button>
          </div>
        )}
      </Mutation>
    )
  }

}

export default withRouter(DeleteBook)
