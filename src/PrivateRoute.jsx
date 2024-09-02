import { Redirect, Route,Routes } from 'react-router-dom';
import React from 'react';

// Define a custom private route component
const PrivateRoute = ({ component: Component, ...rest }) => {
console.log("hello")
  console.log("hrghhd",  process.env.REACT_APP_API_URL)
  return
  // Check if the user is authenticated, you can implement your own logic here
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/sign-in" />
        )
      }
    />
  );
};

export default PrivateRoute;
