import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import gql from 'graphql-tag';
import './AddBook.css';

const ADD_BOOK_MUTATION = gql`
  mutation ADD_BOOK_MUTATION(
      $title: String!
      $authorName: String!
      $description: String!
      $image: Upload!
    ) {
    createBook(
      title: $title, 
      authorName: $authorName, 
      description: $description,
      image: $image
    ) {
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
  image: File | null
}


class AddBook extends Component<RouteComponentProps, AddBookState>{
  state = {
    title: '',
    authorName:'',
    description: '',
    image: null
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

  uploadImage = async (e) => {
    const images = e.target.files;
    if (images[0]) {
      this.setState({
        image: images[0]
      })
    }
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
                    description: '',
                    image: null
                  })
                  if (res) {
                    this.props.history.push(`/book/${res.data.createBook.book.id}`);
                  }
                }}
              >
                <div className="row">
                  <div className="input-field">
                    <input 
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
                      onChange={this.updateAuthorName}
                    />
                    <label htmlFor="authorName">Author Name</label>
                  </div>
                  <div className="input-field">
                    <textarea 
                      id="description" 
                      className="materialize-textarea"
                      onChange={this.updateDescription}
                    >
                    </textarea>
                    <label htmlFor="textarea1">Description</label>
                  </div>
                  <div className="input-field">
                    <label htmlFor="image">
                      Book Image
                      <input
                        type="file" id="image"
                        placeholder="Upload an Image"
                        onChange={this.uploadImage}
                      />
                    </label>
                  </div>
                </div>
                <div className="button-group">
                  <button className="btn btn-large waves-effect waves-light blue" type="submit">
                    Submit
                  </button>
                  <Link to="/" className="waves-effect waves-light btn btn-large grey lighten-1">Back</Link>
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
