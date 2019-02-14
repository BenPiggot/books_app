import React, { Component } from 'react';
import { Mutation, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface LoginState {
  username: string
  password: string
}

interface LoginProps extends RouteComponentProps {}

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION(
    $username: String! 
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password)  {
      token
    }
  }
`

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

class Login extends Component<LoginProps, LoginState> {
  state = {
    username: "",
    password: ""
  }

  updateUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  updatePassword = e => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
      >
        {(tokenAuth, { loading, error }) => {
          return (
            <div className="container">
              <h3>Log In</h3>
              <form 
                className="container form-container"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await tokenAuth()
                  if (res) {
                    localStorage.setItem('JWT', res.data.tokenAuth.token)
                    this.props.history.push('/')
                  }
                }}
              >
                <div className="row">
                  <div className="input-field">
                    <input
                      className="validate"
                      type="text"
                      placeholder="Username"
                      onChange={this.updateUsername}
                      value={this.state.username}
                    />
                    <label htmlFor="username">
                      Username
                    </label>
                  </div>
                  <div className="input-field">
                    <input
                      className="validate"
                      type="password"
                      placeholder="Password"
                      onChange={this.updatePassword}
                      value={this.state.password}
                    />
                    <label htmlFor="password">
                      Password
                    </label>
                  </div>
                </div>
                <div className="button-group">
                  <button className="btn btn-large waves-effect waves-light blue" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default compose(withRouter)(Login);
