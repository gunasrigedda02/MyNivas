// src/Layouts/MinimalLayout/MinimalLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/User/Header/Header';
import styles from './MinimalLayout.module.css';

const MinimalLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MinimalLayout;