import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from './AuthContext';

/**
 * Sign Out Component
 */
const SignOut = (props) => {
  return (
    <Link className={"signout"} onClick={props.handleSignOut} to={'/courses'}>Sign Out</Link>
  )
};

// TODO Remove user authentication token on sign out

/**
 * Header Component
 */
const Header = (props) => {
  return(
    <header className={"header"}>
      <div className={"bounds"}>
        <Link to={'/'}><h1 className={"header--logo"}>Courses</h1></Link>
        <nav>
          <AuthContext.Consumer>
            {(context) => (
              context.state.isAuthenticated
                ? <Fragment>
                    <span>Welcome back, {context.state.user.firstName}!</span>
                    <SignOut handleSignOut={context.signOut}/>
                  </Fragment>
                  :<Fragment>
                    <Link className={"signup"} to={"/signup"} >Sign Up</Link>
                    <Link className={"signup"} to={"/signin"} >Sign In</Link>
                  </Fragment>
            )
            }
          </AuthContext.Consumer>
        </nav>
      </div>
    </header>
  );
};

export default Header;
