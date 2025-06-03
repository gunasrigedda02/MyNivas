import React from 'react';
import styles from './UserHome.module.css';

const UserHome = () => {
  return (
    <div className={styles.container}>
      <h1>Welcome to Your Dashboard</h1>
      <p>This is your user home page. Explore PG Hostels or contact us!</p>
    </div>
  );
};

export default UserHome;