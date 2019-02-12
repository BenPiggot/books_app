import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

interface LoginState {
  username: string
  password: string
}

class Login extends Component<{}, LoginState> {
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
      password: ""
    })
  }

  render() {
    return (
      <div className="container">
        <h3>Log In</h3>
        <form className="container form-container">
          <div className="row">
            <div className="input-field">
              <input
                className="validate"
                type="text"
                placeholder="Username"
                onChange={this.updateUsername}
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
  }
}

export default Login;
