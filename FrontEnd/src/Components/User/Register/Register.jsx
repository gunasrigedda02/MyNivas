import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // Handle registration logic (e.g., API call)
      navigate('/RoleSelection');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navLinks}>
        <span onClick={() => navigate('/')}>Home</span>
        <span onClick={() => navigate('/Login/user')}>Login</span>
      </div>
      <h2>Register</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <span className={styles.link} onClick={() => navigate('/Login/user')}>
          Login here
        </span>
      </p>
    </div>
  );
};

export default Register;