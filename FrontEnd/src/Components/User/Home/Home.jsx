import React from 'react'
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

function Home() {
  return (
    <div>
        <Header/>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default Home;