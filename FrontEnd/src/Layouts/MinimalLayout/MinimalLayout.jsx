import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/User/Header/Header';
import Navbar from '../../components/User/Navbar/Navbar';
import styles from './MinimalLayout.module.css';

const MinimalLayout = () => {
  const location = useLocation();
  const showNavbar = location.pathname === '/'; // Show Navbar only on the '/' route

  return (
    <div className={styles.container}>
      <Header />
      {showNavbar && <Navbar />}
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MinimalLayout;