import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

// Component Imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import { SignIn, SignUp } from './components/UserAuthentication';

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
    courses: []
  };

  dbURI = 'http://localhost:5000/api/courses';

  componentWillMount() {
    fetch(this.dbURI)
      .then(response => response.json())
      .then(data => this.setState({courses: data, isLoading: false}))
      .catch(error => console.log(error));
  }

  render() {
    const { isAuthenticated, isLoading, user } = this.state;
    const { courses, courseDetails, createCourse, updateCourse, signIn, signUp } = this.state.debug;
    return (
      <div>
        <Header isAuthenticated={this.state.isAuthenticated} user={user}/>
        <hr />
        { courses
          ? <Courses courses={this.state.courses} isAuthenticated={isAuthenticated} />
          : null
        }
        { courseDetails
          ? <CourseDetails isAuthenticated={isAuthenticated}/>
          : null
        }
        { createCourse
          ? <CreateCourse isAuthenticated={isAuthenticated} user={user} />
          : null
        }
        { updateCourse
          ? <UpdateCourse />
          : null
        }
        {
          signIn
          ? <SignIn />
          : null
        }
        {
          signUp
            ? <SignUp />
            : null
        }
      </div>
    );
  }
}

export default App;
