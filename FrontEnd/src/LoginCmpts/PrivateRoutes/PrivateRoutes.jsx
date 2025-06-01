// Components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoutes({ children }) {
  const isAuthenticated = true; // Replace with your actual authentication check
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoutes;
