import React, { Component } from 'react';
import axios from 'axios';

import { ValidationErrors } from './Errors';

/**
 * Sign In Component
 */
// TODO Persist authentication across sessions
// TODO After sign-in, reroute to last page visited
class SignIn extends Component {
  state = {
    errors: []
  };

  dbURI = `http://localhost:5000/api/users`;

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.defaultValue });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const credentials = window.btoa(this.state.emailAddress + ':' + this.state.password);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Basic ${credentials}`
      }
    };

    axios.get(this.dbURI, options)
      .then(res => {
        if (res.status === 200) {
          this.setState( {isAuthenticated: true, user: res.data.user })
          this.props.history.push('/courses');
        }
      })
      .catch(error => {
        if(error.response.status === 404) {
          this.props.history.push( '/notfound' );
        } else if (error.response.status === 401) {
          this.setState(
            {
              errors: [
                error.response.data.error
              ]
          })
        } else {
          this.props.history.push('/error');
        }
      });
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
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" onChange={this.handleChange}/>
              </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" onChange={this.handleChange}/>
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
// TODO Persist authentication across sessions
// TODO After sign-in, reroute to Courses
class SignUp extends Component {
  state = {
    errors: []
  };

  dbURI = `http://localhost:5000/api/users`;

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      password: this.state.password
    };

    axios.post(this.dbURI, data)
      .then(res => {
        if (res.status === 201) {
          this.setState( {isAuthenticated: true, user: res.data.user })
          this.props.history.push('/courses');
        }
      })
      .catch(error => {
        if(error.response.status === 404) {
          this.props.history.push( '/notfound' );
        } else if (error.response.status === 400) {
          console.log(error.response);
          this.setState({errors: error.response.data.errors});
        } else {
          this.props.history.push('/error');
        }
      });
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
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="firstName" name="firstName" type="text" className="" placeholder="First Name" defaultValue="" onChange={this.handleChange} />
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" defaultValue="" onChange={this.handleChange}/>
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" onChange={this.handleChange}/>
                </div>
              <div>
                <input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" onChange={this.handleChange}/>
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