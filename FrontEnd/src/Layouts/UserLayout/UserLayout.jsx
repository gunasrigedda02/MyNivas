// UserLayout.js
import React from 'react';
import Header from '../../Components/User/Header/Header';
import Navbar from '../../Components/User/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;