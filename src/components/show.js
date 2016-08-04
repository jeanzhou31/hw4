// show page -- show a specific post in full

import React, { Component } from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import { fetchPost, deletePost, updatePost } from '../actions/index';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      editing: false,
      initialize: false,
      error: false,
    };

    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.done = this.done.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.render = this.render.bind(this);
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  // update title input
  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  // update content input
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  // update tags input
  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  // delete post
  delete() {
    this.props.deletePost(this.props.params.id);
  }

  // edit post
  edit() {
    // if this is the first time editing, state must be initailized
    if (this.state.initialize === false) {
      this.setState({
        title: this.props.currentPost.title,
        content: this.props.currentPost.content,
        tags: this.props.currentPost.tags,
        editing: !this.state.editing,
        initialize: true,
      });
    } else {
      this.setState({
        editing: !this.state.editing,
      });
    }
  }

  // done editing
  done() {
    // submit only if no field is empty (or just spaces)
    if (this.state.title.trim().length > 0 && this.state.content.trim().length > 0 && this.state.tags.trim().length > 0) {
      this.setState({
        editing: !this.state.editing,
        error: false,
      });
      const post = { id: this.props.params.id, title: this.state.title, content: this.state.content, tags: this.state.tags };
      this.props.updatePost(post);
    } else {
      // if empty field, display error message
      this.setState({
        error: true,
      });
    }
  }

  // render function
  render() {
    if (this.props.currentPost == null) {
      // if currentPost not yet fetched due to server lag
      return (
        <div>Loading...</div>
      );
    }
    let errorText = '';
    if (this.state.error === true) {
      errorText = 'Please fill out all fields!';
    }
    if (this.state.editing === false) {
      if (this.state.initialize === false) {
        // state not initialized, use this.props.currentPost
        return (
          <div className="displaybox" >
            <div className="titlerow">
              <b>Title:</b> {this.props.currentPost.title}
            </div>
            <div className="contentrow">
              <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content) }} />
            </div>
            <div className="tagsrow">
              <b>Tags:</b> {this.props.currentPost.tags}
            </div>
            <div>
              <button onClick={this.delete}>Delete</button>
              <button onClick={this.edit}>Edit</button>
            </div>
          </div>
        );
      } else {
        // state is initialized, use this.state
        return (
          <div className="displaybox" >
            <div className="titlerow">
              <b>Title:</b> {this.state.title}
            </div>
            <div className="contentrow">
              <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.state.content) }} />
            </div>
            <div className="tagsrow">
              <b>Tags:</b> {this.state.tags}
            </div>
            <div>
              <button onClick={this.delete}>Delete</button>
              <button onClick={this.edit}>Edit</button>
            </div>
          </div>
        );
      }
    } else {
      // input fields active
      return (
        <div className="inputbox" >
          <div className="titlerow">
            <b>Title:</b> <input value={this.state.title} onChange={this.onTitleChange} />
          </div>
          <div className="contentrow">
            <b>Content:</b> <textarea value={this.state.content} onChange={this.onContentChange} />
          </div>
          <div className="tagsrow">
            <b>Tags:</b> <input value={this.state.tags} onChange={this.onTagsChange} />
          </div>
          <div>
            <button onClick={this.done}>Done</button>
          </div>
          <div>
            {errorText}
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (state, action) => (
  {
    currentPost: state.posts.currentPost,
  }
);

export default connect(mapDispatchToProps, { fetchPost, deletePost, updatePost })(Show);
