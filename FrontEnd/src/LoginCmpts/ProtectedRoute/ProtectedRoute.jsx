// Components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useContext(AuthContext) || { auth: { isAuthenticated: false, role: null } };
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/Login/user" state={{ from: location.pathname }} replace />;
  }

  if (role && auth.role !== role) {
    return <Navigate to={auth.role === 'user' ? '/Home' : '/Dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;