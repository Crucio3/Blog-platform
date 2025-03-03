import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();
  return isAuthenticated !== null ? children : <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default PrivateRoute;
