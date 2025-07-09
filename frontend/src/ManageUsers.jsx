import { useState } from 'react';
import axios from 'axios';

const ROLES = ['Staff', 'Member'];

function ManageUsers({ onAction }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ username: '', password: '', role: 'Member' });

  const addUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:8080/api/user', {
        username: form.username,
        password: form.password,
        role: form.role
      });
      setForm({ username: '', password: '', role: 'Member' });
      setSuccess('User added successfully!');
      if (onAction) onAction();
    } catch (err) {
      setError('Failed to add user');
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <div className="card">
        <h3>Add User</h3>
        <form onSubmit={addUser} style={{ marginBottom: 20 }}>
          <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required>
            {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
          <button type="submit">Add</button>
        </form>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
      </div>
    </div>
  );
}

export default ManageUsers; 