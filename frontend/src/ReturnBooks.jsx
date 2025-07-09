import { useState } from 'react';
import axios from 'axios';

function ReturnBooks({ onAction }) {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const searchUser = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    setUser(null);
    setIssuedBooks([]);
    try {
      const userRes = await axios.get(`http://localhost:8080/api/user/${username}`);
      setUser(userRes.data);
      // Get all active issue records for this user
      const issuedRes = await axios.get('http://localhost:8080/api/records/active');
      setIssuedBooks(issuedRes.data.filter(record => record.member && record.member.username === username));
    } catch (err) {
      setError('User not found or error fetching data');
    }
    setLoading(false);
  };

  const handleReturn = async (isbn) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:8080/api/records/return', {
        username,
        isbn: parseInt(isbn)
      });
      setSuccess('Book returned successfully!');
      searchUser();
      if (onAction) onAction();
    } catch (err) {
      setError(err.response?.data || 'Failed to return book');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Return Books</h2>
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
          <div className="card">
            <h4>Issued Books</h4>
            {issuedBooks.length === 0 ? <div>No books issued.</div> : (
              <ul>
                {issuedBooks.map(record => (
                  <li key={record.book.isbn}>
                    {record.book.title} (ISBN: {record.book.isbn})
                    <button onClick={() => handleReturn(record.book.isbn)} style={{ marginLeft: 10 }}>Return</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
      </div>
    </div>
  );
}

export default ReturnBooks; 