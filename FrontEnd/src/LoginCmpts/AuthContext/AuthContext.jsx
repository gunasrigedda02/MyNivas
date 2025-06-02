import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null);
  // Debugging: Log role on initial load
  console.log('Initial role from localStorage:', localStorage.getItem('role'));

  const login = (newRole) => {
    console.log('Logging in with role:', newRole);
    setRole(newRole);
    localStorage.setItem('role', newRole);
    console.log('Role after login:', newRole);
    console.log('localStorage role after login:', localStorage.getItem('role'));
  };

  const logout = () => {
    console.log('Logging out');
    setRole(null);
    localStorage.removeItem('role');
    console.log('Role after logout:', role);
    console.log('localStorage role after logout:', localStorage.getItem('role'));
  };

  const auth = {
    isAuthenticated: !!role,
    role: role,
  };

  // Debugging: Log auth state whenever it changes
  useEffect(() => {
    console.log('Auth state:', auth);
  }, [role]);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;