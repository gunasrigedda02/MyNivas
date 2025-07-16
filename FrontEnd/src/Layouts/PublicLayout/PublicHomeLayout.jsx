import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/User/Header/Header';
import Navbar from '../../components/User/Navbar/Navbar';
import Footer from '../../Components/User/Footer/Footer';
import styles from './PublicHomeLayout.module.css';

const PublicHomeLayout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Navbar />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicHomeLayout;