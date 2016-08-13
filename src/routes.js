import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import New from './components/new';
import Show from './components/show';
import Error from './components/error';
import SignIn from './components/signin';
import SignUp from './components/signup';
import RequireAuth from './components/require-auth';
import SignOut from './components/signout';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="posts/new" component={RequireAuth(New)} />
    <Route path="posts/:id" component={Show} />
    <Route path="error" component={Error} />
    <Route path="signin" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <Route path="signout" component={SignOut} />
  </Route>
);
