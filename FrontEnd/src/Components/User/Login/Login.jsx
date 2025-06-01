// Login.js
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';

const Login = () => {
  const { role: currentRole, login } = useContext(AuthContext);
  const { role } = useParams(); // 'user' or 'admin'
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

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
    <form onSubmit={handleLogin}>
      <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({ ...credentials, email: e.target.value })
        }
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;