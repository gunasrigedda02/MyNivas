// src/components/user/Footer/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>MYNIVAS</h3>
          <p>Your smart hostel-finding platform for students and professionals.</p>
        </div>
        <div className={styles.footerSection}>
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/PG_Hostels')}>PG Hostels</li>
            <li onClick={() => navigate('/Contact_Us')}>Contact Us</li>
            <li onClick={() => navigate('/About')}>About Us</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h4>Contact</h4>
          <p>Email: support@mynivas.com</p>
          <p>Phone: +91 123-456-7890</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2025 MYNIVAS. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;