import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Component Imports
import { AuthProvider } from './components/AuthContext';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import {
  SignOutView,
  UserSignIn,
  UserSignUp,
} from './components/UserAuthentication';
import { Error } from './components/Errors';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  state = {
    isLoading: true,
  };

  render() {
    return (
      <AuthProvider>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route exact path={'/'} component={Courses} />
              <Route
                exact
                path={'/courses'}
                render={() => <Redirect to={'/'} />}
              />
              <PrivateRoute path={'/courses/create'} component={CreateCourse} />
              <Route exact path={'/courses/:id'} component={CourseDetail} />
              <PrivateRoute
                path={'/courses/:id/update'}
                component={UpdateCourse}
              />
              <Route path={'/signin'} component={UserSignIn} />
              <Route path={'/signup'} component={UserSignUp} />
              <Route path={'/signout'} component={SignOutView} />
              <Route
                path={'/notfound'}
                render={() => <Error error={'notfound'} />}
              />
              <Route
                path={'/forbidden'}
                render={() => <Error error={'forbidden'} />}
              />
              <Route
                path={'/error'}
                render={() => <Error error={'unhandlederror'} />}
              />
              <Route render={() => <Error error={'notfound'} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
