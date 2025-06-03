// LoginCmpts/AuthContext/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedRole = localStorage.getItem('role');
    return {
      isAuthenticated: !!savedRole,
      role: savedRole,
    };
  });

  useEffect(() => {
    console.log('Auth state updated:', auth);
  }, [auth]);

  const login = (role) => {
    setAuth({
      isAuthenticated: true,
      role: role,
    });
    localStorage.setItem('role', role);
    console.log(`Logged in as ${role}`);
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      role: null,
    });
    localStorage.removeItem('role');
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};