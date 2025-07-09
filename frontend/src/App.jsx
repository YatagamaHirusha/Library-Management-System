import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';
import IssueBooks from './IssueBooks';
import ReturnBooks from './ReturnBooks';
import BookManager from './BookManager';
import ManageUsers from './ManageUsers';

function Dashboard({ stats }) {
  return (
    <div>
      <h1>Library Dashboard</h1>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <div className="stat">{stats.users}</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Books</h3>
          <div className="stat">{stats.books}</div>
        </div>
        <div className="dashboard-card">
          <h3>Issued Books</h3>
          <div className="stat">{stats.issued}</div>
        </div>
        <div className="dashboard-card">
          <h3>Available Books</h3>
          <div className="stat">{stats.available}</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('dashboard');
  const [stats, setStats] = useState({ users: 0, books: 0, issued: 0, available: 0 });

  const fetchStats = useCallback(async () => {
    try {
      const [usersRes, booksRes, issuedCountRes] = await Promise.all([
        axios.get('http://localhost:8080/api/user'),
        axios.get('http://localhost:8080/api/books'),
        axios.get('http://localhost:8080/api/records/return/count')
      ]);
      const users = Array.isArray(usersRes.data) ? usersRes.data.length : 0;
      const books = Array.isArray(booksRes.data) ? booksRes.data.length : 0;
      const issued = typeof issuedCountRes.data === 'number' ? issuedCountRes.data : 0;
      const available = Array.isArray(booksRes.data) ? booksRes.data.reduce((sum, b) => sum + (b.quantity || 0), 0) : 0;
      setStats({ users, books, issued, available });
    } catch (e) {
      setStats({ users: 0, books: 0, issued: 0, available: 0 });
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Pass fetchStats to children so they can trigger a dashboard refresh after actions
  return (
    <div className="app-layout">
      <div className="sidebar">
        <h2>Library</h2>
        <button className={page === 'dashboard' ? 'active' : ''} onClick={() => setPage('dashboard')}>Dashboard</button>
        <button className={page === 'issue' ? 'active' : ''} onClick={() => setPage('issue')}>Issue Books</button>
        <button className={page === 'return' ? 'active' : ''} onClick={() => setPage('return')}>Return Books</button>
        <button className={page === 'books' ? 'active' : ''} onClick={() => setPage('books')}>Manage Books</button>
        <button className={page === 'users' ? 'active' : ''} onClick={() => setPage('users')}>Manage Users</button>
      </div>
      <div className="main-content">
        {page === 'dashboard' && <Dashboard stats={stats} />}
        {page === 'issue' && <IssueBooks onAction={fetchStats} />}
        {page === 'return' && <ReturnBooks onAction={fetchStats} />}
        {page === 'books' && <BookManager onAction={fetchStats} />}
        {page === 'users' && <ManageUsers onAction={fetchStats} />}
      </div>
    </div>
  );
}

export default App;
