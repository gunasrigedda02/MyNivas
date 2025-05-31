import React from 'react'
import Styles from "./Navbar.module.css";
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();

  return (
    <div>
        <ol className={Styles.main}>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/PG_Hostels")}>PG Hostels</li>
            <li onClick={() => navigate("/Contact_Us")}>Contact Us</li>
            <li>
              <div className={Styles.login}>Login</div>
              <div className={Styles.login_options}>
                <div>User</div>
                <div>Admin</div>
              </div>
            </li>
        </ol>
    </div>
  )
}

export default Navbar;