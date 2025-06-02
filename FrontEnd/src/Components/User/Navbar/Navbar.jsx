import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Styles from './Navbar.module.css';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { logout, auth } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to root, which now shows Home
  };

  // Navigate to appropriate "Home" based on role
  const handleHomeNavigation = () => {
    if (auth.isAuthenticated) {
      if (auth.role === 'user') {
        navigate('/Home'); // User homepage
      } else if (auth.role === 'admin') {
        navigate('/Dashboard'); // Admin dashboard
      }
    } else {
      navigate('/'); // Public homepage (Home component)
    }
  };

  const isHomePage = location.pathname === '/';

  return (
    <div>
      <ol className={Styles.main}>
        <li onClick={handleHomeNavigation}>Home</li>
        <li onClick={() => navigate('/PG_Hostels')}>PG Hostels</li>
        <li onClick={() => navigate('/Contact_Us')}>Contact Us</li>
        {!isHomePage && (
          auth.isAuthenticated ? (
            <li onClick={handleLogout}>Logout</li>
          ) : (
            <li className={Styles.login}>
              Login
              <ol className={Styles.login_options}>
                <li onClick={() => navigate('/Login/user')}>User</li>
                <li onClick={() => navigate('/Login/admin')}>Admin</li>
              </ol>
            </li>
          )
        )}
      </ol>
    </div>
  );
}

export default Navbar;