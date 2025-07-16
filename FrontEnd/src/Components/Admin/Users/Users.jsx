import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../LoginCmpts/AuthContext/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Users.module.css';

const Users = () => {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext) || {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'userName', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const usersPerPage = 10;

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      console.log('AuthContext in fetchUsers:', { user, isAuthenticated, isLoading }); // Debug log
      console.log('Token:', token ? token.slice(0, 20) + '...' : 'No token'); // Debug log

      if (!token) {
        setError('No authentication token found. Please log in as an admin.');
        return;
      }
      if (!isAuthenticated) {
        setError('User not authenticated. Please log in as an admin.');
        return;
      }
      if (user?.type !== 'admin') {
        setError('Admin access required. Please log in with an admin account.');
        return;
      }

      console.log('Fetching users from: http://localhost:10000/MyNivas/user/users/full-details'); // Debug log
      const response = await axios.get('http://localhost:10000/MyNivas/user/users/full-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response.data); // Debug log
      if (response.data.success) {
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
      } else {
        setError('Failed to fetch user data: ' + (response.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Fetch Error:', err); // Debug log
      const message = err.response?.data?.message || err.message;
      setError(`Error fetching users: ${message}`);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired or unauthorized. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('Waiting for AuthContext to load'); // Debug log
      return;
    }
    console.log('Users component mounted. AuthContext:', { user, isAuthenticated }); // Debug log
    fetchUsers();
  }, [isAuthenticated, user, isLoading]);

  // Search filter
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.userName.toLowerCase().includes(search.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [search, users]);

  // Sorting function
  const sortData = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (key === 'createdAt' || key === 'updatedAt') {
        return direction === 'asc'
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });

    setFilteredUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle manual login navigation
  const handleLogin = () => {
    navigate('/Login/admin', { state: { from: location.pathname } });
  };

  // Render loading or error state
  if (loading || isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>{error}</div>
        <button onClick={handleLogin} className={styles.loginButton}>
          Login as Admin
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users Management</h1>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={fetchUsers} className={styles.refreshButton}>
          Refresh
        </button>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {[
                { key: 'userId', label: 'User ID' },
                { key: 'userName', label: 'Name' },
                { key: 'userEmail', label: 'Email' },
                { key: 'isVerified', label: 'Verified' },
                { key: 'createdAt', label: 'Created At' },
                { key: 'updatedAt', label: 'Updated At' },
              ].map((column) => (
                <th
                  key={column.key}
                  onClick={() => sortData(column.key)}
                  className={styles.tableHeader}
                >
                  {column.label}
                  {sortConfig.key === column.key && (
                    <span className={styles.sortIcon}>
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {currentUsers.map((user) => (
              <tr key={user.userId} className={styles.tableRow}>
                <td className={styles.tableCell}>{user.userId}</td>
                <td className={styles.tableCell}>{user.userName}</td>
                <td className={styles.tableCell}>{user.userEmail}</td>
                <td className={styles.tableCell}>
                  <span
                    className={`${styles.verifiedBadge} ${
                      user.isVerified ? styles.verifiedYes : styles.verifiedNo
                    }`}
                  >
                    {user.isVerified ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className={styles.tableCell}>{formatDate(user.createdAt)}</td>
                <td className={styles.tableCell}>{formatDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <nav className={styles.paginationNav}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`${styles.paginationButton} ${
                  currentPage === page ? styles.paginationButtonActive : ''
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Users;