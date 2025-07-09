import { useState } from 'react';
import axios from 'axios';

function IssueReturnManager() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const searchUser = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    setUser(null);
    setIssuedBooks([]);
    setAvailableBooks([]);
    try {
      const userRes = await axios.get(`http://localhost:8080/api/users/${userId}`);
      setUser(userRes.data);
      const issuedRes = await axios.get(`http://localhost:8080/api/issue/${userId}`);
      setIssuedBooks(issuedRes.data);
      const booksRes = await axios.get('http://localhost:8080/api/books');
      // Filter out books already issued by user or with quantity 0
      const issuedIsbns = issuedRes.data.map(b => b.isbn);
      setAvailableBooks(booksRes.data.filter(b => !issuedIsbns.includes(b.isbn) && b.quantity > 0));
    } catch (err) {
      setError('User not found or error fetching data');
    }
    setLoading(false);
  };

  const handleIssue = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:8080/api/issue', {
        userId: parseInt(userId),
        isbn: parseInt(selectedBook)
      });
      setSuccess('Book issued successfully!');
      searchUser();
    } catch (err) {
      setError('Failed to issue book');
    }
    setLoading(false);
  };

  const handleReturn = async (isbn) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:8080/api/return', {
        userId: parseInt(userId),
        isbn: parseInt(isbn)
      });
      setSuccess('Book returned successfully!');
      searchUser();
    } catch (err) {
      setError('Failed to return book');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Issue / Return Books</h2>
      <div className="card">
        <form onSubmit={e => { e.preventDefault(); searchUser(); }} style={{ marginBottom: 16 }}>
          <input
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
          />
          <button type="submit">Search User</button>
        </form>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
        {user && (
          <div>
            <div style={{ marginBottom: 12 }}><strong>User:</strong> {user.name} (ID: {user.id})</div>
            <div className="card">
              <h4>Issued Books</h4>
              {issuedBooks.length === 0 ? <div>No books issued.</div> : (
                <ul>
                  {issuedBooks.map(book => (
                    <li key={book.isbn}>
                      {book.title} (ISBN: {book.isbn})
                      <button onClick={() => handleReturn(book.isbn)} style={{ marginLeft: 10 }}>Return</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="card">
              <h4>Issue New Book</h4>
              <form onSubmit={e => { e.preventDefault(); handleIssue(); }}>
                <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)} required>
                  <option value="">Select a book</option>
                  {availableBooks.map(book => (
                    <option key={book.isbn} value={book.isbn}>{book.title} (ISBN: {book.isbn})</option>
                  ))}
                </select>
                <button type="submit" disabled={!selectedBook}>Issue</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IssueReturnManager; 