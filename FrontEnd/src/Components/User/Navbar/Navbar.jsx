import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';
import styles from './Navbar.module.css';

function Navbar() {
  const navigate = useNavigate();
  const { auth, logout } = useContext(AuthContext) || { auth: { isAuthenticated: false }, logout: () => {} };
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/RoleSelection');
    setMenuOpen(false);
  };

  return (
    <nav className={styles.main}>
      <div className={styles.logo} onClick={() => handleNavigation('/')}>
        <img src="/mynivas.png" alt="logo" />
      </div>

      <i
        className={`fa-solid fa-bars ${styles.menuIcon}`}
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>

      <ul className={`${styles.links} ${menuOpen ? styles.show : ''}`}>
        <li className={styles.home} onClick={() => handleNavigation('/')}>Home</li>
        <li className={styles.pg} onClick={() => handleNavigation('/PG_Hostels')}>
          PG Hostels
        </li>
        <li className={styles.contact} onClick={() => handleNavigation('/Contact_Us')}>
          Contact Us
        </li>
        <li className={styles.about} onClick={() => handleNavigation('/About')}>
          About Us
        </li>
        {auth.isAuthenticated ? (
          <button className={styles.button} onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={styles.icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
            <div className={styles.text}>Logout</div>
          </button>
        ) : (
          <button className={styles.button} onClick={() => handleNavigation('/Login/user')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={styles.icon}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
            <div className={styles.text}>Login</div>
          </button>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;