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

export const BOOK_QUERY = gql`
  query BOOK_QUERY($id: String!) {
    book(id: $id) {
      title
      description
      image
      authorName
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
                <h5>by {data.book.authorName}</h5>
                <p>{data.book.description}</p>
                { data.book.image && <img src={data.book.image} alt={data.book.title} /> }
              </div>
            </div>
            <div className="book-detail-buttons">         
              <Link to="/" className="waves-effect waves-light btn btn-large grey lighten-1">Back</Link>
              <DeleteBook id={props.match.params.id}/>
              <Link className="waves-effect waves-light btn btn-large light-blue accent-2" to={`/update-book/${props.match.params.id}`}>Update</Link>
            </div>
          </div>
        )
      }}
    </Query>
  )
}

export default BookDetail;


