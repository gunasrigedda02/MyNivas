import React from 'react';
import styles from './Hostels.module.css';

const Hostels = () => {
  const hostels = [
    { id: 1, name: 'Sunrise PG', location: 'Downtown' },
    { id: 2, name: 'Moonlight PG', location: 'Suburbs' },
  ];

  return (
    <div className={styles.container}>
      <h1>Hostels</h1>
      <div className={styles.hostelList}>
        {hostels.map((hostel) => (
          <div key={hostel.id} className={styles.hostelCard}>
            <h3>{hostel.name}</h3>
            <p>Location: {hostel.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hostels;