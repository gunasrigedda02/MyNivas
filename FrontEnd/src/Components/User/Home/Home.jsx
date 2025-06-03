// components/user/Home/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Welcome to PG Finder</h1>
      <p>Find the best PG hostels for your needs!</p>
      <button onClick={() => navigate('/RoleSelection')}>Get Started</button>
    </div>
  );
};

export default Home;