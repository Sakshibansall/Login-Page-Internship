import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        username,
        password
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} >

        {/* Username field */}
        <label >Username:</label>
        <input
        id='username'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />


        {/* Password field */}
        <label>Password:</label>
        <input
        id='password'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        
        <button type="submit">Login</button>
      </form>

      {message && <p className={message.includes('Thank you') ? 'success' : 'error'}>{message}</p>}
      <p>Don't have an account? <Link to="/register">Sign up</Link></p>
    </div>
  );
};

export default Login;