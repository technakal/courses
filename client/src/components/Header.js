import React, { Fragment } from 'react';
// TODO Import User components

/**
 * Sign Out Component
 */
const SignOut = (props) => {
  return (
    <button>Sign Out</button>
  )
}
// TODO Remove user authentication token
// TODO Redirect to Courses route

/**
 * Header Component
 */
const Header = (props) => {
  const { isAuthenticated } = props;
  return(
    <header className={"header"}>
      <div className={"bounds"}>
        <h1 className={"header--logo"}>Courses</h1>
        <nav>
          {isAuthenticated
            ? <Fragment>
               {/* TODO If authenticated, render UserProfile component */}
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
