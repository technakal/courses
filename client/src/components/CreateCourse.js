import React, { Component } from 'react';
import { ValidationErrors } from './Errors';

const CreateCourseForm = (props) => {
  const { user, handleSubmit, handleCancel } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid-66">
        <div className="course--header">
          <h4 className="course--label">Course</h4>
          <div>
            <input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value="" />
          </div>
          <p>By {`${user.firstName} ${user.lastName}`}</p>
        </div>
        <div className="course--description">
          <div>
            <textarea id="description" name="description" className="" placeholder="Course description..."/>
          </div>
        </div>
      </div>
      <div className="grid-25 grid-right">
        <div className="course--stats">
          <ul className="course--stats--list">
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <div>
                <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" value=""/>
              </div>
            </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <div>
                <textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..."/>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid-100 pad-bottom">
        <button className="button" type="submit">Create Course</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel
        </button>
      </div>
    </form>
  )
};

/**
 * Create Course Component
 * Form for creating a new course.
 * Requires user to be authenticated.
 */
class CreateCourse extends Component {
  state = {
    errors: [
      'Course requires a title',
      'Course requires a description'
    ]
  };

  // TODO Handle unauthorized errors
  // TODO Handle validation errors
  // TODO Once created, route to the CourseDetails for the new course
// TODO Create cancel button to reroute to Courses

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Class created!');
  };

  handleCancel = (e) => {
    e.preventDefault();
    console.log('Cancel creation.')
  }

  render() {
    const { errors } = this.state;
    const { user, isAuthenticated } = this.props;
    return (
      <div className={"bounds course--detail"}>
        <h1>Create Course</h1>
        { !isAuthenticated
          ? <h1>Please Sign In.</h1>
          : <div>
              { errors.length
                ? <ValidationErrors errors={ errors }/>
                : null
              }
              <CreateCourseForm user={user} handleSubmit={ this.handleSubmit } handleCancel={this.handleCancel}/>
            </div>
        }
      </div>
    )
  }
}

export default CreateCourse;