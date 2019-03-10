import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Component imports
import { AuthContext } from './AuthContext';
import { Error } from './Errors';
import ErrorBoundary from './ErrorBoundary';

/**
 * Action Bar Component
 * Controls updating and deleting courses.
 * Only available for authenticated users.
 * @returns {jsx} ActionBar
 * @constructor
 */
const ActionBar = ({ courseId, handleDelete }) => {
  return (
    <div className={'actions--bar'}>
      <div className={'bounds'}>
        <div className={'grid-100'}>
          <AuthContext.Consumer>
            {context => (
              <span>
                <Link className={'button'} to={`/courses/${courseId}/update`}>
                  Update Course
                </Link>
                <button
                  className={'button'}
                  onClick={e => handleDelete(e, context.state.token)}>
                  Delete Course
                </button>
                {!context.state.isAuthenticated ? (
                  <span>
                    You must <Link to={'/signin'}>sign in</Link> to make
                    changes.
                  </span>
                ) : null}
              </span>
            )}
          </AuthContext.Consumer>
        </div>
      </div>
    </div>
  );
};

/**
 * Course Info
 * Contains primary details about the course
 * @param props - Title, description, user
 * @returns {jsx} Courseinfo
 * @constructor
 */
const CourseInfo = props => {
  const { title, description, user } = props.course;

  return (
    <div className={'bounds course--detail'}>
      <div className="grid-66">
        <div className={'course--header'}>
          <h4 className={'course--label'}>Course</h4>
          <h3 className={'course--title'}>{title}</h3>
          {user !== undefined && user.length ? (
            <p>By {`${user[0].firstName} ${user[0].lastName}`}</p>
          ) : null}
        </div>
        <div className={'course--description'}>
          <Markdown source={description} />
        </div>
      </div>
    </div>
  );
};

/**
 * CourseStats
 * Secondary information about the course
 * @param props - Estimated time, materials needed.
 * @returns {jsx} CourseStats
 * @constructor
 */
const CourseStats = props => {
  const { estimatedTime, materialsNeeded } = props;
  return (
    <div className={'grid-25 grid-right'}>
      <div className={'course--stats'}>
        <ul className={'course--stats--list'}>
          {estimatedTime ? (
            <li className={'course--stats--list--item'}>
              <h4>Estimated Time</h4>
              <h3>{estimatedTime}</h3>
            </li>
          ) : null}
          {materialsNeeded ? (
            <li className={'course--stats--list--item'}>
              <h4>Materials Needed</h4>
              <Markdown source={materialsNeeded} />
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

/**
 * Course Detail Component
 * Provides additional details about a course.
 * Allows authenticated users to edit or delete the course, if they own it.
 */
class CourseDetail extends Component {
  state = {
    id: this.props.match.params.id,
    course: {
      _id: null,
      title: null,
      description: null,
      user: [],
    },
    displayActions: false,
  };

  dbURI = `http://localhost:5000/api/courses/${this.state.id}`;

  // Retrieves the course details from the API
  componentDidMount() {
    console.log(this.context.state.user.id);
    axios
      .get(this.dbURI)
      .then(res => {
        if (res.status === 200) {
          this.setState({ course: res.data }, () => {
            if (
              this.context.state.token &&
              this.state.course.user[0]._id === this.context.state.user.id
            ) {
              this.setState({ displayActions: true });
            }
          });
        }
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push('/notfound');
        } else {
          this.props.history.push('/error');
        }
      });
  }

  // Sends the delete request to remove the course.
  deleteCourse = (e, token) => {
    e.preventDefault();
    if (!token || token === undefined) {
      this.props.history.push('/signin');
    } else {
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(this.dbURI, options)
        .then(res => {
          if (res.status === 204) {
            this.props.history.push('/courses');
          }
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.props.history.push('/notfound');
          } else if ([401, 403].includes(error.response.status)) {
            this.props.history.push('/forbidden');
          } else {
            this.props.history.push('/error');
          }
        });
    }
  };

  renderComponent() {
    const { course } = this.state;
    const { estimatedTime, materialsNeeded } = course;
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return (
      <ErrorBoundary>
        <CourseInfo course={course} />
        {estimatedTime || materialsNeeded ? (
          <CourseStats
            estimatedTime={estimatedTime}
            materialsNeeded={materialsNeeded}
          />
        ) : null}
      </ErrorBoundary>
    );
  }

  render() {
    const { displayActions } = this.state;
    return (
      <div>
        {displayActions ? (
          <ActionBar
            courseId={this.state.id}
            handleDelete={this.deleteCourse}
          />
        ) : null}
        {this.renderComponent()}
      </div>
    );
  }
}

CourseDetail.contextType = AuthContext;

export default CourseDetail;
