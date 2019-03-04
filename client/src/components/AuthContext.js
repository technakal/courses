import React, { Component } from 'react';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    isAuthenticated: true,
    token: null,
    user: 'Noel Keener'
  };

  render () {
    return (
      <AuthContext.Provider value={ {
        state: this.state,
        signIn: (user, token) => {
          console.log(user, token);
          this.setState(prevState => ({
            isAuthenticated: true,
            token,
            user
          }));
        },
        signOut: () => {
          this.setState(prevState => ({
            isAuthenticated: false,
            token: null,
            user: null
          }));
        }
      } }>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export { AuthProvider, AuthContext };