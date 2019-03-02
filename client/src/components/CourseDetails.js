import React, { Component, Fragment } from 'react';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Error } from './Errors';

/**
 * Action Bar Component
 * Controls updating and deleting courses.
 * Only available for authenticated users.
 * @returns {jsx} ActionBar
 * @constructor
 */
// TODO Add update handler
// TODO Add delete handler
const ActionBar = ({courseId}) => {
  return (
    <div className={"actions--bar"}>
      <div className={"bounds"}>
         <div className={"grid-100"}>
            <span>
              {/* TODO Add update course route */}
              <Link className={"button"} to={`/courses/${courseId}/update`}>Update Course</Link>
              {/*TODO Add delete course route */}
              <Link className={"button"} to={`/courses/${courseId}/delete`}>Delete Course</Link>
            </span>
         </div>
      </div>
    </div>
  )
};

/**
 * Course Info
 * Contains primary details about the course
 * @param props - Title, description, user
 * @returns {jsx} Courseinfo
 * @constructor
 */
const CourseInfo = (props) => {
  const { title, description, user } = props.course;

  return (
    <div className={"bounds course--detail"}>
      <div className="grid-66">
        <div className={"course--header"}>
          <h4 className={"course--label"}>Course</h4>
          <h3 className={"course--title"}>{title}</h3>
          { user !== undefined && user.length
            ? <p>By { `${ user[0].firstName } ${ user[0].lastName }` }</p>
            : null
          }
        </div>
        <div className={"course--description"}>
          <Markdown source={description}/>
        </div>
      </div>
    </div>
  )
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
    <div className={"grid-25 grid-right"}>
      <div className={"course--stats"}>
        <ul className={"course--stats--list"}>
          { estimatedTime
            ? <li className={ "course--stats--list--item" }>
              <h4>Estimated Time</h4>
              <h3>{ estimatedTime }</h3>
            </li>
            : null
          }
          { materialsNeeded
            ? <li className={ "course--stats--list--item" }>
              <h4>Materials Needed</h4>
              <Markdown source={ materialsNeeded }/>
            </li>
            : null
          }
        </ul>
      </div>
    </div>
  )
};

/**
 * Course Details Component
 * Provides additional details about a course.
 * Allows authenticated users to edit or delete the course, if they own it.
 */
class CourseDetails extends Component {
  state = {
    id: this.props.match.params.id,
    isAuthenticated: true,
    course: {
      _id: null,
      title: null,
      description: null,
      user: [],
    }
  };

  dbURI = `http://localhost:5000/api/courses/${this.state.id}`;

  componentDidMount() {
    axios.get(this.dbURI)
      .then(res => {
        if (res.status === 200) {
          this.setState( {course: res.data })
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

  renderComponent() {
    const { course } = this.state;
    const { estimatedTime, materialsNeeded } = course;
    if(this.state.error) {
      return <Error error={this.state.error}/>
    }
    return (
      <Fragment>
        <CourseInfo course={course} />
        { estimatedTime || materialsNeeded
          ? <CourseStats estimatedTime={ estimatedTime } materialsNeeded={ materialsNeeded }/>
          : null
        }
      </Fragment>
    )
  }

  render() {
    const { isAuthenticated } = this.state;

    return(
      <div>
        { isAuthenticated
          ? <ActionBar courseId={this.state.id} />
          : null
        }
        { this.renderComponent() }
      </div>
    )
  }
}

export default CourseDetails;