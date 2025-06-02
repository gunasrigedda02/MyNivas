// LogoutButton.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/RoleSelection');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;