// components/user/Navbar/Navbar.jsx
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext) || { logout: () => {} };

  const handleLogout = () => {
    logout();
    navigate('/RoleSelection');
  };

  return (
    <div>
      <ol className={styles.main}>
        <li onClick={() => navigate('/Home')}>Home</li>
        <li onClick={() => navigate('/PG_Hostels')}>PG Hostels</li>
        <li onClick={() => navigate('/Contact_Us')}>Contact Us</li>
        <li onClick={handleLogout}>Logout</li>
      </ol>
    </div>
  );
}

export default Navbar;