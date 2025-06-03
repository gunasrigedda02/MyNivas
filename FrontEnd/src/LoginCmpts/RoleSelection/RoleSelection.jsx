// src/LoginCmpts/RoleSelection/RoleSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RoleSelection.module.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/Login/${role}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navLinks}>
        <span onClick={() => navigate('/')}>Home</span>
        <span onClick={() => navigate('/Register')}>Register</span>
      </div>
      <h2>Select Your Role</h2>
      <div className={styles.buttonGroup}>
        <button className={styles.roleButton} onClick={() => handleRoleSelect('user')}>
          User
        </button>
        <button className={styles.roleButton} onClick={() => handleRoleSelect('admin')}>
          Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;