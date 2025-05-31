import React from 'react';
import SideNavbar from '../sideNavbar/SideNavbar';
import Header from '../../User/Header/Header'; // ✅ adjust path if needed
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return(
    <div>
      <Header />
      <SideNavbar />
      <div>Dashboard</div>
    </div>
  )
}

export default Dashboard;