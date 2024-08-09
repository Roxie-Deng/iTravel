import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
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