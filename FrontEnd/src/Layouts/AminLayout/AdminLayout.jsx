import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Admin/Header/Header';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div className={styles.mainContent}>
        <aside className={styles.sidebar}>
          <nav>
            <ul className={styles.navList}>
              <li><a href="/Dashboard">Dashboard</a></li>
              <li><a href="/Hostels">Hostels</a></li>
              <li><a href="/Ratings">Ratings</a></li>
              <li><a href="/Reviews">Reviews</a></li>
              <li><a href="/Users">Users</a></li>
            </ul>
          </nav>
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;