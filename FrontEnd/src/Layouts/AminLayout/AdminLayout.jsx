// AdminLayout.js
import React from 'react';
import AdminHeader from '../../Components/Admin/Header/Header';
import SideNavbar from '../../Components/Admin/sideNavbar/SideNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar />
      <div style={{ flex: 1 }}>
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;