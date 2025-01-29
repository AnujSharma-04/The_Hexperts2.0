// src/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate to redirect

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('jwt_token') ? true : false;

  return isAuthenticated ? (
    <Element {...rest} /> // Render the component if authenticated
  ) : (
    <Navigate to="/login" /> // Redirect to login if not authenticated
  );
};

export default PrivateRoute;
