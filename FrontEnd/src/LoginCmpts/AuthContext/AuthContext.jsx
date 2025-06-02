// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || null);

  const login = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  // Create the auth object expected by ProtectedRoute
  const auth = {
    isAuthenticated: !!role, // true if role exists, false otherwise
    role: role,
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;