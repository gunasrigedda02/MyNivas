import React from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Manage hostels, ratings, reviews, and users.</p>
    </div>
  );
};

export default Dashboard;