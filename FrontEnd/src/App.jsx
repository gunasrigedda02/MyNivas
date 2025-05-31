import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/User/Home/Home';
import Navbar from './Components/User/Navbar/Navbar';
import Login from './Components/User/Login/Login';
import Contact_Us from './Components/User/Contact_Us/Contact_Us';
import PG_Hostels from './Components/User/PG_Hostels/PG_Hostels';
import Header from './Components/User/Header/Header';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import Hostels from './Components/Admin/Hostels/Hostels';
import Ratings from './Components/Admin/Ratings/Ratings';
import Reviews from './Components/Admin/Reviews/Reviews';
import Users from './Components/Admin/Users/Users';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/Navbar' element={<Navbar />} />
            <Route path='/Header' element={<Header />} />
            <Route path='/PG_Hostels' element={<PG_Hostels />} />
            <Route path='/Contact_Us' element={<Contact_Us />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Hostels' element={<Hostels />} />
            <Route path='/Ratings' element={<Ratings />} />
            <Route path='/Reviews' element={<Reviews />} />
            <Route path='/Users' element={<Users />} />
            <Route path='/SideNavbar' element={<Users />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
