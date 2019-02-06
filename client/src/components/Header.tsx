import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav >
      <div className="nav-wrapper  light-blue darken-4">
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add-book">Add New Book</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
