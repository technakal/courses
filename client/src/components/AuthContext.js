import React from 'react';

export const userAuth = {
  isAuthenticated: false,
  user: []
};

export const AuthContext = React.createContext(userAuth);