import axios from 'axios';
import { browserHistory } from 'react-router';

const ROOT_URL = 'https://jz-hw5-p2.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// fetch all posts
export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`).then(response => {
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
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
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
    axios.put(`${ROOT_URL}/posts/${post.id}`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
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
    axios.get(`${ROOT_URL}/posts/${id}`).then(response => {
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
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      browserHistory.push('/');
    }).catch(error => {
      console.log('Error deleting post');
      browserHistory.push('/error');
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signinUser(email, password) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

export function signupUser(email, password) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password }).then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/');
    }).catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}
