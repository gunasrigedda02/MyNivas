// ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth } = useContext(AuthContext);

  // If auth is not available, redirect to RoleSelection
  if (!auth) {
    return <Navigate to="/RoleSelection" />;
  }

  // If not authenticated, redirect to RoleSelection
  if (!auth.isAuthenticated) {
    return <Navigate to="/RoleSelection" />;
  }

  // If the role doesn't match, redirect to homepage
  if (auth.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;