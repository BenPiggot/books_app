import React, { Component } from 'react'
import './AddBook.css';

class AddBook extends Component<{}, {}>{
  render() {
    return (
      <div>
        <h3>Add a Book</h3>
        <form className="container form-container">
          <div className="row">
            <div className="input-field">
              <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field">
              <input id="last_name" type="text" className="validate" />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddBook;
