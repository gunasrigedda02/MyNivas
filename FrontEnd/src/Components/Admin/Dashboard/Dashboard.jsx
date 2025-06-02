// Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <p>Welcome to the Admin Dashboard! Manage hostels, ratings, reviews, and users from the sidebar.</p>
      <div>
        <h3>Quick Stats</h3>
        <ul>
          <li>Total Hostels: 50</li>
          <li>Total Users: 200</li>
          <li>Total Reviews: 150</li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;