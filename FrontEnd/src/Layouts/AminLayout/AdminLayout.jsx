import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import Header from '../../Components/Admin/Header/Header';
import SideNavbar from '../../Components/Admin/sideNavbar/SideNavbar';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <SideNavbar />
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;