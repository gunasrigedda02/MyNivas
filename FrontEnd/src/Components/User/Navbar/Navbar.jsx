// Navbar.js
import React, { useContext } from 'react';
import Styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { logout, auth } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clear auth state
    navigate('/'); // Redirect to homepage
  };

  return (
    <div>
      <ol className={Styles.main}>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/PG_Hostels')}>PG Hostels</li>
        <li onClick={() => navigate('/Contact_Us')}>Contact Us</li>
        {auth.isAuthenticated ? (
          <li onClick={handleLogout}>Logout</li>
        ) : (
          <li className={Styles.login}>
            Login
            <ol className={Styles.login_options}>
              <li onClick={() => navigate('/Login/user')}>User</li>
              <li onClick={() => navigate('/Login/admin')}>Admin</li>
            </ol>
          </li>
        )}
      </ol>
    </div>
  );
}

export default Navbar;