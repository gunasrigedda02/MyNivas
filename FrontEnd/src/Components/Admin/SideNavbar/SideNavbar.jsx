// Components/Admin/SideNavbar/SideNavbar.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';
import styles from './SideNavbar.module.css';

const SideNavbar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext) || { logout: () => {} };

  const handleLogout = () => {
    logout();
    navigate('/RoleSelection');
  };

  return (
    <div className={styles.sidebar}>
      <ol className={styles.menu}>
        <li onClick={() => navigate('/Dashboard')}>Dashboard</li>
        <li onClick={() => navigate('/Hostels')}>Hostels</li>
        <li onClick={() => navigate('/Ratings')}>Ratings</li>
        <li onClick={() => navigate('/Reviews')}>Reviews</li>
        <li onClick={() => navigate('/Users')}>Users</li>
        <li onClick={handleLogout}>Logout</li>
      </ol>
    </div>
  );
};

export default SideNavbar;