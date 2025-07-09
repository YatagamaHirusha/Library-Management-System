import { useEffect, useState } from 'react';
import axios from 'axios';

function BookManager({ onAction }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ isbn: '', title: '', author: '', genre: '', quantity: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ isbn: '', title: '', author: '', genre: '', quantity: '' });

  const fetchBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:8080/api/books');
      setBooks(res.data);
    } catch (err) {
      setError('Failed to fetch books');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:8080/api/books', {
        isbn: parseInt(form.isbn),
        title: form.title,
        author: form.author,
        genre: form.genre,
        quantity: parseInt(form.quantity)
      });
      setForm({ isbn: '', title: '', author: '', genre: '', quantity: '' });
      setSuccess('Book added successfully!');
      fetchBooks();
      if (onAction) onAction();
    } catch (err) {
      setError('Failed to add book');
    }
  };

  const deleteBook = async (isbn) => {
    setError('');
    setSuccess('');
    try {
      await axios.delete(`http://localhost:8080/api/books/${isbn}`);
      setSuccess('Book deleted successfully!');
      fetchBooks();
      if (onAction) onAction();
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditForm({ ...books[index] });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditForm({ isbn: '', title: '', author: '', genre: '', quantity: '' });
  };

  const saveEdit = async (isbn) => {
    setError('');
    setSuccess('');
    try {
      await axios.put(`http://localhost:8080/api/books/${isbn}`, {
        isbn: parseInt(editForm.isbn),
        title: editForm.title,
        author: editForm.author,
        genre: editForm.genre,
        quantity: parseInt(editForm.quantity)
      });
      setSuccess('Book updated successfully!');
      setEditIndex(null);
      fetchBooks();
      if (onAction) onAction();
    } catch (err) {
      setError('Failed to update book');
    }
  };

  return (
    <div>
      <h2>Manage Books</h2>
      <div className="card">
        <h3>Add Book</h3>
        <form onSubmit={addBook} style={{ marginBottom: 20 }}>
          <input type="number" placeholder="ISBN" value={form.isbn || ''} onChange={e => setForm({ ...form, isbn: e.target.value })} required />
          <input type="text" placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input type="text" placeholder="Author" value={form.author || ''} onChange={e => setForm({ ...form, author: e.target.value })} required />
          <input type="text" placeholder="Genre" value={form.genre || ''} onChange={e => setForm({ ...form, genre: e.target.value })} required />
          <input type="number" placeholder="Quantity" value={form.quantity || ''} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
          <button type="submit">Add</button>
        </form>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
        <h3>Book List</h3>
        {loading ? <div>Loading...</div> : (
          <ul>
            {books.map((book, idx) => (
              <li key={book.isbn}>
                {editIndex === idx ? (
                  <>
                    <input type="number" value={editForm.isbn || ''} onChange={e => setEditForm({ ...editForm, isbn: e.target.value })} style={{ width: 80 }} />
                    <input type="text" value={editForm.title || ''} onChange={e => setEditForm({ ...editForm, title: e.target.value })} />
                    <input type="text" value={editForm.author || ''} onChange={e => setEditForm({ ...editForm, author: e.target.value })} />
                    <input type="text" value={editForm.genre || ''} onChange={e => setEditForm({ ...editForm, genre: e.target.value })} />
                    <input type="number" value={editForm.quantity || ''} onChange={e => setEditForm({ ...editForm, quantity: e.target.value })} style={{ width: 80 }} />
                    <button onClick={() => saveEdit(book.isbn)}>Save</button>
                    <button onClick={cancelEdit} style={{ background: '#888', marginLeft: 6 }}>Cancel</button>
                  </>
                ) : (
                  <>
                    <strong>{book.title}</strong> by {book.author} | Genre: {book.genre} | ISBN: {book.isbn} | Quantity: {book.quantity}
                    <button onClick={() => startEdit(idx)} style={{ marginLeft: 10 }}>Edit</button>
                    <button onClick={() => deleteBook(book.isbn)} style={{ marginLeft: 6 }}>Delete</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BookManager; 