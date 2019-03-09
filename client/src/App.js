import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Component Imports
import { AuthProvider } from './components/AuthContext';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import { SignIn, SignUp } from './components/UserAuthentication';
import { Error } from './components/Errors';

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
              <Route
                exact
                path={'/'}
                render={() => <Redirect to={'/courses'} />}
              />
              <Route exact path={'/courses'} component={Courses} />
              <Route path={'/courses/create'} component={CreateCourse} />
              <Route exact path={'/courses/:id'} component={CourseDetails} />
              <Route path={'/courses/:id/update'} component={UpdateCourse} />
              <Route path={'/signin'} component={SignIn} />
              <Route path={'/signup'} component={SignUp} />
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
