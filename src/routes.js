import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import New from './components/new';
import Show from './components/show';
import Error from './components/error';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="posts/new" component={New} />
    <Route path="posts/:id" component={Show} />
    <Route path="error" component={Error} />
  </Route>
);
