// RoleSelection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Select Role to Login</h2>
      <button onClick={() => navigate('/login/user')}>User</button>
      <button onClick={() => navigate('/login/admin')}>Admin</button>
    </div>
  );
};

export default RoleSelection;