import React from 'react';
import {Link} from 'react-router-dom';
import User from './User';

const Header = () => (
  <User>
    {({ data: { me } }) => (
      <nav >
        <div className="nav-wrapper  light-blue darken-4">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            {
              me ? (
                <>
                  <li><Link to="/logout">Logout</Link></li>
                  <li><Link to="/add-book">Add New Book</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/create-account">Create Account</Link></li>
                </>
              )
            }
          </ul>
        </div>
      </nav>
    )}
  </User>
)

export default Header
