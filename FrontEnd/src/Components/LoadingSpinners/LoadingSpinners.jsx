import React from 'react';
import { MutatingDots } from 'react-loader-spinner';
import styles from './LoadingSpinners.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default LoadingSpinner;