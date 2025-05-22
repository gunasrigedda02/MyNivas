import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Contact_Us from './Components/Contact_Us/Contact_Us';
import PG_Hostels from './Components/PG_Hostels/PG_Hostels';
import Header from './Components/Header/Header';

function App() {
  const [count, setCount] = useState(0)

 
  return ( 
    <>
      <h1>Hi this is anil</h1>
      <h1>hello</h1>


    

 

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/Navbar' element={<Navbar />} />
            <Route path='/Header' element={<Header />} />
            <Route path='/PG_Hostels' element={<PG_Hostels />} />
            <Route path='/Contact_Us' element={<Contact_Us />} />
            <Route path='/Login' element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
   
    </>
 
  )
}

export default App
 