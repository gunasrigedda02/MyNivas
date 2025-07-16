// src/components/user/Home/Amenities.jsx
import React, { useEffect, useRef } from 'react';
import styles from './Amenities.module.css';

function Amenities() {
  const containerRef = useRef(null);

  useEffect(() => {
    const items = containerRef.current.querySelectorAll(`.${styles.amenityItem}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.inView);
          } else {
            entry.target.classList.remove(styles.inView);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));

    return () => {
      items.forEach((item) => observer.unobserve(item));
    };
  }, []);

  return (
    <div className={styles.amenitiesContainer}>
      <h1 className={styles.amenitiesTitle}>Amenities & How It Works</h1>
      <p className={styles.amenitiesDescription}>
        MYNIVAS makes sure to provide a range of amenities to make you feel like you’re home
      </p>
      <div className={styles.amenitiesList} ref={containerRef}>
        <div className={styles.amenitiesRowTop}>
          <div className={styles.amenityItem}>
            <img src="/wi-fi.png" alt="WiFi" />
            <p>Free-WIFI</p>
          </div>
          <div className={styles.amenityItem}>
            <img src="/bed.png" alt="Kitchen" />
            <p>Shared Kitchen</p>
          </div>
          <div className={styles.amenityItem}>
            <img src="/cleaning.png" alt="Laundry" />
            <p>Daily Cleaning</p>
          </div>
        </div>
        <div className={styles.amenitiesRowBottom}>
          <div className={styles.amenityItem}>
            <img src="/search.png" alt="Security" />
            <p>Search</p>
          </div>
          <div className={styles.amenityItem}>
            <img src="/pin.png" alt="Parking" />
            <p>Find PGs Near You</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Amenities;