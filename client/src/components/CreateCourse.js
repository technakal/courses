import React, { Component } from 'react';
import axios from 'axios';

// Component imports
import { ValidationErrors } from './Errors';
import { AuthContext } from './AuthContext';

/**
 * Form for creating a new course.
 * @param {func} handleChange
 * @param {func} handleSubmit
 * @param {func} handleCancel
 * @returns JSX component
 */
const CreateCourseForm = ({ handleChange, handleSubmit, handleCancel }) => {
  return (
    <AuthContext.Consumer>
      {context => (
        <form
          onSubmit={e =>
            handleSubmit(e, context.state.user, context.state.token)
          }>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  className="input-title course--title--input"
                  placeholder="Course title..."
                  defaultValue=""
                  onChange={handleChange}
                />
              </div>
              <p>
                By{' '}
                {`${context.state.user.firstName} ${
                  context.state.user.lastName
                }`}
              </p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  className=""
                  placeholder="Course description..."
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      className="course--time--input"
                      placeholder="Hours"
                      defaultValue=""
                      onChange={handleChange}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      className=""
                      placeholder="List materials..."
                      onChange={handleChange}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Create Course
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </AuthContext.Consumer>
  );
};

/**
 * Create Course Component
 * Form for creating a new course.
 * Requires user to be authenticated.
 */
class CreateCourse extends Component {
  state = {
    errors: [],
  };

  componentDidMount() {
    document.querySelector('#title').focus();
  }

  // Sets course values based on user entry.
  handleChange = () => {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const estimatedTime = document.querySelector('#estimatedTime').value;
    const materialsNeeded = document.querySelector('#materialsNeeded').value;
    this.setState({
      course: {
        title,
        description,
        estimatedTime,
        materialsNeeded,
      },
    });
  };

  /**
   * Handles form submission for the CreateCourseForm.
   * If user is not authenticated, pushes them to the sign in page.
   * @param {event} e
   * @param {object} user - The authenticated user.
   * @param {string} token - The JWT token, used for authentication to the API.
   * @memberof CreateCourse
   */
  handleSubmit = (e, user, token) => {
    e.preventDefault();
    if (token === null || token === undefined || !token) {
      this.props.history.push('/signin');
    } else {
      const course = this.state.course;
      const data = {
        title: course.title,
        description: course.description,
        estimatedTime: course.estimatedTime,
        materialsNeeded: course.materialsNeeded,
        user: user.id,
      };
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const dbURI = 'http://localhost:5000/api/courses';

      axios
        .post(dbURI, data, options)
        .then(res => {
          if (res.status === 201) {
            this.props.history.push(`/courses${res.headers.location}`);
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.setState({ errors: error.response.data.errors });
          } else if (error.response.status === 404) {
            this.props.history.push('/notfound');
          } else if ([401, 403].includes(error.response.status)) {
            this.props.history.push('/forbidden');
          } else {
            this.props.history.push('/error');
          }
        });
    }
  };

  // Returns user to the main page.
  handleCancel = e => {
    e.preventDefault();
    this.props.history.push(`/courses`);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className={'bounds course--detail'}>
        <h1>Create Course</h1>
        <AuthContext.Consumer>
          {context =>
            !context.state.isAuthenticated ? (
              <h2>You must sign in to create a new course.</h2>
            ) : (
              <div>
                {errors.length ? <ValidationErrors errors={errors} /> : null}
                <CreateCourseForm
                  user={context.state.user}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  handleCancel={this.handleCancel}
                />
              </div>
            )
          }
        </AuthContext.Consumer>
      </div>
    );
  }
}

export default CreateCourse;
