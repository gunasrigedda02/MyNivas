// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './LoginCmpts/AuthContext/AuthContext';
import Home from './components/user/Home/Home';
import UserHome from './components/user/UserHome/UserHome';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Hostels from './components/admin/Hostels/Hostels';
import Ratings from './components/admin/Ratings/Ratings';
import Reviews from './components/admin/Reviews/Reviews';
import Users from './components/admin/Users/Users';
import PGHostels from './components/user/PG_Hostels/PG_Hostels';
import ContactUs from './components/user/Contact_Us/Contact_Us';
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import RoleSelection from './LoginCmpts/RoleSelection/RoleSelection';
import UserLayout from './Layouts/UserLayout/UserLayout';
import AdminLayout from './Layouts/AminLayout/AdminLayout';
import MinimalLayout from './Layouts/MinimalLayout/MinimalLayout';
import ProtectedRoute from './LoginCmpts/ProtectedRoute/ProtectedRoute';

function App() {
  const { auth } = useContext(AuthContext) || { auth: { isAuthenticated: false, role: null } };

  return (
    <Routes>
      {/* Public routes: MinimalLayout (Header only) */}
      <Route element={<MinimalLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Login/:type" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RoleSelection" element={<RoleSelection />} />
      </Route>

      {/* User routes: UserLayout (Header + Navbar) */}
      <Route element={<UserLayout />}>
        <Route
          path="/Home"
          element={
            <ProtectedRoute role="user">
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PG_Hostels"
          element={
            <ProtectedRoute role="user">
              <PGHostels />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Contact_Us"
          element={
            <ProtectedRoute role="user">
              <ContactUs />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin routes: AdminLayout (Header + SideNavbar) */}
      <Route
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Hostels" element={<Hostels />} />
        <Route path="/Ratings" element={<Ratings />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/Users" element={<Users />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;