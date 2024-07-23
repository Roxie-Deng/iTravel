import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './LoginPage.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (response.ok) {
        // 存储 token 或其他必要的用户信息
        localStorage.setItem('token', data.token);
        login({ username: data.username });  // Use the login function
        // 重定向到首页
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Login failed');
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
            autoComplete="current-password"
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
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