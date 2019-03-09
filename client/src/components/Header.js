import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Component imports
import { AuthContext } from './AuthContext';
import ErrorBoundary from './ErrorBoundary';

/**
 * Displays the sign out option.
 */
const SignOut = props => {
  return (
    <Link className={'signout'} onClick={props.handleSignOut} to={'/courses'}>
      Sign Out
    </Link>
  );
};

/**
 * Header Component
 */
const Header = () => {
  return (
    <header className={'header'}>
      <div className={'bounds'}>
        <Link to={'/'}>
          <h1 className={'header--logo'}>Courses</h1>
        </Link>
        <nav>
          <ErrorBoundary>
            <AuthContext.Consumer>
              {context =>
                context.state.isAuthenticated ? (
                  <Fragment>
                    <span>Welcome back, {context.state.user.firstName}!</span>
                    <SignOut handleSignOut={context.signOut} />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Link className={'signup'} to={'/signup'}>
                      Sign Up
                    </Link>
                    <Link className={'signup'} to={'/signin'}>
                      Sign In
                    </Link>
                  </Fragment>
                )
              }
            </AuthContext.Consumer>
          </ErrorBoundary>
        </nav>
      </div>
    </header>
  );
};

export default Header;
