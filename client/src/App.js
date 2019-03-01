import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link, NavLink } from 'react-router-dom';

// Component Imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import { SignIn, SignUp } from './components/UserAuthentication';
import { Error } from './components/Errors';

// TODO Set up Routes
// TODO Pretty much everything.

class App extends Component {
  state = {
    debug: {
      courses: false,
      courseDetails: false,
      createCourse: false,
      updateCourse: false,
      signIn: false,
      signUp: true
    },
    isLoading: true,
    isAuthenticated: true,
    user: {
      firstName: 'Noel',
      lastName: 'Keener'
    },
  };

  render() {
    const { user } = this.state;
    return (
      <BrowserRouter>
        <div>
          <Header isAuthenticated={this.state.isAuthenticated} user={user}/>
          <Switch>
            <Route exact path={"/"} render={() => <Redirect to={"/courses"} />}/>
            <Route exact path={"/courses"} component={Courses} />
            <Route path={"/courses/create"} component={CreateCourse} />
            <Route path={"/courses/:id"} component={CourseDetails} />
            <Route path={"/signin"} component={SignIn} />
            <Route path={"/signup"} component={SignUp} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
