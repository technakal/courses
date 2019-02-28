import React, { Component } from 'react';
import { ValidationErrors } from './Errors';

/**
 * Sign In Component
 */
// TODO Render cancel button to reroute to Courses
// TODO Persist authentication across sessions
// TODO After sign-in, reroute to last page visited
class SignIn extends Component {
  state = {
    errors: []
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/courses');
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            { errors.length
              ? <ValidationErrors errors={errors}/>
              : null
            }
            <form>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" value="" />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary"
                        onClick={this.handleCancel}>Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
        </div>
      </div>
    )
  }
}

/**
 * Sign Up Component
 */
// TODO Render cancel button to reroute to Courses
// TODO Persist authentication across sessions
// TODO After sign-in, reroute to Courses
class SignUp extends Component {
  state = {
    errors: []
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.props.history.push('/courses');
  };

  render() {
    const { errors } = this.state;
    return(
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            { errors.length
              ? <ValidationErrors errors={errors}/>
              : null
            }
            <form>
              <div>
                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value="" />
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value=""/>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value=""/>
                </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" value=""/>
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value=""/>
                </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
        </div>
      </div>
    )
  }
}

export { SignIn, SignUp };