import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/register', {
        username,
        password
      });
      setMessage('Registration successful! Please login.');
    } catch (error) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>



        {/* Username field */}
        <label>Username: </label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />


        {/* Password field */}
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />


        <button type="submit">Register</button>

        
      </form>
      {message && <p className={message.includes('successful') ? 'success' : 'error'}>{message}</p>}
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Register;