import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // 确保包含你的样式

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      onLogin();
    } else {
      console.error('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1>Welcome to iTravel</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User name</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-actions">
          <button type="button">Forget password</button>
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="signup-prompt">
        <p>New User? Create an Account</p>
        <Link to="/signup">
          <button>Create a new account</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;