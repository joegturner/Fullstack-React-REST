import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// Import Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import PrivateRoute from './PrivateRoute';

// Consumer wrapper
import withContext from './Context';
const HeaderWithContext = withContext(Header);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />
      <Switch>
        <Route exact path="/" component={withContext(Courses)} />
        <Route path = '/signin' component={withContext(UserSignIn)} />
        <Route path = '/signup' component={withContext(UserSignUp)} />
        <Route path = '/signout' component={withContext(UserSignOut)} />
        <PrivateRoute path="/courses/create" component={withContext(CreateCourse)} />
        <PrivateRoute path="/courses/:id/update" component={withContext(UpdateCourse)} />
        <Route exact path="/courses/:id" component={withContext(CourseDetail)} />
        <Route path="/error" component={UnhandledError} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/notfound" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);