import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingProvider, useLoading } from './Components/LoadingContext/LoadingContext';
import LoadingSpinner from './Components/LoadingSpinners/LoadingSpinners';

// User Components
import Home from './Components/User/Home/Home';
import Login from './Components/User/Login/Login';
import Register from './Components/User/Register/Register';
import Contact_Us from './Components/User/Contact_Us/Contact_Us';
import PG_Hostels from './Components/User/PG_Hostels/PG_Hostels';

// Admin Components
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Hostels from './Components/Admin/Hostels/Hostels';
import Ratings from './Components/Admin/Ratings/Ratings';
import Reviews from './Components/Admin/Reviews/Reviews';
import Users from './Components/Admin/Users/Users';

// Auth & Utility Components
import RoleSelection from './LoginCmpts/RoleSelection/RoleSelection';
import ProtectedRoute from './LoginCmpts/ProtectedRoute/ProtectedRoute';

// Layouts
import UserLayout from './Layouts/UserLayout/UserLayout';
import AdminLayout from './Layouts/AminLayout/AdminLayout';

// Wrapper component to handle loading state during route changes
const RouteChangeHandler = ({ children }) => {
  const { setIsLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location, setIsLoading]);

  return children;
};

const App = () => {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LoadingProvider>
  );
};

const AppContent = () => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <RouteChangeHandler>
        <Routes>
          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route index element={<Home />} /> {/* Show Home at root */}
            <Route path="Home" element={<ProtectedRoute requiredRole="user"><Home /></ProtectedRoute>} />
            <Route path="PG_Hostels" element={<PG_Hostels />} />
            <Route path="Contact_Us" element={<Contact_Us />} />
            <Route path="Login/:role" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="RoleSelection" element={<RoleSelection />} />
          </Route>

          {/* Admin Routes */}
          <Route
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Hostels" element={<Hostels />} />
            <Route path="Ratings" element={<Ratings />} />
            <Route path="Reviews" element={<Reviews />} />
            <Route path="Users" element={<Users />} />
          </Route>
        </Routes>
      </RouteChangeHandler>
      <ToastContainer />
    </>
  );
};

export default App;