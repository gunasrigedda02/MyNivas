// src/components/User/Login/Login.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';
import { useLoading } from '../../LoadingContext/LoadingContext';
import LoadingSpinner from '../../LoadingSpinners/LoadingSpinners';
import styles from './Login.module.css';

const Login = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  console.log('Login component rendered, type:', type); // Debug log

  const authContext = useContext(AuthContext) || { login: () => {} };
  const { login } = authContext;
  const loadingContext = useLoading() || { isLoading: false, setIsLoading: () => {} };
  const { isLoading, setIsLoading } = loadingContext;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('useEffect triggered, type:', type); // Debug log
    if (!type || (type !== 'user' && type !== 'admin')) {
      console.log('Invalid type, redirecting to /Login/user');
      navigate('/Login/user', { replace: true });
    }
  }, [type, navigate]);

  if (!type || (type !== 'user' && type !== 'admin')) {
    console.log('Returning null due to invalid type:', type); // Debug log
    return null;
  }

  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const { from } = location.state || { from: type === 'user' ? '/Home' : '/Dashboard' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        login(type);
        navigate(from, { replace: true });
      } catch (err) {
        setError('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Please enter both username and password');
    }
  };

  return (
    <div className={styles.container}>
      {isLoading && <LoadingSpinner />}
      <div className={styles.navLinks}>
        <span onClick={() => navigate('/')}>Home</span>
        <span onClick={() => navigate(type === 'user' ? '/Login/admin' : '/Login/user')}>
          {type === 'user' ? 'Admin Login' : 'User Login'}
        </span>
      </div>
      <h2>{displayType} Login</h2>
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </div>
        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don’t have an account?{' '}
        <span className={styles.link} onClick={() => navigate('/Register')}>
          Register here
        </span>
      </p>
    </div>
  );
};

export default Login;