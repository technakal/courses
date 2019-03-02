import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
// TODO Import User components

/**
 * Sign Out Component
 */
const SignOut = (props) => {
  return (
    <Link className={"signout"} to={'/signout'}>Sign Out</Link>
  )
};

// TODO Remove user authentication token
// TODO Redirect to Courses route

/**
 * Header Component
 */
const Header = (props) => {
  const { isAuthenticated, user } = props;
  return(
    <header className={"header"}>
      <div className={"bounds"}>
        <Link to={'/'}><h1 className={"header--logo"}>Courses</h1></Link>
        <nav>
          {isAuthenticated
            ? <Fragment>
                <span>Welcome back, {`${user.firstName} ${user.lastName}!`}</span>
                <SignOut />
              </Fragment>
            : <Fragment>
                <Link className={"signup"} to={"/signup"} >Sign Up</Link>
                <Link className={"signup"} to={"/signin"} >Sign In</Link>
              </Fragment>
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
