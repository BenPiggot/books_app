import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps, match, withRouter, Link} from 'react-router-dom';

import DeleteBook from './DeleteBook';

import './BookDetail.css';

interface RouteInfo { id: string }

interface BookDetailProps extends RouteComponentProps {
  match: match<RouteInfo>
}

const BOOK_QUERY = gql`
  query BOOK_QUERY($id: String!) {
    book(id: $id) {
      title
      description
    }
  }
`

const BookDetail = (props: BookDetailProps) => {
  return (
    <Query query={BOOK_QUERY} variables={{ id: props.match.params.id }}>
      {({data, loading, error}) => {
        if (loading) return <div>Loading...</div>
        return (
          <div className="container">
            <div className="card">
              <div className="card-content">
                <h3>{data.book.title}</h3>
                <p>{data.book.description}</p>
              </div>
            </div>
            <div className="book-detail-buttons">         
              <Link to="/" className="waves-effect waves-light btn btn-large grey lighten-1">Back</Link>
              <DeleteBook id={props.match.params.id}/>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default BookDetail;


