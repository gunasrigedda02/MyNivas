// src/components/user/Home/HomeAbout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeAbout.module.css';

function HomeAbout() {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove(styles.inView);
            void entry.target.offsetWidth;
            entry.target.classList.add(styles.inView);
          } else {
            entry.target.classList.remove(styles.inView);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(`.${styles.animateOnScroll}`).forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="hm-abt-container" className={styles.hmAbtContainer}>
      <div
        id="hm-abt-content1"
        className={`${styles.hmAbtContent1} ${styles.animateOnScroll}`}
        data-animate="fade-slide-left"
      >
        <h1 id="hm-abt-au" className={styles.hmAbtAu}>About Us</h1>
        <p id="hm-abt-para" className={styles.hmAbtPara}>
          MYNIVAS is your smart hostel-finding platform, helping you discover nearby PGs with ease. Explore verified listings, essential amenities, and secure stays—all designed for comfort and convenience.
        </p>
        <p id="hm-abt-para" className={styles.hmAbtPara}>
          Whether you're a student, working professional, or traveler, MYNIVAS ensures a seamless experience by offering detailed property insights, real-time availability, and user reviews.
        </p>
        <button id="button" className={styles.button} onClick={() => navigate('/About')}>
          Read More
          <svg fill="currentColor" viewBox="0 0 24 24" id="icon" className={styles.icon}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            />
          </svg>
        </button>
      </div>
      <div
        id="hm-abt-content2"
        className={`${styles.hmAbtContent2} ${styles.animateOnScroll}`}
        data-animate="fade-slide-right"
      >
        <img src="/aboutbg.png" alt="aboutbg" id="hm-aboutbg" className={styles.hmAboutbg} />
      </div>
    </div>
  );
}

export default HomeAbout;