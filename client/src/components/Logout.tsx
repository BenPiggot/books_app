import React, { Component } from 'react';
import { withApollo, compose } from 'react-apollo';
import { BOOKS_QUERY } from './BookList';
import ApolloClient from 'apollo-client';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './Logout.css';

interface LogoutProps extends RouteComponentProps {
  client: ApolloClient<any>,
}

class Logout extends React.Component<LogoutProps,{}>{
  logout = async e => {
    localStorage.removeItem('JWT');
    const data = this.props.client.cache.readQuery({ query: BOOKS_QUERY })
    if (data) data['books'] = []
    this.props.client.cache.writeQuery({ query: BOOKS_QUERY, data })
    this.props.history.push('/');
  }
  render() {
    return (
      <a className="logout-button" onClick={this.logout}>Logout</a>
    )
  }

}

export default compose(withApollo, withRouter)(Logout)
