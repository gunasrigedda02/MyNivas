import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h2 className={styles.title}>Welcome to the Home Page</h2>
      <p className={styles.description}>
        This is the user homepage. Explore PG Hostels or contact us using the navigation bar above.
      </p>
      <Outlet />
    </div>
  );
}

export default Home;