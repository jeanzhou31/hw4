// home page -- shows all posts

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterText: '',
      filterGo: '',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.go = this.go.bind(this);
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  // update filter input
  onFilterChange(event) {
    this.setState({ filterText: event.target.value });
  }

  // submit filter
  go() {
    this.setState({
      filterGo: this.state.filterText,
    });
  }

  // render list of all posts
  renderPosts() {
    return this.props.all.map((post) => {
      const tagList = post.tags.split(', ');
      let include = false;
      for (let i = 0; i < tagList.length; i++) {
        // if list of tags (comma delimiter) includes filter term, include = true
        if (tagList[i] === this.state.filterGo) {
          include = true;
        }
      }
      // if no filter or if post tag contains filter, return it
      if (this.state.filterGo === '' || include) {
        return (
          <Link to={`posts/${post.id}`} key={post.id} className="homepost">
            <div>
              <b>Title:</b> {post.title}
            </div>
            <div>
              <b>Tags:</b> {post.tags}
            </div>
          </Link>
        );
      }
      return null;
    });
  }

  // render function
  render() {
    return (
      <div className="homefull">
        <div>
          <b>Filter Tags:</b> <input value={this.state.filterText} onChange={this.onFilterChange} />
          <button onClick={this.go} id="gobutton">Go</button>
        </div>
        {this.renderPosts()}
      </div>
    );
  }
}

const mapDispatchToProps = (state, action) => (
  {
    all: state.posts.all,
  }
);

export default connect(mapDispatchToProps, { fetchPosts })(Home);
