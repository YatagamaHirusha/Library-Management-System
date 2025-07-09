import { useState } from 'react';
import axios from 'axios';

function IssueBooks({ onAction }) {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);
  const [issuerId, setIssuerId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const searchUser = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    setUser(null);
    setBook(null);
    try {
      const userRes = await axios.get(`http://localhost:8080/api/user/${username}`);
      setUser(userRes.data);
    } catch (err) {
      setError('User not found');
    }
    setLoading(false);
  };

  const searchBook = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    setBook(null);
    try {
      const bookRes = await axios.get(`http://localhost:8080/api/books/isbn/${isbn}`);
      setBook(bookRes.data);
    } catch (err) {
      setError('Book not found');
    }
    setLoading(false);
  };

  const handleIssue = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:8080/api/records/issue', {
        isbn: parseInt(isbn),
        issuer_id: parseInt(issuerId),
        username: username
      });
      setSuccess('Book issued successfully!');
      setIsbn('');
      setBook(null);
      setIssuerId('');
      if (onAction) onAction();
    } catch (err) {
      setError(err.response?.data || 'Failed to issue book');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Issue Books</h2>
      <div className="card">
        <form onSubmit={e => { e.preventDefault(); searchUser(); }} style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <button type="submit">Search User</button>
        </form>
        {user && (
          <div style={{ marginBottom: 16 }}><strong>User:</strong> {user.name} (Username: {user.username})</div>
        )}
        {user && (
          <form onSubmit={e => { e.preventDefault(); searchBook(); }} style={{ marginBottom: 16 }}>
            <input
              type="number"
              placeholder="Enter Book ISBN"
              value={isbn}
              onChange={e => setIsbn(e.target.value)}
              required
            />
            <button type="submit">Search Book</button>
          </form>
        )}
        {book && (
          <div style={{ marginBottom: 16 }}>
            <strong>Book:</strong> {book.title} (ISBN: {book.isbn}) | Author: {book.author} | Quantity: {book.quantity}
          </div>
        )}
        {book && (
          <form onSubmit={e => { e.preventDefault(); handleIssue(); }}>
            <input
              type="number"
              placeholder="Issuer (Staff) ID"
              value={issuerId}
              onChange={e => setIssuerId(e.target.value)}
              required
            />
            <button type="submit">Issue Book</button>
          </form>
        )}
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      </div>
    </div>
  );
}

export default IssueBooks; 