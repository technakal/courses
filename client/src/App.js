import React, { Component } from 'react';

// TODO Import Router
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
    return (
      <div className="App">
        <header className="App-header">
          { this.state.isLoading
              ? <h1>Loading...</h1>
              : <h1>Course Directory</h1>
          }
          { this.state.courses.map(course =>
            <div key={course._id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <em>{`Owner: ${course.user[0].firstName} ${course.user[0].lastName}`}</em>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
