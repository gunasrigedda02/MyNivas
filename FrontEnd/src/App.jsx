import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './LoginCmpts/AuthContext/AuthContext';
import Home from './Components/User/Home/Home';
import HomeData from './Components/User/HomeData/HomeData';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import Hostels from './Components/Admin/Hostels/Hostels';
import Ratings from './components/Admin/Ratings/Ratings';
import Reviews from './components/Admin/Reviews/Reviews';
import Users from './Components/Admin/Users/Users';
import PGHostels from './components/User/PG_Hostels/PG_Hostels';
import ContactUs from './Components/User/Contact_Us/Contact_Us';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import RoleSelection from './LoginCmpts/RoleSelection/RoleSelection';
import UserLayout from './Layouts/UserLayout/UserLayout';
import AdminLayout from './Layouts/AminLayout/AdminLayout'; // Typo: 'AminLayout' should be 'AdminLayout'
import MinimalLayout from './Layouts/MinimalLayout/MinimalLayout';
import PublicHomeLayout from './Layouts/PublicLayout/PublicHomeLayout';
import ProtectedRoute from './LoginCmpts/ProtectedRoute/ProtectedRoute';
import About from './Components/User/About/About';

function App() {
  const { auth } = useContext(AuthContext) || { auth: { isAuthenticated: false, role: null } };

  return (
    <Routes>
      {/* Public home route: PublicHomeLayout (Header + Navbar) */}
      <Route element={<PublicHomeLayout />}>
        <Route path="/" element={<Home />}>
          <Route index element={<HomeData />} /> {/* Nested route to render HomeData */}
        </Route>
      </Route>

      {/* Other public routes: MinimalLayout (Header only) */}
      <Route element={<MinimalLayout />}>
        <Route path="/Login/:type" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RoleSelection" element={<RoleSelection />} />
      </Route>

      {/* User routes: UserLayout (Header + Navbar + Footer) */}
      <Route element={<UserLayout />}>
        <Route
          path="/Home"
          element={
            <ProtectedRoute role="user">
              <HomeData />
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
        <Route
          path="/About"
          element={
            <ProtectedRoute role="user">
              <About />
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