// Home.js
import React from 'react';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome to the Home Page</h2>
      <p>This is the user homepage. Explore PG Hostels or contact us using the navigation bar above.</p>
      <Outlet />
    </div>
  );
}

export default Home;