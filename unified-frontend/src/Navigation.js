import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      backgroundColor: 'transparent', /* 移除灰色背景 */
      fontFamily: "'Poppins', sans-serif", /* 替换字体为 Poppins */
      marginTop: '0.5rem', /* 增加上边距 */
      marginBottom: '-0.5rem', /* 减少下边距 */
    }}>
      <Link to="/">Home</Link>
      <Link to="/guide">Guide</Link>
      <Link to="/preferences">Preferences</Link>
      {user ? (
        <>
          <Link to="/profile">My Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;