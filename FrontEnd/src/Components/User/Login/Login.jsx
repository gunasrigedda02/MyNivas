// Login.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';
import Styles from './Login.module.css';

const Login = () => {
  const { role: currentRole, login } = useContext(AuthContext);
  const { role } = useParams(); // 'user' or 'admin'
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (currentRole) {
      if (currentRole === 'admin') {
        navigate('/Dashboard');
      } else if (currentRole === 'user') {
        navigate('/Home');
      }
    }
  }, [currentRole, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    login(role); // Save role in context + localStorage

    // Redirect based on role
    if (role === 'admin') {
      navigate('/Dashboard');
    } else {
      navigate('/Home');
    }
  };

  return (
    <div className={Styles.loginContainer}>
      <form onSubmit={handleLogin} className={Styles.loginForm}>
        <h2 className={Styles.title}>
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <div className={Styles.inputGroup}>
          <div className={Styles.inputWrapper}>
            <span
              className={Styles.inputIcon}
              aria-label="Email icon"
              role="img"
            ></span>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
                setIsEmailActive(e.target.value.length > 0);
              }}
              onFocus={() => setIsEmailActive(true)}
              onBlur={() => setIsEmailActive(credentials.email.length > 0)}
              required
              className={Styles.input}
            />
            <label
              htmlFor="email"
              className={`${Styles.inputLabel} ${isEmailActive ? Styles.active : ''}`}
            >
              Email
            </label>
          </div>
        </div>
        <div className={Styles.inputGroup}>
          <div className={Styles.inputWrapper}>
            <span
              className={`${Styles.inputIcon} ${Styles.passwordIcon}`}
              aria-label="Password icon"
              role="img"
            ></span>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
                setIsPasswordActive(e.target.value.length > 0);
              }}
              onFocus={() => setIsPasswordActive(true)}
              onBlur={() => setIsPasswordActive(credentials.password.length > 0)}
              required
              className={Styles.input}
            />
            <label
              htmlFor="password"
              className={`${Styles.inputLabel} ${isPasswordActive ? Styles.active : ''}`}
            >
              Password
            </label>
          </div>
        </div>
        <button type="submit" className={Styles.loginButton}>Login</button>
      </form>
    </div>
  );
};

export default Login;