// components/admin/Ratings/Ratings.jsx
import React from 'react';
import styles from './Ratings.module.css';

const Ratings = () => {
  const ratings = [
    { id: 1, hostel: 'Sunrise PG', rating: 4.5 },
    { id: 2, hostel: 'Moonlight PG', rating: 4.0 },
  ];

  return (
    <div className={styles.container}>
      <h1>Ratings</h1>
      <div className={styles.ratingList}>
        {ratings.map((rating) => (
          <div key={rating.id} className={styles.ratingCard}>
            <h3>{rating.hostel}</h3>
            <p>Rating: {rating.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;