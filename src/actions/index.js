import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=j_zhou';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

// fetch all posts
export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }).catch(error => {
      console.log('Error getting posts');
      browserHistory.push('/error');
    });
  };
}

// create a new post
export function createPost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.post(`${ROOT_URL}/posts${API_KEY}`, fields).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log('Error creating post');
      browserHistory.push('/error');
    });
  };
}

// update a post
export function updatePost(post) {
  return (dispatch) => {
    const fields = { title: post.title, content: post.content, tags: post.tags };
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, fields).then(response => {
      browserHistory.push(`/posts/${post.id}`);
    }).catch(error => {
      console.log('Error updating post');
      browserHistory.push('/error');
    });
  };
}

// fetch a specific post
export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch(error => {
      console.log('Error getting single post');
      browserHistory.push('/error');
    });
  };
}

// delete post
export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log('Error deleting post');
      browserHistory.push('/error');
    });
  };
}
