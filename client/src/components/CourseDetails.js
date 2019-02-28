import React, { Component } from 'react';
import Markdown from 'react-markdown';

/**
 * Action Bar Component
 * Controls updating and deleting courses.
 * Only available for authenticated users.
 * @returns {jsx} ActionBar
 * @constructor
 */
// TODO Add update handler
// TODO Add delete handler
const ActionBar = () => {
  return (
      <div className={"bounds"}>
         <div className={"grid-100"}>
            <span>
              {/* TODO Add update course route */}
              <a className={"button"} href={"#"}>Update Course</a>
              {/*TODO Add delete course route */}
              <a className={"button"} href={"#"}>Delete Course</a>
            </span>
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
const CourseInfo = props => {
  const {title, description, user} = props;
  return (
    <div className={"bounds course--detail"}>
      <div className="grid-66">
        <div className={"course--header"}>
          <h4 className={"course--label"}>Course</h4>
          <h3 className={"course--title"}>{title}</h3>
          { user ?
            <p>By { `${ user.firstName } ${ user.lastName }` }</p>
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
    id: '57029ed4795118be119cc441',
    isAuthenticated: true,
    course: {
      _id: null,
      title: null,
      description: null,
      user: [],
    }
  };

  dbURI = `http://localhost:5000/api/courses/${this.state.id}`;

  componentWillMount() {
    fetch(this.dbURI)
      .then(response => response.json())
      .then(data => this.setState({course: data}))
      .catch(error => console.log(error));
  }

  render() {
    const { isAuthenticated } = this.state;
    const { title, description, estimatedTime, materialsNeeded } = this.state.course;
    let user;

    if(this.state.course.user.length) {
      user = this.state.course.user[0];
    };

    return(
      <div>
        <div className={"actions--bar"}>
          { isAuthenticated
            ? <ActionBar />
            : null
          }
        </div>
        <CourseInfo title={title} description={description} user={user ? user: null} />
        { estimatedTime || materialsNeeded
          ? <CourseStats estimatedTime={ estimatedTime } materialsNeeded={ materialsNeeded }/>
          : null
        }
      </div>
    )
  }
}

export default CourseDetails;