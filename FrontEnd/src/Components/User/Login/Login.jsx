import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';
import { useLoading } from '../../LoadingContext/LoadingContext';
import LoadingSpinner from '../../LoadingSpinners/LoadingSpinners';
import styles from './Login.module.css';
import axios from 'axios';

const Login = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const authContext = useContext(AuthContext) || { login: () => {} };
  const { login } = authContext;
  const loadingContext = useLoading() || { isLoading: false, setIsLoading: () => {} };
  const { isLoading, setIsLoading } = loadingContext;

  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  useEffect(() => {
    if (!type || (type !== 'user' && type !== 'admin')) {
      navigate('/Login/user', { replace: true });
    }
  }, [type, navigate]);

  if (!type || (type !== 'user' && type !== 'admin')) {
    return null;
  }

  const displayType = type.charAt(0).toUpperCase() + type.slice(1);
  const { from } = location.state || { from: type === 'user' ? '/Home' : '/Dashboard' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login flow
        let endpoint, payload;
        if (type === 'admin') {
          endpoint = 'http://localhost:10000/MyNivas/auth/login';
          payload = { adminEmail: email, adminPassword: password, dateOfBirth };
        } else {
          endpoint = 'http://localhost:10000/MyNivas/user/login';
          payload = { userEmail: email, userPassword: password };
        }

        const response = await axios.post(endpoint, payload);
        if (type === 'admin') {
          // Admin login requires OTP
          setShowOtpInput(true);
        } else {
          // User login returns token directly
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          login(type, user);
          navigate(from, { replace: true });
        }
      } else {
        // Registration flow
        let endpoint, payload;
        if (type === 'admin') {
          // Admin registration requires an authenticated admin
          const token = localStorage.getItem('token');
          endpoint = 'http://localhost:10000/apMyNivas/auth/add-admin';
          payload = { adminName: username, adminEmail: email, adminPassword: password, dateOfBirth };
          await axios.post(endpoint, payload, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setShowOtpInput(true);
        } else {
          endpoint = 'http://localhost:10000/MyNivas/user/request-otp';
          payload = { userName: username, userEmail: email, userPassword: password };
          await axios.post(endpoint, payload);
          setShowOtpInput(true);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let endpoint, payload;
      if (isLogin && type === 'admin') {
        endpoint = 'http://localhost:10000/MyNivas/auth/verify-login-otp';
        payload = { adminEmail: email, otp };
      } else if (!isLogin && type === 'admin') {
        endpoint = 'http://localhost:10000/MyNivas/auth/verify-add-admin-otp';
        payload = { otp };
        const token = localStorage.getItem('token');
        const response = await axios.post(endpoint, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShowOtpInput(false);
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setUsername('');
        setDateOfBirth('');
        setError('Admin registered successfully. Please log in.');
        return;
      } else {
        endpoint = 'http://localhost:10000/MyNivas/user/verify-registration-otp';
        payload = { userEmail: email, otp };
      }

      const response = await axios.post(endpoint, payload);
      if (isLogin && type === 'admin') {
        const { token, admin } = response.data;
        localStorage.setItem('token', token);
        login(type, admin);
        navigate(from, { replace: true });
      } else {
        setShowOtpInput(false);
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setUsername('');
        setDateOfBirth('');
        setError('Registration successful. Please log in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const endpoint = type === 'admin'
        ? 'http://localhost:10000/MyNivas/auth/forgot-password'
        : 'http://localhost:10000/MyNivas/user/forgot-password';
      const payload = type === 'admin' ? { adminEmail: email, dateOfBirth } : { userEmail: email };
      await axios.post(endpoint, payload);
      setShowOtpInput(true);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || !otp) {
      setError('Please enter OTP and new password.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const endpoint = type === 'admin'
        ? 'http://localhost:10000/MyNivas/auth/reset-password'
        : 'http://localhost:10000/MyNivas/user/reset-password';
      const payload = type === 'admin'
        ? { adminEmail: email, otp, newPassword: password }
        : { userEmail: email, otp, newPassword: password };
      await axios.post(endpoint, payload);
      setShowOtpInput(false);
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setUsername('');
      setDateOfBirth('');
      setOtp('');
      setError('Password reset successfully. Please log in.');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
      <h2>{isLogin ? `${displayType} Login` : `${displayType} Register`}</h2>
      {error && <p className={styles.error}>{error}</p>}
      {!showOtpInput ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
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
          )}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
          {(type === 'admin') && (
            <div className={styles.formGroup}>
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
          {isLogin && (
            <p>
              Forgot Password?{' '}
              <span className={styles.link} onClick={handleForgotPassword}>
                Reset here
              </span>
            </p>
          )}
          <p>
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}{' '}
            <span
              className={styles.link}
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
                setUsername('');
                setDateOfBirth('');
              }}
            >
              {isLogin ? 'Register here' : 'Login here'}
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={isLogin && type !== 'admin' ? handleResetPassword : handleOtpSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              disabled={isLoading}
            />
          </div>
          {(isLogin && type !== 'admin') && (
            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                disabled={isLoading}
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <p>
            <span
              className={styles.link}
              onClick={() => {
                setShowOtpInput(false);
                setOtp('');
                setError('');
              }}
            >
              Cancel
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;