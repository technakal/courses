import React, { Component } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';

// Component Imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';

// TODO Set up Routes
// TODO Pretty much everything.

class App extends Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
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
    const { isAuthenticated, isLoading } = this.state;
    return (
      <div className="App">
        <Header isAuthenticated={this.state.isAuthenticated}/>
        { isLoading
          ? <h1>Loading</h1>
          : <Courses courses={this.state.courses} isAuthenticated={isAuthenticated} />
        }
        { isLoading
          ? null
          : <CourseDetails isAuthenticated={isAuthenticated}/>
        }
      </div>
    );
  }
}

export default App;
