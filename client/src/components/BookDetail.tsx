import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RouteComponentProps, withRouter, Link} from 'react-router-dom';

interface BookDetailProps extends RouteComponentProps {

}


const BOOK_QUERY = gql`
  query BOOK_QUERY($id: String!) {
    book(id: $id) {
      title
    }
  }
`

const BookDetail = (props: BookDetailProps) => {
  return (
    <Query query={BOOK_QUERY} variables={{ id: '1' }}>
      {({data, loading, error}) => {
        if (loading) return <div>Loading...</div>
        return (
          <div>
            <h3>{data.book.title}</h3>
            <Link to="/" className="waves-effect waves-light btn btn-large grey-lighten-1">Back</Link>
          </div>
        )
      }}
    </Query>
  )
}

export default BookDetail;


