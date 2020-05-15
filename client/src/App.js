import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Test from './components/Test';

export default () => (
  <Router>
    <div>
      <Route path="/test" component={Test} />
    </div>
  </Router>
);