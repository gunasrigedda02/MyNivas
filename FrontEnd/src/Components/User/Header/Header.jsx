import React from 'react'
import Styles from "./Header.module.css"
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
  return (
    <div>
        <div className={Styles.Header} onClick={() => navigate("/")}>Header</div>
    </div>
  )
}

export default Header;