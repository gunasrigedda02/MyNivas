import React from 'react';
import { Outlet } from 'react-router-dom'; // Ensure this is imported
import Header from '../../Components/User/Header/Header';
import Navbar from '../../Components/User/Navbar/Navbar';
import styles from './UserLayout.module.css';

const UserLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;