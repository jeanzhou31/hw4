// new page -- create a new post

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class New extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      tags: '',
      error: false,
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  // update title input
  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  // update content input
  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  // update tag input
  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  // submit new post
  submit() {
    // submit only if no field is empty (or just spaces)
    if (this.state.title.trim().length > 0 && this.state.content.trim().length > 0 && this.state.tags.trim().length > 0) {
      const post = { title: this.state.title, content: this.state.content, tags: this.state.tags };
      this.props.createPost(post);
    } else {
      // if empty field, display error message
      this.setState({
        error: true,
      });
    }
  }

  // render function
  render() {
    let errorText = '';
    if (this.state.error === true) {
      errorText = 'Please fill out all fields!';
    }
    return (
      <div className="inputbox">
        <h1>
          Write a Post
        </h1>
        <div className="titlerow">
          Title: <input value={this.state.title} onChange={this.onTitleChange} />
        </div>
        <div className="contentrow">
          Content: <textarea value={this.state.content} onChange={this.onContentChange} />
        </div>
        <div className="tagsrow">
          Tags: <input value={this.state.tags} onChange={this.onTagsChange} />
        </div>
        <div>
          <button onClick={this.submit}>Submit</button>
        </div>
        <div>
          {errorText}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (state, action) => (
  {
  }
);

export default connect(mapDispatchToProps, { createPost })(New);
