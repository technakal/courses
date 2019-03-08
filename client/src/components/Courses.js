import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// Components
import Loading from './Loading';

const NewCourse = () => {
  return (
    <div className="grid-33">
      <Link className="course--module course--add--module" to="/courses/create">
        <h3 className="course--add--title">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
               viewBox="0 0 13 13" className="add">
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </h3>
      </Link>
    </div>
  )
};

const CourseCard = (props) => {
  const { title, _id } = props.course;
  return (
    <div className={"grid-33"}>
      <Link className="course--module course--link" to={`/courses/${_id}`}>
        <h4 className={"course--label"}>Course</h4>
        <h3 className={"course--title"}>{title}</h3>
      </Link>
    </div>
  )
};

/**
 * Courses Component
 * Displays a list of all courses.
 * Stateful component.
 */
class Courses extends Component {
  state = {
    courses: [],
    errors: [],
    isLoading: true
  };

  // TODO Optional! If authenticated, render list of user courses.

  componentWillMount () {
    const dbURI = 'http://localhost:5000/api/courses';

    axios.get(dbURI)
      .then(res => {
        if (res.status === 200) {
          this.setState({courses: res.data, isLoading: false});
        }
      })
      .catch(error => {
        if ( error.response.status !== 404 ) {
          this.props.history.push( '/error' );
        }
      })
  }

  renderComponent = (courses) => {
    if(this.state.isLoading) {
      return <Loading />;
    } else if(!this.state.courses.length) {
      return (
        <Fragment>
          <div>
            <h1>No Courses Found</h1>
            <p>Be the first to create one!</p>
          </div>
          <AuthContext.Consumer>
            {context =>
              context.state.isAuthenticated
                ? <NewCourse/>
                : null
            }
          </AuthContext.Consumer>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          {courses.map(course =>
            <CourseCard key={course._id} course={course} />
          )}
          <AuthContext.Consumer>
            {context =>
              context.state.isAuthenticated
                ? <NewCourse/>
                : null
            }
          </AuthContext.Consumer>
        </Fragment>
      );
    }
  };

  render() {
    const { courses } = this.state;
    return(
      <div className={"bounds"}>
        {this.renderComponent(courses)}
      </div>
    )
  }
};

export default Courses;