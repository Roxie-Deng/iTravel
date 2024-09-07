import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    setError('');  // 重置错误状态
    try {
      await login(username, password);
      // 登录成功后重定向到首页
      navigate('/');
    } catch (error) {
      // 捕获错误响应
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || 'Login failed';

        // 根据状态码显示不同的错误消息
        if (status === 401) {
          setError('Incorrect password. Please try again.');
        } else if (status === 404) {
          setError('User not found. Please check your username.');
        } else {
          setError(message);
        }
      } else {
        setError('An error occurred. Please try again later.');
      }
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
          <Link to="/forgetpassword">Forget Password</Link>
          <button type="submit">Login</button>
        </div>
      </form>
      <div className="signup-prompt">
        <p>Don't have an account?</p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
