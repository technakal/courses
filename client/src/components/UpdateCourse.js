import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { ValidationErrors } from './Errors';

// TODO Once updated, route to the CourseDetails for the new course
// TODO Create cancel button to reroute to Courses
// TODO Handle unauthorized errors

const UpdateForm = (props) => {
  const { handleSubmit, handleCancel, course } = props;
  const { title, description, estimatedTime, materialsNeeded } = course;
  const user = course.user[0];

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-66">
        <div className="course--header">
          <h4 className="course--label">Course</h4>
          <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={ title } />
          </div>
          <p>By {user ? `${user.firstName} ${user.lastName}` : null}</p>
        </div>
        <div className="course--description">
          <div>
            <textarea id="description" name="description" className="" placeholder="Enter description..." defaultValue={description} />
          </div>
        </div>
      </div>
      <div className="grid-25 grid-right">
        <div className="course--stats">
          <ul className="course--stats--list">
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <div>
                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={estimatedTime ? estimatedTime : ""} />
              </div>
            </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <div>
                <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={materialsNeeded ? materialsNeeded: ""} />
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid-100 pad-bottom">
        <button className="button" type="submit">Update Course</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

class UpdateCourse extends Component {
  state = {
    isLoading: true,
    id: this.props.match.params.id,
    course: {
      user: []
    },
    errors: []
  };

  dbURI = `http://localhost:5000/api/courses/${this.state.id}`;

  componentDidMount() {
    axios.get(this.dbURI)
      .then(res => {
        if (res.status === 200) {
          this.setState( { course: res.data, isLoading: false })
        }
      })
      .catch(error => {
          if(error.response.status === 404) {
            this.props.history.push('/notfound');
          } else {
            this.props.history.push('/error');
          }
        }
      );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push(`/courses/${this.props.match.params.id}`)
  };

  render() {
    const { isLoading, course, errors } = this.state;

    return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        { isLoading
          ? <h2>Loading...</h2>
          : <Fragment>
            { errors.length
              ? <ValidationErrors errors={ errors }/>
              : null
            }
            <UpdateForm course={course} handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
          </Fragment>
        }
      </div>
    </div>
    )
  }
}

export default UpdateCourse;