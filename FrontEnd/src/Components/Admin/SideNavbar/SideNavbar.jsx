import React from 'react'
import { useNavigate } from 'react-router-dom';
import Styles from "./SideNavbar.module.css"


const SideNavbar = () => {
    const navigate = useNavigate();
  return (
    <div>
        <ol className={Styles.main}>
            <li onClick={() => navigate("/admin/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/admin/hostels")}>Hostels</li>
            <li onClick={() => navigate("/admin/ratings")}>Ratings Us</li>
            <li onClick={() => navigate("/admin/reviews")}>Reviews</li>
            <li onClick={() => navigate("/admin/users")}>Users</li>
            <li onClick={() => navigate("/login")}>Login</li>
        </ol>
    </div>
  )
}

export default SideNavbar;