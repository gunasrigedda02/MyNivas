// SideNavbar.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './SideNavbar.module.css';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';

const SideNavbar = () => {
  const navigate = useNavigate();
  const { logout, auth } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate('/'); // Redirect to homepage
  };

  return (
    <div className={Styles.sidebar}>
      <ol className={Styles.menu}>
        <li onClick={() => navigate('/Dashboard')}>Dashboard</li>
        <li onClick={() => navigate('/Hostels')}>Hostels</li>
        <li onClick={() => navigate('/Ratings')}>Ratings</li>
        <li onClick={() => navigate('/Reviews')}>Reviews</li>
        <li onClick={() => navigate('/Users')}>Users</li>

        {auth.isAuthenticated ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li className={Styles.login}>
            Login
            <ol className={Styles.loginOptions}>
              <li onClick={() => navigate('/Login/user')}>User Login</li>
              <li onClick={() => navigate('/Login/admin')}>Admin Login</li>
            </ol>
          </li>
        )}
      </ol>
    </div>
  );
};

export default SideNavbar;