import React, { Component } from 'react';

/**
 * Performs a check to see if the identified type of storage is available on the device.
 * @credit https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 * @param {string} type - Type of storage to check.
 * @returns Boolean
 */
const storageAvailable = type => {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
};

/**
 * Creates the AuthContext for global auth state.
 */
const AuthContext = React.createContext();

/**
 * Stores and updates the global auth state.
 */
class AuthProvider extends Component {
  state = {
    isAuthenticated: false,
    token: null,
    user: null,
  };

  /**
   * Checks if auth state is in localStorage.
   * If so, retrieves auth state for that shiny cross-session user experience.
   */
  componentWillMount() {
    if (storageAvailable('localStorage')) {
      const hasAuth = localStorage.getItem('token');

      if (hasAuth) {
        this.setState({
          isAuthenticated: true,
          token: localStorage.getItem('token'),
          user: {
            firstName: localStorage.getItem('firstName'),
            lastName: localStorage.getItem('lastName'),
            emailAddress: localStorage.getItem('emailAddress'),
            id: localStorage.getItem('id'),
          },
        });
      }
    }
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          state: this.state,
          /**
           * Sets auth state.
           * Stores state in localStorage, if available.
           */
          signIn: (user, token) => {
            if (storageAvailable('localStorage')) {
              localStorage.setItem('token', token);
              localStorage.setItem('firstName', user.firstName);
              localStorage.setItem('lastName', user.lastName);
              localStorage.setItem('emailAddress', user.emailAddress);
              localStorage.setItem('id', user.id);
            }

            this.setState(prevState => ({
              isAuthenticated: true,
              token,
              user,
            }));
          },
          /**
           * Clears auth state.
           * Clears state in localStorage.
           */
          signOut: () => {
            if (storageAvailable('localStorage')) {
              localStorage.clear();
            }

            this.setState(prevState => ({
              isAuthenticated: false,
              token: null,
              user: null,
            }));
          },
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthProvider, AuthContext };
