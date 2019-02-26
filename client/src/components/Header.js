import React, { Fragment } from 'react';
// TODO Import User components

/**
 * Sign Out Component
 */
const SignOut = (props) => {
  return (
    <a className={"signout"}>Sign Out</a>
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
        <h1 className={"header--logo"}>Courses</h1>
        <nav>
          {isAuthenticated
            ? <Fragment>
                <span>Welcome back, {`${user.firstName} ${user.lastName}!`}</span>
                <SignOut />
              </Fragment>
            : <Fragment>
                <a className={"signup"}>Sign Up</a>
                <a className={"signup"}>Sign In</a>
              </Fragment>
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
