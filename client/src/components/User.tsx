import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY($token: String!) {
    me(token: $token) {
      id
      username
      firstName
      lastName
    }
  }
`

const User = props => {
  return (
    <Query {...props} query={CURRENT_USER_QUERY} variables={{ token: localStorage.getItem('JWT') || ''}}>
      {payload => props.children(payload)}
    </Query>
  )
}


export default User;
export { CURRENT_USER_QUERY };