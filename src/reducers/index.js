import { combineReducers } from 'redux';

import postReducer from './post-reducer';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

export default rootReducer;
