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
            <li onClick={() => navigate("/Login")}>Login</li>
        </ol>
    </div>
  )
}

export default Navbar;