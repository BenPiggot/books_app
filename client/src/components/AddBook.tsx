import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import './AddBook.css';

const ADD_BOOK_MUTATION = gql`
  mutation ADD_BOOK_MUTATION(
      $title: String!
      $authorName: String!
    ) {
    createBook(title: $title, authorName: $authorName) {
      book {
        id
      }
    }
  }
`

interface AddBookState {
  title: string
  authorName: string
  description: string
}


class AddBook extends Component<RouteComponentProps, AddBookState>{
  state = {
    title: '',
    authorName:'',
    description: ''
  }

  updateTitle = e => {
    this.setState({
      title: e.target.value
    })
  }

  updateAuthorName = e => {
    this.setState({
      authorName: e.target.value
    })
  }

  updateDescription = e => {
    this.setState({
      description: e.target.value
    })
  }
  
  render() {
    return (
      <Mutation
        mutation={ADD_BOOK_MUTATION}
        variables={this.state}
      >
        {(createBook, { loading, error }) => {
          return (
            <div>
              <h3>Add a Book</h3>
              <form 
                className="container form-container"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await createBook();
                  this.setState({
                    title: '',
                    authorName: '',
                    description: ''
                  })
                  if (res) {
                    debugger
                    this.props.history.push(`/book/${res.data.createBook.book.id}`);
                  }
                }}
              >
                <div className="row">
                  <div className="input-field">
                    <input 
                      placeholder="Book Ttile" 
                      id="title" type="text" 
                      className="validate" 
                      name="title" 
                      onChange={this.updateTitle}
                    />
                    <label htmlFor="title">Title</label>
                  </div>
                  <div className="input-field">
                    <input 
                      id="authorName" 
                      type="text" className="validate" 
                      placeholder="Author Name" 
                      onChange={this.updateAuthorName}
                    />
                    <label htmlFor="authorName">Author Name</label>
                  </div>
                  <div className="input-field">
                    <textarea 
                      id="description" 
                      className="materialize-textarea"
                      onChange={this.updateDescription}
                      placeholder="Add a brief description of this book"
                    >
                    </textarea>
                    <label htmlFor="textarea1">Description</label>
                  </div>
                </div>
                <div className="button-group">
                  <button className="btn btn-large waves-effect waves-light blue" type="submit">
                    Submit
                  </button>
                  <Link to="/" className="waves-effect waves-light btn btn-large grey-lighten-1">Back</Link>
                </div>
              </form>
            </div>
          )
        }}

      </Mutation>

    )
  }
}

export default withRouter(AddBook);
