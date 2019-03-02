import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

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
    isLoading: true,
  };

  render() {
    const { user } = this.state;
    const notFound = {
      message: `You haven't found what you're looking for, but you have found our secret lair. You really shouldn't be here.`,
      status: 404,
      statusText: 'Not Found'
    };
    const unhandledError = {
      message: `This is embarrassing, but something went wrong. Not really sure what...`,
      status: 500,
      statusText: 'Uh-oh'
    };
    const forbidden = {
      message: `You're not allowed to do that.`,
      status: 401,
      statusText: 'Forbidden'
    };

    return (
      <BrowserRouter>
        <div>
          <Header isAuthenticated={this.state.isAuthenticated} user={user}/>
          <Switch>
            <Route exact path={"/"} render={() => <Redirect to={"/courses"} />}/>
            <Route exact path={"/courses"} component={Courses} />
            <Route path={"/courses/create"} component={CreateCourse} />
            <Route exact path={"/courses/:id"} component={CourseDetails} />
            <Route path={'/courses/:id/update'} component={UpdateCourse} />
            <Route path={"/signin"} component={SignIn} />
            <Route path={"/signup"} component={SignUp} />
            <Route path={'/notfound'} render={() =>
              <Error error={notFound}/>
            } />
            <Route path={'/forbidden'} render={() =>
              <Error error={forbidden}/>
            } />
            <Route path={'/error'} render={() =>
              <Error error={unhandledError}/>
            } />
            <Route render={() =>
              <Error error={notFound}/>
            } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
