import React, { Component } from 'react';
import { Mutation, Query, withApollo, compose, DataProps } from 'react-apollo';
import { DataProxy } from 'apollo-cache';
import gql from 'graphql-tag';
import { RouteComponentProps, match, withRouter, Link } from 'react-router-dom';

import { BOOK_QUERY } from './BookDetail';
import ApolloClient from 'apollo-client';



const UPDATE_BOOK = gql`
  mutation UPDATE_BOOK(
      $id: String!
      $title: String
      $authorName: String
      $description: String
      $image: Upload
    ) {
    updateBook(
      id: $id
      title: $title, 
      authorName: $authorName, 
      description: $description,
      image: $image
    ) {
      book {
        id
        title
        authorName
        description
        image
      }
    }
  }
`

interface RouteInfo { id: string }

interface UpdateBookProps extends RouteComponentProps, DataProxy {
  match: match<RouteInfo>
  client: ApolloClient<any>
}


interface UpdateBookState {
  title: string
  authorName: string
  description: string
  image: File | null
}


class UpdateBook extends Component<UpdateBookProps, UpdateBookState> {
  state = {
    title: '',
    authorName: '',
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

  update = (cache, payload) => {
    const book = payload.data.updateBook.book;
    let data = cache.readQuery({ query: BOOK_QUERY, variables: { id: book.id } });
    data.book = book;
    cache.writeQuery({ query: BOOK_QUERY, variables: { id: book.id }, data })
    this.props.history.push(`/book/${book.id}`);
  }

  render() {
    return (
      <Query query={BOOK_QUERY} variables={{ id: this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>
          return (
            <Mutation 
              mutation={UPDATE_BOOK} 
              variables={{
                id: this.props.match.params.id,    
                title: this.state.title || data.book.title,
                authorName: this.state.authorName || data.book.authorName,
                description: this.state.description || data.book.description,
                image: this.state.image || data.book.image
              }}
              update={this.update}
            >
              {(updateBook, {loading, error}) => {
                return (
                  <form
                    className="container form-container"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      await updateBook();
                    }}
                  >
                    <div className="row">
                      <div className="input-field">
                        <input
                          id="title" type="text"
                          className="validate"
                          name="title"
                          defaultValue={data.book.title}
                          onChange={this.updateTitle}
                        />
                        <label htmlFor="title">Title</label>
                      </div>
                      <div className="input-field">
                        <input
                          id="authorName"
                          type="text" className="validate"
                          defaultValue={data.book.authorName}
                          onChange={this.updateAuthorName}
                        />
                        <label htmlFor="authorName">Author Name</label>
                      </div>
                      <div className="input-field">
                        <textarea
                          id="description"
                          className="materialize-textarea"
                          defaultValue={data.book.description}
                          onChange={this.updateDescription}
                        >
                        </textarea>
                        <label htmlFor="description">Description</label>
                      </div>
                      <div className="input-field">
                        <label htmlFor="image">
                          Book Image
                          <input
                            type="file" 
                            id="image"
                            placeholder="Upload an Image"
                            // defaultValue={data.book.image}
                            onChange={this.uploadImage}
                          />
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="waves-effect waves-light btn btn-large light-blue accent-2"
                    >
                      Update
                    </button>
                  </form>
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default compose(withApollo, withRouter)(UpdateBook);
