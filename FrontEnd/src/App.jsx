// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import Header from './Components/Admin/Header/Header';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="Home" element={<ProtectedRoute requiredRole="user"><Home /></ProtectedRoute>} /> {/* Added /Home route */}
          <Route path="PG_Hostels" element={<PG_Hostels />} />
          <Route path="Contact_Us" element={<Contact_Us />} />
          <Route path="Login/:role" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="RoleSelection" element={<RoleSelection />} />

          <Route
            path="UserHome"
            element={
              <ProtectedRoute requiredRole="user">
                <Home />
              </ProtectedRoute>
            }
          />
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
          <Route path='AdminHeader' element={<Header />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;